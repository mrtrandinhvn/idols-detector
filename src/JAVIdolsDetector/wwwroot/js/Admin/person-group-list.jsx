var React = require("react");
var ReactDOM = require("react-dom");
var GsReactGrid = require("lib/gs/gs-react-grid.jsx");
var GsReactModal = require("lib/gs/gs-react-modal.jsx");
var BootBox = require("bootbox");
var App = React.createClass({
    render: function () {
        return (
            <div>
                <h3>Person Groups</h3>
                <PersonGroupGrid getUrl="/Admin/LoadPersonGroups"
                                 saveUrl="/Admin/SavePersonGroup"
                                 deleteUrl="/Admin/DeletePersonGroup">
                </PersonGroupGrid>
            </div>
        );
    }
});

//Columns definition

var PersonGroupGrid = React.createClass({
    columns: [
        { key: "personGroupId", name: "Local Id", width: 80, sortable: true },
        { key: "personGroupOnlineId", name: "Online Id", sortable: true },
        { key: "name", name: "Group Name", sortable: true },
        { key: "trainingStatus", name: "Training Status", sortable: true },
    ],
    gridOptions: {
        filterOptions: {},
        sortingOptions: {},
        pagingOptions: {}
    },
    getInitialState: function () {
        return {
            rows: [],
            showModal: false,
            modalMode: "Add",
            selectedRow: {},
            modalData: {
                personGroupOnlineId: "",
                name: ""
            },
            messages: []
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
                BootBox.alert(this.props.saveUrl + ": " + err.toString());
            }.bind(this)
        });
    },
    closeModal: function () {
        this.setState({ showModal: false });
    },
    openModal: function (mode) {
        var data = mode.toLocaleLowerCase() == "edit" ? this.state.selectedRow : {};
        this.setState({
            showModal: true,
            modalMode: mode,
            modalData: data,
            messages: []
        });
    },
    componentDidMount: function () {
        this.loadData();
    },
    handleGridSort: function (sortColumn, sortDirection) {
        this.gridOptions = $.extend({}, this.gridOptions, { sortingOptions: { orderBy: sortColumn, direction: sortDirection } });
        this.loadData();
    },
    validateModal: function () {
        var messages = [];
        if (!this.state.modalData) {
            this.setState({
                messages: [{ text: "Can not get the modal data", type: "error" }]
            });
            return false;
        }
        // add extra validations below
        this.setState({
            messages: messages
        });
        if (messages.length > 0) {
            return false;
        } else {
            return true;
        }
    },
    modalSaveCall: function () {
        $.ajax({
            url: this.props.saveUrl,
            data: {
                mode: this.state.modalMode.toLocaleLowerCase(),
                personGroup: this.state.modalData
            },
            dataType: "json",
            type: "POST",
            cache: false,
            success: function (data) {
                if (data.messages && data.messages.length > 0) {
                    this.setState({
                        messages: data.messages
                    });
                    return;
                }
                this.closeModal();
                this.loadData();
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({
                    messages: [{ type: "error", message: err }]
                });
            }.bind(this)
        });
    },
    onRowSelect: function (rowData) {
        if (this.state.selectedRow.personGroupId == rowData.personGroupId) {
            rowData = {}; // clear selected row
        }
        this.setState({ selectedRow: rowData });
    },
    // START form inputs events
    onGroupIdChanged: function (e) {
        var modalData = this.state.modalData;
        modalData.personGroupOnlineId = e.target.value;
        this.setState({ modalData: modalData });
    },
    onGroupNameChanged: function (e) {
        var modalData = this.state.modalData;
        modalData.name = e.target.value;
        this.setState({ modalData: modalData });
    },
    // END form inputs events
    deleteRecord: function () {
        $.ajax({
            url: this.props.deleteUrl,
            data: {
                personGroup: this.state.selectedRow
            },
            dataType: "json",
            type: "POST",
            cache: false,
            success: function (data) {
                if (data.errors) {
                    this.setState({
                        messages: errors
                    });
                    return;
                }
                this.loadData();
            }.bind(this),
            error: function (xhr, status, err) {
                BootBox.alert(this.props.saveUrl + ": " + err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div>
                <div className="btn-group">
                    <button type="button" className="btn btn-info" onClick={function () { this.openModal("Add"); }.bind(this)}>Add</button>
                    <button className="btn btn-warning" onClick={function () { this.openModal("Edit"); }.bind(this)} disabled={$.isEmptyObject(this.state.selectedRow)}>Edit</button>
                    <button className="btn btn-danger" onClick={this.deleteRecord} disabled={$.isEmptyObject(this.state.selectedRow)}>Delete</button>
                </div>
                <GsReactModal title={this.state.modalMode + " A Person Group"}
                              saveCall={this.modalSaveCall}
                              loadCall={function () { console.log("Modal Loading"); }}
                              showModal={this.state.showModal}
                              closeModal={this.closeModal}>
                    <div className="form">
                        <div className="form-group">
                            <label className="">GroupId</label><input className="form-control" type="text" onChange={this.onGroupIdChanged} value={this.state.modalData.personGroupOnlineId || ""} disabled={this.state.modalMode == "edit"} />
                        </div>
                        <div className="form-group">
                            <label>Group Name</label><input className="form-control" type="text" onChange={this.onGroupNameChanged} value={this.state.modalData.name || ""} />
                        </div>
                    </div>
                    <div className="info">
                        {
                            this.state.messages.map(function (mes, i) {
                                return (<div key={i} className={mes.type }>- {mes.text}</div>)
                            })
                        }
                    </div>
                </GsReactModal>
                <GsReactGrid columns={this.columns}
                             gridData={this.state.rows}
                             keyField="personGroupId"
                             className="gs-react-grid"
                             onRowSelect={this.onRowSelect}
                             selectedRow={this.state.selectedRow}>
                </GsReactGrid>
            </div>
    );
    }
});

ReactDOM.render(<App></App>, document.querySelector(".react-app"));