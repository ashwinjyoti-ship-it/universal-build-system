/**
 * Universal Deployment Configuration
 * Works from any device, any location
 */

module.exports = {
  // Cloudflare configuration (already set up)
  cloudflare: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    apiToken: process.env.CLOUDFLARE_API_TOKEN,
    platform: 'pages', // Use Cloudflare Pages for static sites and Workers for APIs
  },

  // GitHub configuration (for version control and CI/CD)
  github: {
    enabled: true,
    autoCommit: true, // Auto-commit changes
    autoPush: true, // Auto-push to remote
    branch: 'main',
  },

  // Database configuration (Cloudflare D1)
  database: {
    enabled: false, // Set to true when app needs database
    name: '', // Auto-generated based on project
    migrations: './migrations',
  },

  // Project templates
  templates: {
    'landing-page': {
      type: 'static',
      needsDatabase: false,
      agents: ['graphic-design', 'website-builder'],
    },
    'blog': {
      type: 'static',
      needsDatabase: true,
      agents: ['graphic-design', 'website-builder', 'database'],
      schema: ['users', 'posts', 'comments'],
    },
    'ecommerce': {
      type: 'fullstack',
      needsDatabase: true,
      agents: ['graphic-design', 'website-builder', 'database', 'fullstack'],
      schema: ['users', 'products', 'orders', 'cart'],
    },
    'saas-app': {
      type: 'fullstack',
      needsDatabase: true,
      agents: ['graphic-design', 'fullstack', 'database'],
      schema: ['users', 'subscriptions', 'items'],
    },
    'booking-system': {
      type: 'fullstack',
      needsDatabase: true,
      agents: ['graphic-design', 'website-builder', 'database', 'fullstack'],
      schema: ['users', 'bookings', 'availability'],
    },
    'portfolio': {
      type: 'static',
      needsDatabase: false,
      agents: ['graphic-design', 'website-builder'],
    },
  },

  // Agent routing rules
  routing: {
    keywords: {
      'graphic-design': [
        'logo', 'branding', 'colors', 'design', 'brand', 'visual',
        'graphics', 'identity', 'style', 'theme',
      ],
      'website-builder': [
        'website', 'landing page', 'homepage', 'site', 'web',
        'portfolio', 'blog', 'pages',
      ],
      'fullstack': [
        'app', 'application', 'dashboard', 'admin', 'login',
        'signup', 'authentication', 'user accounts', 'api',
      ],
      'database': [
        'database', 'data', 'storage', 'save', 'records',
        'users', 'products', 'orders', 'store data',
      ],
    },

    // Auto-enable certain agents based on project type
    autoEnable: {
      ecommerce: ['graphic-design', 'website-builder', 'database', 'fullstack'],
      blog: ['graphic-design', 'website-builder', 'database'],
      'landing-page': ['graphic-design', 'website-builder'],
      'saas-app': ['graphic-design', 'fullstack', 'database'],
    },
  },

  // Brand style presets
  brandStyles: {
    modern: {
      description: 'Clean gradients, modern sans-serif fonts',
      colors: ['#667eea', '#764ba2', '#f093fb'],
      fonts: { heading: 'Inter', body: 'Inter' },
    },
    elegant: {
      description: 'Luxury serif fonts, sophisticated colors',
      colors: ['#1a1a2e', '#c9a96e', '#f3826f'],
      fonts: { heading: 'Playfair Display', body: 'Lato' },
    },
    playful: {
      description: 'Bright colors, friendly rounded fonts',
      colors: ['#ff6b6b', '#4ecdc4', '#ffe66d'],
      fonts: { heading: 'Poppins', body: 'Poppins' },
    },
    minimal: {
      description: 'Clean, simple, monochrome',
      colors: ['#000000', '#ffffff', '#666666'],
      fonts: { heading: 'Helvetica Neue', body: 'Helvetica Neue' },
    },
    tech: {
      description: 'Futuristic, cyber, high-tech',
      colors: ['#00d4ff', '#090979', '#ff0099'],
      fonts: { heading: 'Space Grotesk', body: 'IBM Plex Sans' },
    },
  },

  // Deployment settings
  deployment: {
    autoPreview: true, // Show preview before deploying
    confirmBeforeDeploy: false, // Deploy directly without asking (fast mode)
    buildCommand: 'npm run build',
    outputDir: '.',
  },

  // Feature flags
  features: {
    mobileResponsive: true, // Always enabled
    seoOptimization: true, // Auto SEO tags
    analytics: false, // Cloudflare Web Analytics
    security: true, // Auto security headers
    caching: true, // Auto caching for static assets
  },
};
