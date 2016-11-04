var React = require("react");
var GsReactSearchBox = React.createClass({
    handleKeyUp: function (event) {
        console.log(arguments);
    },
    render: function () {
        return (<input className="gs-react-searchbox" defaultValue={this.props.value} onKeyUp={this.handleKeyUp } />);
    }
});
module.exports = GsReactSearchBox;