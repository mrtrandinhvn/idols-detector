var path = require("path");

module.exports = {
    context: path.join(__dirname, "wwwroot"),
    entry: {
        gsReactGrid: ["./lib/gs/gs-react-grid.jsx"],
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
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        root: [
            path.join(__dirname, "wwwroot")
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-bootstrap": "ReactBootstrap"
    }
};