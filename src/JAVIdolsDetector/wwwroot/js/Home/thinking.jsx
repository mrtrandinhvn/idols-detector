var React = require("react");
var ReactDOM = require("react-dom");
var Dialog = require("bootstrap3-dialog");
var App = React.createClass({
    render: function () {
        return (<FilterableProductTabe apiUrl="http://localhost:3000/api/products" />);
    }
});

var FilterableProductTabe = React.createClass({
    getInitialState: function () {
        return {
            categories: [],
            filterText: "",
            inStockOnly: false
        }
    },
    loadData: function () {
        function indexOf(arr, field, fieldValue) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][field] == fieldValue) {
                    result.push(i);
                }
            }
            return result;
        }
        function groupByField(data, field) {
            // requirement: data is sorted by field
            var result = [];
            var lastGroup = null;
            for (var i = 0; i < data.length; i++) {
                var group = {
                    name: data[i][field],
                    data: []
                };
                var indexes = indexOf(result, "name", group.name);
                if (indexes.length == 1) { // group should be unique in result array
                    result[indexes[0]].data.push(data[i]);
                } else {
                    // add new group into result
                    group.data.push(data[i]);
                    result.push(group);
                }
            }
            return result;
        };
        $.ajax({
            url: this.props.apiUrl,
            data: null,
            dataType: "json",
            type: "GET",
            cache: false,
            success: function (data) {
                if (!data) { return; }
                var categories = groupByField(data, "category");
                this.setState({ categories: categories });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadData();
    },
    render: function () {
        return (
        <div>
            <SearchBar></SearchBar>
            <ProductTable categories={this.state.categories}></ProductTable>
        </div>
        );
    }
});
var SearchBar = React.createClass({
    render: function () {
        return null;
    }
});
var ProductTable = React.createClass({
    render: function () {
        var rows = this.props.categories.map(function (category, index) {
            return (<ProductCategoryRow products={category.data} key={category.name }></ProductCategoryRow>)
        });
        return (
            <div>{rows}</div>
            );
    }
});
var ProductCategoryRow = React.createClass({
    render: function () {
        var rows = this.props.products.map(function (product, index) {
            return (<ProductRow data={product} key={product.name }></ProductRow>);
        });
        return (<div className="category-row">{rows}</div>); // product components
    }
});
var ProductRow = React.createClass({
    render: function () {
        return (
            <div className="product-row">
                <div className="col-md-6">{this.props.data.stocked ? this.props.data.name : (<span className="error">{this.props.data.name}</span>)}</div><div className="col-md-6">{this.props.data.price}</div>
            </div>
            );
    }
});
if (typeof (window) !== "undefined") {
    ReactDOM.render(<App></App>, document.querySelector(".react-app"));
}