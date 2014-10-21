var React = require('react');

var Issue = React.createClass({
    render: function () {
        var issue = this.props.issue;

        return (
	    <div>
            <span>line: {issue.line} col: {issue.column}, </span>
            <span>{issue.msg}</span>
            </div>
	);
    }
});

module.exports = React.createClass({
    render: function () {
        var issueNodes = this.props.data.map((issue) => {
            return <Issue issue={issue}></Issue>;
        });

        return (
	    <div>
	    {issueNodes}
	    </div>
	);
    }
});
