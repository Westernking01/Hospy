import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  transpilePackages: ["@hopsy/ui", "@hopsy/utils", "lucide-react", "@hopsy/validation", "@hopsy/commerce", "@hopsy/database"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
