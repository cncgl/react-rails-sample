var CommentBox = React.createClass({
    loadComponentFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(result) {
                console.debug(result);
                this.setState({data: result.data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.propts.url, status, err.toString());
            }.bind(this)
        });

    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadComponentFromServer();
        setInterval(this.loadComponentFromServer, this.props.pollInterval);
    },

    handleCommentSubmit: function(comment) {
        // TODO: submit to the server and refresh the list
    },

    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />  // ここでコールバックを渡す
            </div>
        );
    }
});

var CommentList = React.createClass({

    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var author = React.findDOMNode(this.refs.author).value.trime(),
        text = React.findDOMNode(this.refs.text).value.trim();
        if(!text || !author) {
            return;
        }
        // TODO: send request to the server
        this.props.onCommentSubmit
        React.findDOMNode(this.refs.author).value = '';
        React.findDOMNode(this.refs.text).value = '';
        return;
    },

    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your Name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var Comment = React.createClass({

    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});
