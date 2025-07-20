import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A opção agora fica no nível principal da configuração
  transpilePackages: ["graphql-request", "graphql-tag"],
};

export default nextConfig;
