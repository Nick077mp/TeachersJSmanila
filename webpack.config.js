//Sirve para identificar la ruta de donde se encuentra este archivo
const path = require('path')
//Me permite trabajar con documentos HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Extraer el codigo CSS, minimificarlo y optimizarlo. Ademas lo agrega como parte del head
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Nos permite copiar archivos de una ruta a otra
const CoyWebpackPlugin = require('copy-webpack-plugin');

mosdule.exports = (env, argv) => {

    //Los operadores en java script y diferencias entre el operador == y ===
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            index: './src/index.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test:/\.js$/,
                    include: path.resolve(__dirname, 'src/assests/js'),
                    use:{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: [],
        devServer: {
            static: {
                directory: path.join(_dirname, 'dist'),
            },
            open: true,
            hot: true,
            warchFiles: [
                "src/**/*"
            ]
        }
    };
}

