﻿var React = require("react");
var ReactDOM = require("react-dom");
var GsReactGrid = require("js/gs/gs-react-grid.jsx");
var Dialog = require("bootstrap3-dialog");
//var GsReactSearchBox = require("js/gs/gs-react-searchbox.jsx");
var GsReactModal = require("js/gs/gs-react-modal.jsx");
var App = React.createClass({
    getInitialState: function () {
        return {
            personGroupList: []
        }
    },
    render: function () {
        return (
        <div>
    <h3>Sample grid</h3>
    <GridDemo getUrl="/ReactTraining/LoadPersonGroups"></GridDemo>
        </div>);
    }
});

//Columns definition

var GridDemo = React.createClass({
    getInitialState: function () {
        return {

        };
    },
    columns: [
        { key: "personGroupId", name: "Local Id", width: 80, sortable: true, resizable: true },
        { key: "personGroupOnlineId", name: "Online Id", sortable: true, resizable: true },
        { key: "trainingStatus", name: "Training Status", sortable: true, resizable: true }
    ],
    gridOptions: {
        filterOptions: {},
        sortingOptions: {},
        pagingOptions: {}
    },
    getInitialState: function () {
        return {
            rows: []
        }
    },
    loadData: function (args) {
        $.ajax({
            url: this.props.getUrl,
            data: {
                gridOptions: this.gridOptions
            },
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
    componentDidMount: function () {
        this.loadData();
    },
    handleGridSort: function (sortColumn, sortDirection) {
        this.gridOptions = $.extend({}, this.gridOptions, { sortingOptions: { orderBy: sortColumn, direction: sortDirection } });
        this.loadData();
    },
    render: function () {
        return (
            <div>
                <GsReactModal title="Testing Modal"
                              saveCall={function () { console.log("Saved"); }}
                              loadCall={function () { console.log("Modal Loading"); }}>
                <div>
                    <div className="form-group">
                        <label>Id</label><input className="form-control" defaultValue=""/>
                    </div>
                    <div className="form-group">
                        <label>Online Id</label><input className="form-control" defaultValue=""/>
                    </div>
                    <div className="form-group">
                        <label>Training Status</label><input className="form-control" defaultValue=""/>
                    </div>
                </div>
                </GsReactModal>
                <GsReactGrid columns={this.columns}
                             gridData={this.state.rows}
                             keyField="personGroupId"
                             className="gs-react-grid">
                </GsReactGrid>
            </div>
    );
    }
});

ReactDOM.render(<App></App>, document.querySelector(".react-app"));