import type { NextConfig } from 'next';
import { withContentCollections } from '@content-collections/next';

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default withContentCollections(nextConfig);
