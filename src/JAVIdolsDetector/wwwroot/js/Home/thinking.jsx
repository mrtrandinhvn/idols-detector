var App = React.createClass({
    render: function () {
        return (<FilterableProductTabe />);
    }
});

var FilterableProductTabe = React.createClass({
    render: function () {
        return (
        <div>
            <SearchBar></SearchBar>
            <ProductTable apiUrl="http://localhost:3000/api/products"></ProductTable>
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
    getInitialState: function () {
        return {
            categories: []
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

                this.setState({ products: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        this.loadData();
        var categories = this.state.products.map(function () {
        });
        return (
            <ProductCategoryRow products={this.state.products }></ProductCategoryRow>
            );
    }
});
var ProductCategoryRow = React.createClass({
    render: function () {
        return null; // product components
    }
});
var ProductRow = React.createClass({
    getInitialState: function () {
        return {
            name: "",
            price: "",
            stocked: null
        };
    },
    render: function () {
        return (
            <div className="label productRow"></div>
            );
    }
});
ReactDOM.render(<App></App>, document.querySelector(".react-app"));