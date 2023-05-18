const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@tremor/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.weatherbit.io",
      },
    ],
  },
};
module.exports = nextConfig;
