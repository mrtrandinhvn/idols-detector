var GsReactGrid = require("lib/gs/gs-react-grid.jsx");
console.log(GsReactGrid);
//var App = React.createClass({
//    getInitialState: function () {
//        return {
//            personGroupList: []
//        }
//    },
//    render: function () {
//        return (
//        <div>
//    <h3>Sortable grid</h3>
//    <SortableGrid getUrl="/Admin/LoadPersonGroups"></SortableGrid>
//        </div>);
//    }
//});

////Columns definition
//var columns = [
//    { key: "personGroupId", name: "Local Id", width: 80, sortable: true, resizable: true },
//    { key: "personGroupOnlineId", name: "Online Id", sortable: true, resizable: true },
//    { key: "trainingStatus", name: "Training Status", sortable: true, resizable: true }
//];

//var SortableGrid = React.createClass({
//    getInitialState: function () {
//        return {
//            rows: []
//        }
//    },
//    loadData: function (args) {
//        $.ajax({
//            url: this.props.getUrl,
//            data: args,
//            dataType: "json",
//            type: "POST",
//            cache: false,
//            success: function (data) {
//                if (data) {
//                    this.setState({
//                        rows: data
//                    });
//                }
//            }.bind(this),
//            error: function (xhr, status, err) {
//                console.error(this.props.url, status, err.toString());
//            }.bind(this)
//        });
//    },
//    componentDidMount: function () {
//        this.loadData();
//    },
//    rowGetter: function (rowIndex) {
//        return this.state.rows[rowIndex];
//    },
//    handleGridSort: function (sortColumn, sortDirection) {
//        this.loadData({});
//        this.setState({ rows: rows });
//    },
//    render: function () {
//        return (
//      <ReactDataGrid onGridSort={this.handleGridSort}
//                     columns={columns}
//                     rowGetter={this.rowGetter}
//                     rowsCount={this.state.rows.length}
//                     minHeight={500}
//                     onRowUpdated={this.handleRowUpdated      }></ReactDataGrid>
//    );
//    }

//});

//ReactDOM.render(<App></App>, document.querySelector(".react-app"));