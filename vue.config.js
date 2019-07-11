const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
                // In case you imported plugins individually, you must also require them here:
                Util: "exports-loader?Util!bootstrap/js/dist/util"
            })
        ]
    },

    css: {
        loaderOptions: {
            sass: {
                data: '@import "@/assets/scss/_variables.scss";\n' +
                    '@import "@/assets/scss/style.scss";'
            }
        }
    },

    publicPath: undefined,
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: false,
    lintOnSave: undefined
};
