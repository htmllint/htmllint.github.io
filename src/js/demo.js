var fs = require('fs');
var htmllint = require('htmllint');
var DemoView = require('./demo_view.jsx');

// load the example.html file
var example = fs.readFileSync(__dirname + '/example.html', 'utf8');
// create the view
var view = new DemoView('editor', 'issue-list');

// hook into text change events
view.onChange(lint);

// populate the initial editor text, change event will fire
view.updateTxt(example);

/**
 * Lints the current text in the ace editor.
 * @param {String} html - the html to lint
 */
function lint(html) {
    var issues = [];

    // try to lint the html
    try {
        issues = htmllint(html);
    } catch (e) {
        console.error(e);
    }

    // update the view
    view.update(issues);
};
