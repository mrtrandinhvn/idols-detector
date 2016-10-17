var App = React.createClass({
    getInitialState: function () {
        return {
            personGroupList: []
        }
    },
    loadPersonGroupGrid: function () {
        $.ajax({
            url: "/Admin/LoadPersonGroups",
            data: null,
            dataType: "json",
            type: "POST",
            cache: false,
            success: function (data) {
                if (data) {
                    this.setState({
                        personGroupList: data
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadData: function () {
        this.loadPersonGroupGrid();
    },
    componentDidMount: function () {
        this.loadData();
    },
    render: function () {
        return (
        <div>
    <PersonGroupGrid list={this.state.personGroupList}></PersonGroupGrid>
        </div>);
    }
});
var PersonGroupGrid = React.createClass({
    render: function () {
        var rows = this.props.list.map(function (item) {
            return (<PersonGroupRow rowData={item} key={item.personGroupId }></PersonGroupRow>)
        });
        return (<table>
            <tbody>
                {rows}
            </tbody>
        </table>);
    }
});
var PersonGroupRow = React.createClass({
    render: function () {
        var rowData = this.props.rowData;
        return (
        <tr>
            <td>Group Id: {rowData.personGroupId}</td>
            <td>Training Status: {rowData.trainingStatus}</td>
        </tr>);
    }
});
ReactDOM.render(<App></App>, document.querySelector(".react-app"));