/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["becas.up.railway.app", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "becas.up.railway.app",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
