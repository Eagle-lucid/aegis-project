import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@aegis/ui'],
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'framer-motion'],
  },

  webpack: (config) => {
    // Handle .glb/.gltf files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
