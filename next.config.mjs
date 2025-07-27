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
      new URL("https://authjs.dev/img/providers/google.svg"),
      new URL("https://platform-lookaside.fbsbx.com/**"),
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
