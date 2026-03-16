/**
 * SEO Configuration
 * Central configuration for all SEO-related metadata
 */

export const seoConfig = {
  // Site Information
  siteName: 'Varakumar G - Cybersecurity Portfolio',
  siteUrl: 'https://portfolio.dragnux.com', // UPDATE THIS
  author: 'Varakumar G',
  
  // Default Meta Tags
  defaultTitle: 'Varakumar G | Cybersecurity Developer - Terminal Portfolio',
  defaultDescription: 'Interactive Kali Linux terminal portfolio of Varakumar G, a Cybersecurity Developer specializing in ICS/SCADA Security, Kernel Development, and Offensive Security.',
  
  // Keywords
  keywords: [
    'Varakumar G',
    'Cybersecurity Developer',
    'Security Developer',
    'ICS SCADA Security',
    'Kernel Development',
    'Kali Linux',
    'NetHunter',
    'KernelSU',
    'Wireguard VPN',
    'OSCP',
    'TCM Security',
    'Offensive Security',
    'Penetration Testing',
    'Linux Security',
    'Python Security',
    'NASL',
    'Holmsecurity'
  ],
  
  // Social Media
  social: {
    twitter: '@gvarakumar',
    github: 'https://github.com/varakumar',
    gitlab: 'https://gitlab.com/Tony_01',
    linkedin: 'https://linkedin.com/in/varakumar'
  },
  
  // Open Graph Images
  images: {
    og: '/og-image.png',
    twitter: '/twitter-card.png'
  },
  
  // Verification: done via DNS TXT records (Google + Bing)
  verification: {},
  
  // Analytics (Optional)
  analytics: {
    googleAnalyticsId: '', // GA4 Measurement ID (G-XXXXXXXXXX)
    googleTagManagerId: '', // GTM ID (GTM-XXXXXXX)
  },
  
  // IndexNow
  indexNow: {
    apiKey: 'your-indexnow-api-key-here',
    enabled: false // Set to true when configured
  },
  
  // Structured Data
  structuredData: {
    person: {
      '@type': 'Person',
      name: 'Varakumar G',
      jobTitle: 'Cybersecurity Developer',
      description: 'Cybersecurity Developer specializing in ICS/SCADA Security, Kernel Development, and Offensive Security',
      email: 'varakumar7000@gmail.com',
      knowsAbout: [
        'Cybersecurity',
        'ICS/SCADA Security',
        'Kernel Development',
        'Penetration Testing',
        'Offensive Security',
        'Linux Security',
        'Python',
        'NASL',
        'Node.js'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Holmsecurity AB'
      }
    }
  }
};

/**
 * Generate page-specific metadata
 * @param {Object} overrides - Override default values
 */
export const generateMetadata = (overrides = {}) => {
  return {
    title: overrides.title || seoConfig.defaultTitle,
    description: overrides.description || seoConfig.defaultDescription,
    keywords: overrides.keywords || seoConfig.keywords.join(', '),
    url: overrides.url || seoConfig.siteUrl,
    image: overrides.image || seoConfig.siteUrl + seoConfig.images.og,
    ...overrides
  };
};

export default seoConfig;
