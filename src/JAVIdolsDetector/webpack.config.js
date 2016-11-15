var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
module.exports = {
    context: path.join(__dirname, "wwwroot"),
    entry: {
        gridDemo: ["./js/ReactTraining/grid-demo.jsx"],
        homeIndex: ["./js/Home/index.jsx"],
        reactTrainingIndex: ["./js/ReactTraining/index.jsx"],
        reactTrainingThinking: ["./js/ReactTraining/thinking.jsx"],
        adminPersonGroupList: ["./js/Admin/person-group-list.jsx"],
        adminPersonList: ["./js/Admin/person-list.jsx"],
        adminFaceList: ["./js/Admin/face-list.jsx"]
    },
    output: {
        path: path.join(__dirname + "/wwwroot/build/", "js"),
        filename: "[name].bundle.js".toLowerCase()
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.css/,
                loaders: [
                    { loader: "style" },
                    { loader: "css" },
                    { loader: "postcss" }
                ]
            },
            { test: /\.png($|\?)|\.ico($|\?)/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" }
        ]
    },
    postcss: [autoprefixer({ browsers: ["last 2 versions"] })],
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        extensions: ["", ".js", ".jsx"],
        root: [
            path.join(__dirname, "wwwroot")
        ]
    },
    externals: {
    }
};