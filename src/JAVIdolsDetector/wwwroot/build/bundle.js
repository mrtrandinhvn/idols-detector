/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var GsReactSearchBox = __webpack_require__(2);
	console.log(GsReactSearchBox);
	var GsReactGrid = React.createClass({
	    displayName: "GsReactGrid",

	    getInitialState: function getInitialState() {
	        return {
	            personGroupList: []
	        };
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "h3",
	                null,
	                "Sortable grid"
	            ),
	            React.createElement(GsReactSearchBox, null),
	            React.createElement(SortableGrid, { getUrl: "/Admin/LoadPersonGroups" })
	        );
	    }
	});

	//Columns definition
	var columns = [{ key: "personGroupId", name: "Local Id", width: 80, sortable: true, resizable: true }, { key: "personGroupOnlineId", name: "Online Id", sortable: true, resizable: true }, { key: "trainingStatus", name: "Training Status", sortable: true, resizable: true }];

	var SortableGrid = React.createClass({
	    displayName: "SortableGrid",

	    getInitialState: function getInitialState() {
	        return {
	            rows: []
	        };
	    },
	    loadData: function loadData(args) {
	        $.ajax({
	            url: this.props.getUrl,
	            data: args,
	            dataType: "json",
	            type: "POST",
	            cache: false,
	            success: function (data) {
	                if (data) {
	                    this.setState({
	                        rows: data
	                    });
	                }
	            }.bind(this),
	            error: function (xhr, status, err) {
	                console.error(this.props.url, status, err.toString());
	            }.bind(this)
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        this.loadData();
	    },
	    rowGetter: function rowGetter(rowIndex) {
	        return this.state.rows[rowIndex];
	    },
	    handleGridSort: function handleGridSort(sortColumn, sortDirection) {
	        this.loadData({});
	        this.setState({ rows: rows });
	    },
	    render: function render() {
	        return React.createElement(ReactDataGrid, { onGridSort: this.handleGridSort,
	            columns: columns,
	            rowGetter: this.rowGetter,
	            rowsCount: this.state.rows.length,
	            minHeight: 500,
	            onRowUpdated: this.handleRowUpdated });
	    }

	});

	ReactDOM.render(React.createElement(GsReactGrid, null), document.querySelector(".react-app"));

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var GsReactSearchBox = React.createClass({
	    displayName: "GsReactSearchBox",

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "gs-searchbox" },
	            "wtf"
	        );
	    }
	});
	module.exports = GsReactSearchBox;

/***/ }
/******/ ]);