const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports = {

  // for webpack-bundle-analyzer
  // from https://github.com/zeit/next.js/blob/0fdd379eee33ac9708a74cd994ba3fdfbffbdee0/examples/with-webpack-bundle-analyzer/next.config.js
  webpack: (config, { dev }) => {
    // Perform customizations to config
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        generateStatsFile: true,
        // Will be available at `.next/stats.json`
        statsFilename: 'stats.json'
      })
    )
    // Important: return the modified config
    return config
  },

  // for static site export
  exportPathMap: () => ({
    "/": { page: "/" },
    "/about": { page: "/about" },
    "/password-reset": { page: "/password-reset" },
    "/password-reset-sent": { page: "/password-reset-sent" },
    "/users": { page: "/users" },
    "/users/edit": { page: "/users/edit" },
  })
}
