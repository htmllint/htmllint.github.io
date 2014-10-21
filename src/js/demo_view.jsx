var ace = require('ace'),
    React = require('react');
var IssueList = require('./issue_list.jsx');

module.exports = DemoView;

/**
 * Creates a new DemoView and binds the editor to the
 * element id.
 * @param {String} editorId
 * @param {String} issueListId
 */
function DemoView(editorId, issueListId) {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/textmate');
    this.editor.getSession().setMode('ace/mode/html');
    this.editor.session.setOption('useWorker', false);

    this.onChangeTimer = null;

    this.issueListId = issueListId;
};

DemoView.prototype.onChange = function (handler) {
    this.editor.on('change', () => {
	// only keep one queued timeout at a time
	clearTimeout(this.onChangeTimer);
	this.onChangeTimer = setTimeout(() => {
	    // call the handler with the current editor text
	    handler(this.editor.getValue());
	}, 500);
    });
};

DemoView.prototype.updateTxt = function (txt) {
    this.editor.getSession().setValue(txt);
};

DemoView.prototype.update = function (issues) {
    // update the annotations list
    React.renderComponent(
        <IssueList data={issues}></IssueList>,
        document.getElementById(this.issueListId)
    );
    // update the annotations in the ace gutter
    var annotations = issues.map((issue) => {
        return {
            row: issue.line - 1,
            column: issue.column - 1,
            text: issue.msg,
            type: 'error'
        };
    });
    this.editor.getSession().setAnnotations(annotations);
};
