var React = require("react");
var ReactDOM = require("react-dom");
var App = React.createClass({
    render: function () {
        return (
        <div>
    <h3>Filterable Product table</h3>
    <FilterableProductTabe apiUrl="http://localhost:3000/api/products"></FilterableProductTabe>
        </div>);
    }
});

var FilterableProductTabe = React.createClass({
    getInitialState: function () {
        return {
            categories: [],
            //filter: "",
            //inStockOnly: false
        }
    },
    indexOf: function (arr, field, fieldValue) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][field] == fieldValue) {
                result.push(i);
            }
        }
        return result;
    },
    groupByField: function (data, field) {
        // requirement: data is sorted by field
        var result = [];
        var lastGroup = null;
        for (var i = 0; i < data.length; i++) {
            var group = {
                name: data[i][field],
                data: []
            };
            var indexes = this.indexOf(result, "name", group.name);
            if (indexes.length == 1) { // group should be unique in result array
                result[indexes[0]].data.push(data[i]);
            } else {
                // add new group into result
                group.data.push(data[i]);
                result.push(group);
            }
        }
        return result;
    },
    loadData: function (filter, isStocked) {
        $.ajax({
            url: this.props.apiUrl,
            data: null,
            dataType: "json",
            type: "GET",
            cache: false,
            success: function (list) {
                if (!list) { return; }
                var data = [];
                list.forEach(function (product, index) {
                    if (!filter && !isStocked) {
                        // no filter, no stock only
                        data.push(product);
                    } else if (!filter && isStocked) {
                        // no filter, stock only
                        if (product.stocked) {
                            data.push(product);
                        }
                    } else {
                        // has filter
                        if (!isStocked) {
                            // has filter, no stock only
                            if (product.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
                                data.push(product);
                            }
                        } else {
                            // has filter, has stock only
                            if (product.stocked && product.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
                                data.push(product);
                            }
                        }
                    }
                });
                var categories = this.groupByField(data, "category");
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
    onSearch: function (filter, isStocked) {
        this.loadData(filter, isStocked);
    },
    render: function () {
        return (
        <div>
            <SearchBar onSearch={this.onSearch}></SearchBar>
            <ProductTable categories={this.state.categories}></ProductTable>
        </div>
        );
    }
});
var SearchBar = React.createClass({
    onSearchChanged: function (event) {
        var searchText = this.refs.searchText.value;
        var isStocked = this.refs.stockCheckbox.checked;
        this.props.onSearch(searchText, isStocked);
    },
    render: function () {
        return (
            <div className="search-bar">
                <input type="search" className="form-control" ref="searchText" placeholder="Search here..." onChange={this.onSearchChanged} />
                <div className="checkbox"><label><input type="checkbox" ref="stockCheckbox" className="" onChange={this.onSearchChanged} /> Stocked only</label></div>
            </div>
            );
    }
});
var ProductTable = React.createClass({
    render: function () {
        var rows = this.props.categories.map(function (category, index) {
            return (<ProductCategoryRow name={category.name} products={category.data} key={category.name }></ProductCategoryRow>)
        });
        return (
            <div>{rows}</div>
            );
    }
});
var ProductCategoryRow = React.createClass({
    render: function () {
        var rows = this.props.products.map(function (product, index) {
            return (<ProductRow data={product} key={product.name }></ProductRow>); // product components
        });
        return (
        <div className="category-row">
            <h4>{this.props.name}</h4>
            {rows}
        </div>);
    }
});
var ProductRow = React.createClass({
    render: function () {
        return (
            <div className="row product-row">
                <div className="col-md-6">{this.props.data.stocked ? this.props.data.name : (<span className="error">{this.props.data.name}</span>)}</div><div className="col-md-6">{this.props.data.price}</div>
            </div>
            );
    }
});
ReactDOM.render(<App></App>, document.querySelector(".react-app"));
