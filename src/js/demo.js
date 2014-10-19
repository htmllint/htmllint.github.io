var ace = require('ace'),
    htmllint = require('htmllint');

var editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.getSession().setMode('ace/mode/html');

var updateTimer = null;
editor.on('change', function () {
    window.clearTimeout(updateTimer);
    updateTimer = window.setTimeout(lint, 500);
});

function lint() {
    var html = editor.getValue(),
        issues = [];

    try {
        window.htmllint = htmllint;
        issues = htmllint(html);
    } catch (e) {}

    var annotations = [];

    issues.forEach(function (issue) {
        annotations.push({
            // 0 based index
            row: issue.line - 1,
            column: issue.column - 1,
            text: issue.msg,
            type: 'error'
        });
    });

    editor.getSession().setAnnotations(annotations);
};
