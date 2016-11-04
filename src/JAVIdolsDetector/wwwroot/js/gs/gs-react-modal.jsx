var React = require("react");
var ReactBootstrap = require("react-bootstrap");;
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var GsReactModal = React.createClass({
    getInitialState: function () {
        return null;
    },
    saveChanges: function () {
        this.setState({ isLoading: true });
        if (typeof (this.props.saveCall) == "function") {
            this.props.saveCall();
        }
        //this.closeModal();
    },
    componentDidMount: function () {
        if (typeof (this.props.loadCall) == "function") {
            this.props.loadCall();
        }
    },
    render: function () {
        return (
            <div className="gs-react-modal">
                <Modal show={this.props.showModal} onHide={this.props.closeModal} backdrop="static">
                     <Modal.Header closeButton={true}>
                         <Modal.Title>{this.props.title}</Modal.Title>
                     </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary"
                                disabled={this.props.isLoading}
                                onClick={!this.props.isLoading ? this.saveChanges : null}>
                            {this.props.isLoading ? "Saving..." : "Save changes"}
                        </Button>
                        <Button disabled={this.props.isLoading}
                                onClick={!this.props.isLoading ? this.props.closeModal : null}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});
module.exports = GsReactModal;