
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: false,
  i18n: {
    locales: ["en", "es"], 
    defaultLocale: "en",
  },
};

module.exports = nextConfig;