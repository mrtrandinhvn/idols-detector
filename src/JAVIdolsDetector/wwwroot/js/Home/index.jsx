var React = require("react");
var ReactDOM = require("react-dom");
var Dialog = require("bootstrap3-dialog");
var data = [
  { id: 1, author: "Pete Hunt", text: "This is one comment" },
  { id: 2, author: "Jordan Walke", text: "This is *another* comment" }
];
var App = React.createClass({
    render: function () {
        return (<CommentBox url="http://localhost:3000/api/comments" pollInterval="5000"></CommentBox>);
    }
});
var CommentBox = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false,
            success: function (comments) {
                this.setState({ data: comments });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    onCommentSubmit: function (data) {
        // TODO: submit to the server and refresh the list
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1 className="">Comments</h1>
                <CommentList data={this.state.data}></CommentList>
                <CommentForm onCommentSubmit={this.onCommentSubmit}></CommentForm>
            </div>
            );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment key={comment.id} author={comment.author}>{comment.text}</Comment>
                );
        })
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
var CommentForm = React.createClass({
    getInitialState: function () {
        return { author: "", comment: "" };
    },
    onNameChanged: function (event) {
        this.setState({
            author: event.target.value
        });
    },
    onCommentChanged: function (event) {
        this.setState({
            comment: event.target.value
        });
    },
    onSubmitComment: function (event) {
        event.preventDefault();
        var author = this.state.author.trim();
        var comment = this.state.comment.trim();
        if (!comment || !author) {
            return;
        }
        // TODO: send request to the server
        this.props.onCommentSubmit({ author: author, text: comment });
        this.setState({ author: "", comment: "" }); // clear form
    },
    render: function () {
        return (
                <form onSubmit={this.onSubmitComment} className="commentForm">
                    <div className="form-group ">
                        <label>Your name</label>
                        <input className="form-control" type="text" placeholder="Your name" onChange={this.onNameChanged} value={this.state.author } />
                    </div>
                    <div className="form-group">
                        <label>Your comment</label>
                        <input className="form-control" type="text" placeholder="Your comment" onChange={this.onCommentChanged} value={this.state.comment } />
                    </div>
                    <input className="btn btn-default" type="submit" value="Post" />
                </form>
            );
    }
});
var Comment = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
            );
    }
});

ReactDOM.render(<App></App>, document.querySelector(".react-app"));