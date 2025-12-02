/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['leaflet', 'leaflet-draw'],
    webpack: (config, { dev, isServer }) => {
        // Disable CSS minification that's causing issues with leaflet CSS
        if (!dev && !isServer) {
            config.optimization.minimizer = config.optimization.minimizer.filter(
                minimizer => minimizer.constructor.name !== 'CssMinimizerPlugin'
            );
        }
        return config;
    },
};

export default nextConfig;
