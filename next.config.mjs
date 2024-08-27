import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["yjs"] = path.resolve("./", "node_modules/yjs");
    }
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
  reactStrictMode: false,
};

export default nextConfig;
