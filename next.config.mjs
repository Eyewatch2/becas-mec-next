/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "becas.up.railway.app",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
