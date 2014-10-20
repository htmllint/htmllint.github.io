/** @jsx React.DOM */
var fs = require('fs');
var ace = require('ace'),
    htmllint = require('htmllint'),
    React = require('react');
var IssueList = require('./issue_list');

var example = fs.readFileSync(__dirname + '/example.html', 'utf8');

var editor = ace.edit('editor');
editor.setTheme('ace/theme/textmate');
editor.getSession().setMode('ace/mode/html');
editor.session.setOption('useWorker', false);

var updateTimer = null;
editor.on('change', () => {
    window.clearTimeout(updateTimer);
    updateTimer = window.setTimeout(lint, 500);
});
editor.getSession().setValue(example);

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

var render = (issues) => {
    React.renderComponent(
	<IssueList data={issues}></IssueList>,
	document.getElementById('issue-list')
    );
};
