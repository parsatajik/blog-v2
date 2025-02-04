/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pub-0c2e72b44c3040afbe4c0fe25e97d31c.r2.dev'],
  },
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
