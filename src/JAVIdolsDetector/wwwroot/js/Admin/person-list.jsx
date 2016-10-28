﻿var GsReactGrid = require("lib/gs/gs-react-grid.jsx");
var GsSelect = require("lib/gs/gs-react-dropdownlist.jsx");
var GsReactModal = require("lib/gs/gs-react-modal.jsx");
var App = React.createClass({
    render: function () {
        return (
            <div>
                <h3>People</h3>
                <PersonGrid getUrl="/Admin/LoadPeople"
                            saveUrl="/Admin/SavePerson"
                            deleteUrl="/Admin/DeletePerson">
                </PersonGrid>
            </div>
        );
    }
});

//Columns definition

var PersonGrid = React.createClass({
    columns: [
        { key: "personId", name: "Local Id", width: 80, sortable: true },
        { key: "personOnlineId", name: "Online Id", sortable: true },
        { key: "name", name: "Name", sortable: true },
        { key: "alias", name: "Alias", sortable: true },
        { key: "birthDateString", name: "Birth Date", sortable: true },
        { key: "height", name: "Height", sortable: true },
        { key: "eyeColor", name: "Eye Color", sortable: true },
        { key: "hairColor", name: "Hair Color", sortable: true },
        { key: "countryId", name: "CountryId", sortable: true },
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
            modalData: {},
            messages: [],
            personGroupDDL: []
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
                console.error(this.props.getUrl, status, err.toString());
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
            modalData: data
        });
    },
    componentDidMount: function () {
        this.loadData();
    },
    handleGridSort: function (sortColumn, sortDirection) {
        this.gridOptions = $.extend({}, this.gridOptions, { sortingOptions: { orderBy: sortColumn, direction: sortDirection } });
        this.loadData();
    },
    modalSaveCall: function () {
        $.ajax({
            url: this.props.saveUrl,
            data: {
                mode: this.state.modalMode.toLocaleLowerCase(),
                person: this.state.modalData
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
                this.closeModal();
                this.loadData();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.saveUrl, status, err.toString());
            }.bind(this)
        });
    },
    modalLoadCall: function () {
        $.ajax({
            url: "/Admin/PersonGroupDDL",
            type: "POST",
            cache: false,
            success: function (data) {
                if (data.errors) {
                    this.setState({
                        messages: errors
                    });
                    return;
                }
                this.setState({ personGroupDDL: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.saveUrl, status, err.toString());
            }.bind(this)
        });
    },
    onRowSelect: function (rowData) {
        this.setState({ selectedRow: rowData });
    },
    // START form inputs events
    onGroupIdChange: function (e) {
        var modalData = this.state.modalData;
        modalData.personGroupId = e.target.value;
        this.setState({ modalData: modalData });
    },
    onNameChange: function (e) {
        var modalData = this.state.modalData;
        modalData.name = e.target.value;
        this.setState({ modalData: modalData });
    },
    onAliasChange: function (e) {
        var modalData = this.state.modalData;
        modalData.alias = e.target.value;
        this.setState({ modalData: modalData });
    },
    onBirthDateChange: function (e) {
        var modalData = this.state.modalData;
        modalData.birthDate = e.target.value;
        modalData.birthDateString = e.target.value;
        this.setState({ modalData: modalData });
    },
    onHeightChange: function (e) {
        var modalData = this.state.modalData;
        modalData.height = e.target.value;
        this.setState({ modalData: modalData });
    },
    onEyeColorChange: function (e) {
        var modalData = this.state.modalData;
        modalData.eyeColor = e.target.value;
        this.setState({ modalData: modalData });
    },
    onHairColorChange: function (e) {
        var modalData = this.state.modalData;
        modalData.hairColor = e.target.value;
        this.setState({ modalData: modalData });
    },
    // END form inputs events
    deleteRecord: function () {
        $.ajax({
            url: this.props.deleteUrl,
            data: {
                person: this.state.selectedRow
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
                console.error(this.props.saveUrl, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div>
                <div className="btn-group">
                    <button type="button" className="btn btn-info" onClick={function () { this.openModal("Add"); }.bind(this)}>Add</button>
                    <button className="btn btn-warning" onClick={function () { this.openModal("Edit"); }.bind(this)} disabled={$.isEmptyObject(this.state.selectedRow)}>Edit</button>
                    <button className="btn btn-danger" onClick={this.deleteRecord}>Delete</button>
                </div>
                <GsReactModal title={this.state.modalMode + " Person Group"}
                              saveCall={this.modalSaveCall}
                              loadCall={this.modalLoadCall}
                              showModal={this.state.showModal}
                              closeModal={this.closeModal}>
                    <div className="form">
                        <div className="form-group">
                            <label className="">Group</label><GsSelect disabled={this.state.modalMode.toLocaleLowerCase()=="edit"} className="form-control" options={this.state.personGroupDDL} onChange={this.onGroupIdChange} value={this.state.modalData.personGroupId || ""}></GsSelect>
                        </div>
                        <div className="form-group">
                            <label className="">Name</label><input className="form-control" type="text" onChange={this.onNameChange} value={this.state.modalData.name || ""} />
                        </div>
                        <div className="form-group">
                            <label>Alias</label><input className="form-control" type="text" onChange={this.onAliasChange} value={this.state.modalData.alias || ""} />
                        </div>
                        <div className="form-group">
                            <label>Birth Date</label><input className="form-control" type="date" onChange={this.onBirthDateChange} value={this.state.modalData.birthDateString || ""} />
                        </div>
                        <div className="form-group">
                            <label>Height</label><input className="form-control" type="number" onChange={this.onHeightChange} value={this.state.modalData.height || ""} />
                        </div>
                        <div className="form-group">
                            <label>Eye Color</label><input className="form-control" type="text" onChange={this.onEyeColorChange} value={this.state.modalData.eyeColor || ""} />
                        </div>
                        <div className="form-group">
                            <label>Hair Color</label><input className="form-control" type="text" onChange={this.onHairColorChange} value={this.state.modalData.hairColor || ""} />
                        </div>
                    </div>
                    <div className="info">
                        {this.state.messages.map(function (mes) {
                            return (<div>{mes}</div>)
                        })}
                    </div>
                </GsReactModal>
                <GsReactGrid columns={this.columns}
                             gridData={this.state.rows}
                             keyField="personId"
                             className="gs-react-grid"
                             onRowSelect={this.onRowSelect}
                             selectedRow={this.state.selectedRow}>
                </GsReactGrid>
            </div>
    );
    }
});

ReactDOM.render(<App></App>, document.querySelector(".react-app"));