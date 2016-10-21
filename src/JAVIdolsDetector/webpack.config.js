var path = require("path");

module.exports = {
    context: path.join(__dirname, "wwwroot"),
    entry: ["./lib/gs/gs-react-grid.jsx"],
    output: {
        path: path.join(__dirname + "/wwwroot", "build"),
        filename: "bundle.js"
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
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
    },
    externals: {
        react: "React"
    }
};