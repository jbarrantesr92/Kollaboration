
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  i18n: {
    locales: ["en", "es"], 
    defaultLocale: "en",
  },
};

module.exports = nextConfig;