/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: false,
      },
      {
        source: "/newsletter",
        destination: "https://parsas-newsletter-0145fa.beehiiv.com/",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
