/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Activation pour export statique (déploiement GitHub Pages, Netlify, etc)
  basePath: '/Prompt-Assistant', // À adapter selon ton repo/deployment
  assetPrefix: '/Prompt-Assistant/',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/Prompt-Assistant',
  },
};

module.exports = nextConfig;
