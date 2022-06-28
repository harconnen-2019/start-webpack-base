const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const {extendDefaultPlugins} = require('svgo');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) =>
    isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
    const configObj = {
        splitChunks: {
            chunks: 'all',
        },
    };
    if (isProd) {
        configObj.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ];
    }

    return configObj;
};

const plugins = () => {
    const basePlugins = [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            // template: path.resolve(__dirname, './src/index.pug'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
    ];

    if (isProd) {
        basePlugins.push(
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            // [
                            //     'svgo',
                            //     {
                            //         plugins: {
                            //             name: 'preset-default',
                            //             params: {
                            //                 overrides: {
                            //                     inlineStyles: {
                            //                         onlyMatchedOnce: false,
                            //                     },
                            //
                            //                     // or disable plugins
                            //                     removeDoctype: false,
                            //                 }
                            //             }
                            //         }
                            //     },
                            // ],
                        ],
                    },
                },
            })
        );
    }

    return basePlugins;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/main.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    optimization: optimization(),
    plugins: plugins(),
    devtool: isProd ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            // {
            //     test: /\.pug$/,
            //     loader: 'pug-loader',
            // },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return (
                                    path.relative(
                                        path.dirname(resourcePath),
                                        context
                                    ) + '/'
                                );
                            },
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: './img/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            },
        ],
    },
};
