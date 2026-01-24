/**
 * Cloudflare Worker Template for Full-Stack Apps
 * Handles API routes, authentication, and database operations
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Router
    try {
      // API Routes
      if (path.startsWith('/api/')) {
        return await handleAPI(request, env, path, corsHeaders);
      }

      // Serve static files (handled by Cloudflare Pages)
      return new Response('Not Found', { status: 404 });

    } catch (error) {
      return jsonResponse({ error: error.message }, 500, corsHeaders);
    }
  },
};

/**
 * API Route Handler
 */
async function handleAPI(request, env, path, corsHeaders) {
  const method = request.method;

  // Auth endpoints
  if (path === '/api/auth/signup') {
    return await handleSignup(request, env, corsHeaders);
  }

  if (path === '/api/auth/login') {
    return await handleLogin(request, env, corsHeaders);
  }

  // Protected routes - require authentication
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Unauthorized' }, 401, corsHeaders);
  }

  const token = authHeader.substring(7);
  const user = await verifyToken(token, env);

  if (!user) {
    return jsonResponse({ error: 'Invalid token' }, 401, corsHeaders);
  }

  // CRUD operations
  if (path.startsWith('/api/items')) {
    return await handleItems(request, env, user, corsHeaders);
  }

  return jsonResponse({ error: 'Route not found' }, 404, corsHeaders);
}

/**
 * User Signup
 */
async function handleSignup(request, env, corsHeaders) {
  const { email, password, name } = await request.json();

  // Validate input
  if (!email || !password || password.length < 8) {
    return jsonResponse(
      { error: 'Email and password (min 8 chars) required' },
      400,
      corsHeaders
    );
  }

  // Check if user exists
  const existing = await env.DB.prepare(
    'SELECT id FROM users WHERE email = ?'
  ).bind(email).first();

  if (existing) {
    return jsonResponse({ error: 'Email already registered' }, 400, corsHeaders);
  }

  // Hash password (simple hash - use bcrypt in production)
  const hashedPassword = await simpleHash(password);

  // Create user
  const result = await env.DB.prepare(
    'INSERT INTO users (email, password, name, created_at) VALUES (?, ?, ?, ?)'
  ).bind(email, hashedPassword, name || '', Date.now()).run();

  const userId = result.meta.last_row_id;

  // Generate token
  const token = await generateToken({ id: userId, email }, env);

  return jsonResponse({
    user: { id: userId, email, name },
    token
  }, 201, corsHeaders);
}

/**
 * User Login
 */
async function handleLogin(request, env, corsHeaders) {
  const { email, password } = await request.json();

  const user = await env.DB.prepare(
    'SELECT * FROM users WHERE email = ?'
  ).bind(email).first();

  if (!user) {
    return jsonResponse({ error: 'Invalid credentials' }, 401, corsHeaders);
  }

  // Verify password
  const hashedPassword = await simpleHash(password);
  if (hashedPassword !== user.password) {
    return jsonResponse({ error: 'Invalid credentials' }, 401, corsHeaders);
  }

  // Generate token
  const token = await generateToken({ id: user.id, email: user.email }, env);

  return jsonResponse({
    user: { id: user.id, email: user.email, name: user.name },
    token
  }, 200, corsHeaders);
}

/**
 * CRUD Operations for Items
 */
async function handleItems(request, env, user, corsHeaders) {
  const method = request.method;
  const url = new URL(request.url);
  const itemId = url.pathname.split('/')[3]; // /api/items/:id

  // GET /api/items - List all items for user
  if (method === 'GET' && !itemId) {
    const items = await env.DB.prepare(
      'SELECT * FROM items WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(user.id).all();

    return jsonResponse({ items: items.results }, 200, corsHeaders);
  }

  // GET /api/items/:id - Get single item
  if (method === 'GET' && itemId) {
    const item = await env.DB.prepare(
      'SELECT * FROM items WHERE id = ? AND user_id = ?'
    ).bind(itemId, user.id).first();

    if (!item) {
      return jsonResponse({ error: 'Item not found' }, 404, corsHeaders);
    }

    return jsonResponse({ item }, 200, corsHeaders);
  }

  // POST /api/items - Create new item
  if (method === 'POST') {
    const { title, description, data } = await request.json();

    const result = await env.DB.prepare(
      'INSERT INTO items (user_id, title, description, data, created_at) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      user.id,
      title,
      description || '',
      JSON.stringify(data || {}),
      Date.now()
    ).run();

    return jsonResponse({
      item: {
        id: result.meta.last_row_id,
        title,
        description,
        data
      }
    }, 201, corsHeaders);
  }

  // PUT /api/items/:id - Update item
  if (method === 'PUT' && itemId) {
    const { title, description, data } = await request.json();

    await env.DB.prepare(
      'UPDATE items SET title = ?, description = ?, data = ?, updated_at = ? WHERE id = ? AND user_id = ?'
    ).bind(
      title,
      description || '',
      JSON.stringify(data || {}),
      Date.now(),
      itemId,
      user.id
    ).run();

    return jsonResponse({ success: true }, 200, corsHeaders);
  }

  // DELETE /api/items/:id - Delete item
  if (method === 'DELETE' && itemId) {
    await env.DB.prepare(
      'DELETE FROM items WHERE id = ? AND user_id = ?'
    ).bind(itemId, user.id).run();

    return jsonResponse({ success: true }, 200, corsHeaders);
  }

  return jsonResponse({ error: 'Method not allowed' }, 405, corsHeaders);
}

/**
 * Helper Functions
 */

// Simple hash (use bcrypt in production)
async function simpleHash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate JWT-like token (simplified)
async function generateToken(payload, env) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payloadStr = btoa(JSON.stringify({ ...payload, exp: Date.now() + 86400000 }));
  const signature = await simpleHash(header + '.' + payloadStr + env.JWT_SECRET);
  return `${header}.${payloadStr}.${signature}`;
}

// Verify token
async function verifyToken(token, env) {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSig = await simpleHash(header + '.' + payload + env.JWT_SECRET);

    if (signature !== expectedSig) {
      return null;
    }

    const data = JSON.parse(atob(payload));

    if (data.exp < Date.now()) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

// JSON response helper
function jsonResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}
