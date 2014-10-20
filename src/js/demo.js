/** @jsx React.DOM */
var ace = require('ace'),
    htmllint = require('htmllint'),
    React = require('react');

var editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.getSession().setMode('ace/mode/html');

var updateTimer = null;
editor.on('change', () => {
    window.clearTimeout(updateTimer);
    updateTimer = window.setTimeout(lint, 500);
});

var IssueList = React.createClass({
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

var Issue = React.createClass({
    render: function () {
        var issue = this.props.issue;

        return (
	    <div>
            <span>({issue.line}, {issue.column}): </span>
            <span>{issue.msg}</span>
            </div>
	);
    }
});

var render = (issues) => {
    React.renderComponent(
	<IssueList data={issues}></IssueList>,
	document.getElementById('issue-list')
    );
};

render([]);
function lint() {
    var html = editor.getValue(),
        issues = [];

    try {
        window.htmllint = htmllint;
        issues = htmllint(html);
    } catch (e) {
        console.error(e);
    }

    var annotations = [];

    issues.forEach((issue) => {
        annotations.push({
            // 0 based index
            row: issue.line - 1,
            column: issue.column - 1,
            text: issue.msg,
            type: 'error'
        });
    });

    render(issues);
    editor.getSession().setAnnotations(annotations);
};
