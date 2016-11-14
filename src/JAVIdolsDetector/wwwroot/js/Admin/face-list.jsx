var React = require("react");
var ReactDOM = require("react-dom");
var GsReactGrid = require("js/gs/gs-react-grid.jsx");
var GsSelect = require("js/gs/gs-react-dropdownlist.jsx");
var GsReactModal = require("js/gs/gs-react-modal.jsx");
var Dropzone = require("react-dropzone");
// ====================================== END including libs ========================================

var Dialog = require("bootstrap3-dialog");
var App = React.createClass({
    render: function () {
        return (
            <div>
                <h3>Faces</h3>
                <FaceGrid getUrl="/Admin/LoadFaces"
                          saveUrl="/Admin/SaveFace"
                          deleteUrl="/Admin/DeleteFace">
                </FaceGrid>
            </div>
        );
    }
});

//Columns definition

var FaceGrid = React.createClass({
    columns: [
        { key: "faceId", name: "Local Id", width: 80, sortable: true },
        { key: "faceOnlineId", name: "Online Id", sortable: true },
        { key: "personId", name: "PersonId", sortable: true },
        { key: "imageUrl", name: "Image URL", sortable: true }
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
            personDDL: [],
            modalFiles: [],
            showDropzone: true
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
                        selectedRow: {},
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
        this.setState({
            showModal: false, messages: [],
            modalFiles: []
        });
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
    validateModal: function () {
        var messages = [];
        if (!this.state.modalData) {
            this.setState({
                messages: [{ text: "Can not get the modal data", type: "error" }]
            });
            return false;
        }
        if (!this.state.modalData.personId) {
            messages.push({
                type: "error",
                text: "Please select a person, a face must be belong to a person."
            });
        }
        if (!this.state.modalData.imageUrl && this.state.modalFiles.length == 0) {
            messages.push({
                type: "error",
                text: "Please enter an URL or select a file."
            });
        } else if (this.state.modalData.imageUrl.length > 500) {
            messages.push({
                type: "error",
                text: "Image Url can not exceed 500 characters."
            });
        }
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
        if (!this.validateModal()) {
            return; // do nothing if there're errors
        }
        var formData = new FormData();
        formData.append("mode", this.state.modalMode.toLocaleLowerCase());
        formData.append("faceJson", JSON.stringify(this.state.modalData));
        if (this.state.modalFiles.length == 1) {
            formData.append("image", this.state.modalFiles[0]);
        }
        // call Save API
        $.ajax({
            url: this.props.saveUrl,
            data: formData,
            type: "POST",
            cache: false,
            processData: false,
            contentType: false,
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
                alert(this.props.saveUrl + ": " + err.toString());
            }.bind(this)
        });
    },
    modalLoadCall: function () {
        $.ajax({
            url: "/Admin/PersonDDL",
            type: "POST",
            cache: false,
            success: function (data) {
                if (data.messages && data.messages.length > 0) {
                    this.setState({
                        messages: data.messages
                    });
                    return;
                }
                this.setState({
                    personDDL: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                alert(this.props.saveUrl + ": " + err.toString());
            }.bind(this)
        });
    },
    onRowSelect: function (rowData) {
        if (this.state.selectedRow.faceId == rowData.faceId) {
            rowData = {}; // clear selected row
        }
        this.setState({ selectedRow: rowData });
    },
    // START form inputs events
    onPersonIdChange: function (e) {
        var modalData = this.state.modalData;
        modalData.personId = e.target.value;
        this.setState({ modalData: modalData });
    },
    onImageUrlChange: function (e) {
        var modalData = this.state.modalData;
        modalData.imageUrl = e.target.value;
        this.setState({
            modalData: modalData,
            showDropzone: e.target.value ? false : true,
            modalFiles: [] // clear selected files
        });
    },
    onImageChange: function (files) {
        var modalData = this.state.modalData;
        modalData.imageUrl = ""; // clear Image url because the new image will be uploaded
        this.setState({
            modalFiles: files,
            modalData: modalData
        });
    },
    // END form inputs events
    deleteRecord: function () {
        $.ajax({
            url: this.props.deleteUrl,
            data: {
                face: this.state.selectedRow
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
                this.loadData();
            }.bind(this),
            error: function (xhr, status, err) {
                alert(this.props.saveUrl + ": " + err.toString());
            }.bind(this)
        });
    },

    render: function () {
        var files = this.state.modalFiles; // use for Dropzone
        return (
            <div>
                <div className="header-actions">
                    <div className="btn-group pull-right">
                    <button type="button" className="btn btn-info" onClick={function () { this.openModal("Add"); }.bind(this)}>Add</button>
                    <button className="btn btn-warning" onClick={function () { this.openModal("Edit"); }.bind(this)} disabled={$.isEmptyObject(this.state.selectedRow)}>Edit</button>
                    <button className="btn btn-danger" onClick={this.deleteRecord} disabled={$.isEmptyObject(this.state.selectedRow)}>Delete</button>
                    </div>
                    <div style={{clear:"both",height:0}}></div>
                </div>
                <GsReactModal title={this.state.modalMode + " A Face"}
                              saveCall={this.modalSaveCall}
                              loadCall={this.modalLoadCall}
                              showModal={this.state.showModal}
                              closeModal={this.closeModal}>
                    <div className="form">
                        <div className="form-group">
                            <label className="">Person</label><GsSelect onChange={this.onPersonIdChange}
                                                                        disabled={this.state.modalMode.toLocaleLowerCase() =="edit" }
                                                                        options={this.state.personDDL}
                                                                        value={this.state.modalData.personId || "" }></GsSelect>
                        </div>
                        <div className="form-group">
                            <label className="">Enter Image URL</label><input type="text"
                                                                              className="form-control"
                                                                              onChange={this.onImageUrlChange}
                                                                              value={this.state.modalData.imageUrl || "" }
                                                                              disabled={this.state.modalFiles.length > 0 } />
                        </div>
                        {/*<div className="form-group">
                            <label className="">Or upload an image</label><input type="file" accept="image/*" className="form-control" />
                        </div>*/}
                        <div>
                            {
                            files.length > 0 ?
                            (
                                    <div>
                                        <div>{files.map((file) => (<img key={file.name} style={{ maxWidth: "150px" }} src={file.preview } />))}</div>
                                    </div>
                            )
                            : null
                            }
                            <Dropzone onDrop={this.onImageChange} multiple={false} style={
                                    !this.state.showDropzone ? { display: "none" } : {
                                        borderWidth: "2px",
                                        borderColor: "black",
                                        borderStyle: "dashed",
                                        borderRadius: "4px",
                                        padding: "30px",
                                        transition: "all 0.5s",
                                    }} activeStyle={{
                                        borderColor: "green"
                                    }}>
                            <div style={{
                                    textAlign: "center"
                                }}>Try dropping some files here, or click to select files to upload.</div>
                            </Dropzone>
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
                             keyField="faceId"
                             className="gs-react-grid"
                             onRowSelect={this.onRowSelect}
                             selectedRow={this.state.selectedRow}>
                </GsReactGrid>
                <div className="info">
                    {
                    this.state.messages.map(function (mes, i) {
                        return (<div key={i} className={mes.type }>- {mes.text}</div>)
                    })
                    }
                </div>
            </div>
    );
    }
});

ReactDOM.render(<App></App>, document.querySelector(".react-app"));