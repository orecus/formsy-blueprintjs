#! /usr/bin/env node

var fs = require("fs");
var reactDocs = require("react-docgen");
var docsToMarkdown = require("react-docs-markdown");

var docList = [
  {
    name: "CheckboxGroup",
    file: "./src/formsyTextField.jsx",
    out: "./docs/formsyTextField.md"
  }
];

docList.map(item => {
  var src = fs.readFile(item.file, "utf8", (err, data) => {
    if (err) throw err;
    var api = reactDocs.parse(data);
    var md = docsToMarkdown(api, item.name);
    fs.writeFile(item.out, md, err => {
      if (err) throw err;
    });
  });
});