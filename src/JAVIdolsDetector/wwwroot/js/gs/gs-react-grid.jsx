var React = require("react");
var GsReactSearchBox = require("js/gs/gs-react-searchbox.jsx");
var GsReactGrid = React.createClass({
    onRowSelect: function (rowData) {
        this.props.onRowSelect(rowData);
    },
    render: function () {
        var rows = this.props.gridData.map(function (item) {
            var selected = item[this.props.keyField] == this.props.selectedRow[this.props.keyField];
            return (
                <GsReactGridRow rowData={$.extend({}, item)}
                                key={item[this.props.keyField]}
                                columns={this.props.columns}
                                onRowSelect={this.onRowSelect }
                                selected={selected}>
                </GsReactGridRow>
            );
        }.bind(this));
        return (
            <div>
                <div className="table-responsive gs-react-grid">
                    <table className="table table-striped table-bordered table-hover">
                        <GsReactGridHeader columns={this.props.columns}></GsReactGridHeader>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});
var GsReactGridHeader = React.createClass({
    render: function () {
        var cols = this.props.columns.map(function (col) {
            return (<td className="gs-react-grid-header" key={col.key }>{col.name}</td>);
        });
        return (
        <thead>
            <tr>{cols}</tr>
        </thead>
    );
    }
})
var GsReactGridCell = React.createClass({
    render: function () {
        var baseClasses = "gs-react-grid-cell";
        var className = baseClasses;
        return (<td className={className }>{this.props.cellValue}</td>)
    }
});
var GsReactGridRow = React.createClass({
    getInitialState: function () {
        return null;
    },
    onRowSelect: function () {
        this.props.onRowSelect(this.props.rowData);
    },
    render: function () {
        var cells = this.props.columns.map(function (col) {
            return (<GsReactGridCell key={col.key} cellValue={this.props.rowData[col.key] }></GsReactGridCell>);
        }.bind(this));
        var baseClasses = "gs-react-grid-row";
        var className = baseClasses + (this.props.selected ? " selected" : "");
        return (
            <tr className={className} onClick={this.onRowSelect}>
                {cells}
            </tr>
        );
    }
});
module.exports = GsReactGrid;