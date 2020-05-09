const path = require('path')
const Dotenv = require('dotenv-webpack')
const merge = require('webpack-merge')
const withPWA = require('next-pwa')

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @param  {string} tsconfigPath           - Path to tsconfig
 * @param  {string} webpackConfigBasePath  - Relative base path from tsconfig to Webpack config to create absolute aliases
 * @return {object}                        - Webpack alias config
 */
function resolveTsconfigPathsToAlias({
    tsconfigPath = './tsconfig.json',
    webpackConfigBasePath = './',
}) {
    const { paths } = require(tsconfigPath).compilerOptions
    const aliases = {}

    if (paths) {
        Object.keys(paths).forEach((item) => {
            const key = item.replace('/*', '')
            const value = path.resolve(
                webpackConfigBasePath,
                paths[item][0].replace('/*', '')
            )

            aliases[key] = value
        })
    }

    return aliases
}

module.exports = withPWA({
    pwa: {
        dest: 'public',
    },
    exportTrailingSlash: true,
    webpack: (config, options) => {
        const setting = {
            module: {
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                        use: {
                            loader: 'url-loader',
                            options: {
                                limit: 100000,
                                name: '[name].[ext]',
                                esModule: false,
                            },
                        },
                    },
                ],
            },
            resolve: {
                alias: {
                    ...resolveTsconfigPathsToAlias({
                        tsconfigPath: './tsconfig.json',
                    }),
                },
            },
            plugins: [new Dotenv()],
        }

        return merge(config, setting)
    },
})
