/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: "4rlax2qukkijnjti.public.blob.vercel-storage.com",
          },
        ],
      },
};

export default nextConfig;

// next.config.js
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           hostname: "rqcoa3ubmzn9qpsj.public.blob.vercel-storage.com",
//         },
//       ],
//     },
//   };

//   module.exports = nextConfig;