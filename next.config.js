/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Pour GitHub Pages, il est recommandé de définir le chemin de base si le repo n'est pas à la racine du user
  basePath: '/Prompt-Assistant',
  assetPrefix: '/Prompt-Assistant/',
};

module.exports = nextConfig;
