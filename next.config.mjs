/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'dailymix-images.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'seed-mix-image.spotifycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'newjams-images.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com',
      },
    ],
  },
}

export default nextConfig
