#! /usr/bin/env node

var fs = require("fs");
var reactDocs = require("react-docgen");
var docsToMarkdown = require("react-docs-markdown");

var docList = [
  {
    name: "formsyTextField",
    file: "./src/formsyTextField.jsx",
    out: "./docs/formsyTextField.md"
  },
  {
    name: "formsyCheckbox",
    file: "./src/formsyCheckbox.jsx",
    out: "./docs/formsyCheckbox.md"
  },
  {
    name: "formsyDateInput",
    file: "./src/formsyDateInput.jsx",
    out: "./docs/formsyDateInput.md"
  },
  {
    name: "formsyDateTimePicker",
    file: "./src/formsyDateTimePicker.jsx",
    out: "./docs/formsyDateTimePicker.md"
  },
  {
    name: "formsyRadioGroup",
    file: "./src/formsyRadioGroup.jsx",
    out: "./docs/formsyRadioGroup.md"
  },
  {
    name: "formsySelectField",
    file: "./src/formsySelectField.jsx",
    out: "./docs/formsySelectField.md"
  },
  {
    name: "formsySwitch",
    file: "./src/formsySwitch.jsx",
    out: "./docs/formsySwitch.md"
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