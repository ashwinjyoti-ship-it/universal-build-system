/**
 * Brand Design Generator
 * Creates complete brand identity: colors, typography, logos
 */

const brandTemplates = {
  modern: {
    colorSchemes: [
      { primary: '#667eea', secondary: '#764ba2', accent: '#f093fb', name: 'Purple Gradient' },
      { primary: '#4facfe', secondary: '#00f2fe', accent: '#43e97b', name: 'Ocean Blue' },
      { primary: '#fa709a', secondary: '#fee140', accent: '#30cfd0', name: 'Sunset' }
    ],
    fonts: {
      heading: "'Inter', -apple-system, sans-serif",
      body: "'Inter', -apple-system, sans-serif"
    }
  },

  elegant: {
    colorSchemes: [
      { primary: '#1a1a2e', secondary: '#16213e', accent: '#c9a96e', name: 'Luxury Dark' },
      { primary: '#2d3561', secondary: '#c05c7e', accent: '#f3826f', name: 'Royal' },
      { primary: '#0f3460', secondary: '#16213e', accent: '#e94560', name: 'Navy Rose' }
    ],
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Lato', sans-serif"
    }
  },

  playful: {
    colorSchemes: [
      { primary: '#ff6b6b', secondary: '#4ecdc4', accent: '#ffe66d', name: 'Rainbow' },
      { primary: '#ff006e', secondary: '#8338ec', accent: '#3a86ff', name: 'Electric' },
      { primary: '#06ffa5', secondary: '#7b2cbf', accent: '#ff9e00', name: 'Vibrant' }
    ],
    fonts: {
      heading: "'Poppins', sans-serif",
      body: "'Poppins', sans-serif"
    }
  },

  minimal: {
    colorSchemes: [
      { primary: '#000000', secondary: '#ffffff', accent: '#666666', name: 'Monochrome' },
      { primary: '#2c3e50', secondary: '#ecf0f1', accent: '#3498db', name: 'Clean Slate' },
      { primary: '#1e1e1e', secondary: '#f5f5f5', accent: '#0066cc', name: 'Corporate' }
    ],
    fonts: {
      heading: "'Helvetica Neue', Arial, sans-serif",
      body: "'Helvetica Neue', Arial, sans-serif"
    }
  },

  tech: {
    colorSchemes: [
      { primary: '#00d4ff', secondary: '#090979', accent: '#ff0099', name: 'Cyber' },
      { primary: '#1a1a2e', secondary: '#16213e', accent: '#0f3460', name: 'Matrix' },
      { primary: '#00fff5', secondary: '#7b2cbf', accent: '#ff006e', name: 'Neon' }
    ],
    fonts: {
      heading: "'Space Grotesk', monospace",
      body: "'IBM Plex Sans', sans-serif"
    }
  }
};

/**
 * Generate SVG logo
 */
function generateLogo(businessName, style = 'modern', type = 'wordmark') {
  const scheme = brandTemplates[style].colorSchemes[0];

  if (type === 'wordmark') {
    return generateWordmark(businessName, scheme);
  } else if (type === 'icon') {
    return generateIconLogo(businessName, scheme);
  } else {
    return generateCombinationLogo(businessName, scheme);
  }
}

function generateWordmark(name, scheme) {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase();

  return `
<svg width="300" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${scheme.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${scheme.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="10" y="55" font-family="Inter, sans-serif" font-size="48" font-weight="700" fill="url(#gradient)">
    ${name}
  </text>
</svg>
  `.trim();
}

function generateIconLogo(name, scheme) {
  const initial = name[0].toUpperCase();

  return `
<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${scheme.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${scheme.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="40" cy="40" r="38" fill="url(#gradient)"/>
  <text x="40" y="55" font-family="Inter, sans-serif" font-size="36" font-weight="700" fill="white" text-anchor="middle">
    ${initial}
  </text>
</svg>
  `.trim();
}

function generateCombinationLogo(name, scheme) {
  const initial = name[0].toUpperCase();

  return `
<svg width="300" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${scheme.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${scheme.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="40" cy="40" r="35" fill="url(#gradient)"/>
  <text x="40" y="52" font-family="Inter, sans-serif" font-size="32" font-weight="700" fill="white" text-anchor="middle">
    ${initial}
  </text>
  <text x="90" y="52" font-family="Inter, sans-serif" font-size="36" font-weight="700" fill="${scheme.primary}">
    ${name}
  </text>
</svg>
  `.trim();
}

/**
 * Generate complete brand package as CSS variables
 */
function generateBrandCSS(businessName, style = 'modern', colorIndex = 0) {
  const template = brandTemplates[style];
  const scheme = template.colorSchemes[colorIndex];

  return `
/* Brand: ${businessName} */
/* Style: ${style} */
/* Color Scheme: ${scheme.name} */

:root {
  /* Brand Colors */
  --brand-primary: ${scheme.primary};
  --brand-secondary: ${scheme.secondary};
  --brand-accent: ${scheme.accent};

  /* Typography */
  --font-heading: ${template.fonts.heading};
  --font-body: ${template.fonts.body};

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, ${scheme.primary} 0%, ${scheme.secondary} 100%);
  --gradient-accent: linear-gradient(135deg, ${scheme.secondary} 0%, ${scheme.accent} 100%);

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Base Typography */
body {
  font-family: var(--font-body);
  color: #1a1a1a;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

/* Utility Classes */
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-bg {
  background: var(--gradient-primary);
}

.btn-primary {
  background: var(--brand-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-gradient {
  background: var(--gradient-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}
  `.trim();
}

module.exports = {
  brandTemplates,
  generateLogo,
  generateBrandCSS
};
