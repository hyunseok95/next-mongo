/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
        "localhost",`${process.env.NEXT_PUBLIC_AWS_S3_HOST}`
    ]
  },
  experimental: {
    outputStandalone: true
  }
}

module.exports = nextConfig
