/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [440, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    remotePatterns: [
      { protocol: 'https', hostname: 'www.datocms-assets.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'image.mux.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://chat-assets.frontapp.com https://cdn.mouseflow.com https://js.hs-scripts.com https://assets.apollo.io",
              "style-src 'self' 'unsafe-inline' blob:",
              "img-src 'self' data: https://chat.frontapp.com https://chat-assets.frontusercontent.com https://www.datocms-assets.com https://picsum.photos https://image.mux.com",
              "font-src 'self' data: https://chat-assets.frontapp.com",
              "connect-src 'self' https://chat-assets.frontapp.com https://chat.frontapp.com https://us-west-1-chat-server.frontapp.com https://us-west-2-chat-server.frontapp.com https://eu-west-1-chat-server.frontapp.com wss://front-us-realtime.ably.io wss://front-eu-realtime.ably.io https://chat-webhook.frontapp.com https://*.bugsnag.com https://*.browser-intake-datadoghq.com https://cdn.mouseflow.com https://js.hs-scripts.com https://formspree.io https://aplo-evnt.com",
              "object-src 'none'",
              "worker-src blob:",
            ].join('; '),
          },
        ],
      },
    ];
  },

  webpack(config, options) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        // issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              // expandProps: false
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
