var React = require("react");
var GsReactDropDownList = React.createClass({
    render: function () {
        var options = this.props.options.map(function (option) {
            return (<option key={option.value} value={option.value }>{option.label}</option>)
        });
        return (
            <select className="gs-react-dropdownlist form-control"
                    onChange={this.props.onChange}
                    disabled={this.props.disabled}
                    value={this.props.value}>
                <option value="">None</option>
                {options}
            </select>
        );
    }
});
module.exports = GsReactDropDownList;
