import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const localAddresses = Object.values(networkInterfaces())
  .flatMap((interfaces) => interfaces ?? [])
  .filter((network) => network.family === "IPv4" && !network.internal)
  .map((network) => network.address);

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: { root: process.cwd() },
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1", ...localAddresses],
};

export default nextConfig;
