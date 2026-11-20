import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Sitio 100% estático: se publica tal cual en Cloudflare Pages (carpeta `out`).
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
