/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   ppr,
  // },
  images: {
    remotePatterns: [
      new URL(
        "https://mmxpwidggqxudejlgpxh.supabase.co/storage/v1/object/public/cabin-images/**"
      ),
      new URL("https://lh3.googleusercontent.com/a/**"),
    ],
  },
};

export default nextConfig;
