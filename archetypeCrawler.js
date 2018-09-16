"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data;
var flavor;
var pairs;
var archearr;
var flavorarr;
var pairarr;
var archetypeset = new Set();
var pairset = new Set();
var unselectable = [];
var selected = new Set();
var hide = false;
var selectedClass;
      

//This sample data is replaced with the archetypedata cache json file and the archetypeflavor cache json file
//The archetypedata json file is created from nested hashtables of Classes>Archetypes>Requirements
var iData = [{ id: 1, name: "Sample Archetype", reqs: "Feats", desc: "This is just a sample archetype." }, { id: 2, name: "Second Archetype", reqs: "Different Feats", desc: "Here's a different archetype" }];

//This data needs to be replaced with the classes from archetypedata cache json file
var options = ['Class 1', 'Class 2', 'Class3'];

//This function loads the data pulled from the archetypedata json file, using an axios query, into the options array
function updateOptions(data) {
  for(var i=0; i < data["keys-0"].length; i++) {
    options[i] = data["keys-0"][i]["key-0"];
  }
  options.sort();
}

//Creates the table using React-Bootstrap-Table; transpiled using babel
var ArchetypeTable = function (_React$Component) {
  _inherits(ArchetypeTable, _React$Component);

  function ArchetypeTable() {
    _classCallCheck(this, ArchetypeTable);

    return _possibleConstructorReturn(this, (ArchetypeTable.__proto__ || Object.getPrototypeOf(ArchetypeTable)).apply(this, arguments));
  }

  _createClass(ArchetypeTable, [{
    key: "linkFormatter",
    value: function linkFormatter(cell, row) {
      return '<a target="_blank" href="https://www.aonprd.com/ArchetypeDisplay.aspx?FixedName=' + selectedClass + " " + cell + '">' + cell + '</a>';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          BootstrapTable,
          { data: this.props.data,
            selectRow: selectRowProp },
          React.createElement(
            TableHeaderColumn,
            { isKey: true, hidden: true, dataField: "id" },
            "ID"
          ),
          React.createElement(
            TableHeaderColumn,
            { dataField: "name", dataFormat: this.linkFormatter, width: "25%" },
            "Archetype"
          ),
          React.createElement(
            TableHeaderColumn,
            { dataField: "reqs", width: "25%" },
            "Features Changed"
          ),
          React.createElement(
            TableHeaderColumn,
            { dataField: "desc", width: "50%" },
            "Description"
          )
        )
      );
    }
  }]);

  return ArchetypeTable;
}(React.Component);

//Creates the drop down menu using React-Select; transpiled using babel
var ClassSelector = function (_React$Component2) {
  _inherits(ClassSelector, _React$Component2);

  function ClassSelector(props) {
    _classCallCheck(this, ClassSelector);

    var _this2 = _possibleConstructorReturn(this, (ClassSelector.__proto__ || Object.getPrototypeOf(ClassSelector)).call(this, props));

    _this2.state = { value: 'Select a class' };
    return _this2;
  }

  _createClass(ClassSelector, [{
    key: "onChange",
    value: function onChange(e) {
      this.setState({
        value: e.target.value
      });
      //The code that updates the iData array when a new class is selected from the selector
      console.log(e.target.value);
      selectedClass = e.target.value;
      //Loops through all of the classes to find the one that was selected, and stores its data
      for(var i = 0; i < data["keys-0"].length; i++) {
        if(e.target.value === data["keys-0"][i]["key-0"]) {
          archearr = data["keys-0"][i]["hash-1"]["keys-1"];
          archearr.sort(function(a,b) {
            if (a["key-1"] < b["key-1"]) {
              return -1;
            }
            if (a["key-1"] > b["key-1"]) {
              return 1;
            }
            return 0;
          });
        }
      }
      //Repeat for the flavor data set
      for(var i = 0; i < flavor["keys-0"].length; i++) {
        if(e.target.value === flavor["keys-0"][i]["key-0"]) {
          flavorarr = flavor["keys-0"][i]["hash-1"]["keys-1"];
          flavorarr.sort(function(a,b) {
            if (a["key-1"] < b["key-1"]) {
              return -1;
            }
            if (a["key-1"] > b["key-1"]) {
              return 1;
            }
            return 0;
          });
        }
      }
      //Also repeat for the precomputed pairs data set
      for(var i = 0; i < pairs["keys-0"].length; i++) {
        if(e.target.value === pairs["keys-0"][i]["key-0"]) {
          pairarr = pairs["keys-0"][i]["hash-1"]["keys-1"];
        }
      }
      //archearr and flavorarr should be equal length
      console.log(archearr.length === flavorarr.length);
      iData = [];
      for(var j = 0; j < archearr.length; j++) {
            iData[j] = {id: j, name: archearr[j]["key-1"], reqs: archearr[j]["set-2"].sort().join(", "), desc: flavorarr[j]["text"]};
      }
      archetypeset = new Set();
      selected = new Set();
      updatePairSet();
      updateRowClassName();
      selectRowProp.selected = Array.from(selected);
      ReactDOM.render(React.createElement(ArchetypeTable, { data: iData }), domContainerTable);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "select",
          { value: this.state.value, onChange: this.onChange.bind(this), className: "form-control" },
          React.createElement(
            "option",
            { value: "" },
            "Select a Class"
          ),
          options.map(function (option) {
            return React.createElement(
              "option",
              { value: option, key: option },
              option
            );
          })
        )
      );
    }
  }]);

  return ClassSelector;
}(React.Component);

//Toggles whether incompatible archetypes are hidden or re-colored
document.getElementById("hideToggle").onclick = function(){console.log("Hide is: "+hide);toggleHide();}

function toggleHide() {
  if(hide) {hide = false;}
  else {hide = true;}
  updateRowClassName();
}

//Returns the intersection of two sets
function setIntersect( set1, set2) {
  var finalset = new Set();
  set1.forEach(function(value) {
    if(set2.has(value)) {
      finalset.add(value);
    }
  });
  return finalset;
}

//Changes the class attribute of each row to update the CSS settings based on whether a row can be selected or not
function updateRowClassName() {
  var rows = document.querySelectorAll("tbody tr"); 
  for(var i = 0; i < rows.length; i++) {
    if(unselectable.includes(i)) {
      rows[i].classList.add('unselectable-archetypes');
      rows[i].classList.remove('selectable-archetypes');
      if(hide === true) {
        rows[i].classList.add('hide');
      }
      else {
        rows[i].classList.remove('hide');
      }
    }
    else {
      rows[i].classList.add('selectable-archetypes');
      rows[i].classList.remove('unselectable-archetypes');
      rows[i].classList.remove('hide');
    }
  }
}

//Uses precomputed pairs of compatible archetypes to find the intersection
//(and remaining compatbible archetypes) of all selected archetypes
function updatePairSet() {
  pairset = new Set();
  for(var i = 0; i < pairarr.length; i++) {
    if(archetypeset.has(pairarr[i]["key-1"])) {
      if (pairset.size === 0) {
        pairset = new Set(pairarr[i]["set-2"]);
      }
      else {
        pairset = setIntersect(pairset, new Set(pairarr[i]["set-2"]));
      }
    }
  }
  //Sets the unselectable archetypes, which is any not in pairset and not already selected
  unselectable = [];
  if(archetypeset.size > 0) {
    for(var i = 0; i < iData.length; i++) {
      if(!archetypeset.has(iData[i]["name"]) && !pairset.has(iData[i]["name"])) {
        unselectable.push(iData[i]["id"]);
      }
    }
  }
  console.log(pairset);
  console.log(unselectable);
  selectRowProp.unselectable = unselectable;
}

//Updates record of what has been selected or deselected
//then runs updatePairSet and updateRowClassName to update the table
function onSelectRow(row, isSelected, e) {
  if (isSelected) {
    //Sort table by compatable archetypes and change color
    //of incompatible archetypes
    //Also make those rows unselectable
    archetypeset.add(row["name"]);
    selected.add(row["id"]);
  }
  else {
    archetypeset.delete(row["name"]);
    selected.delete(row["id"]);
  }
  console.log(archetypeset);
  updatePairSet();
  updateRowClassName();
  selectRowProp.selected = Array.from(selected);
  console.log(selected);
  console.log(selectRowProp);
  ReactDOM.render(React.createElement(ArchetypeTable, { data: iData }), domContainerTable);
}

//Only allows everything to be deselected
//(Select all would lead to incompatible archetypes being selected together)
function onSelectAll(isSelected, rows) {
  if(isSelected) {return false;}
  archetypeset = new Set();
  selected = new Set();
  updatePairSet();
  updateRowClassName();
  selectRowProp.selected = Array.from(selected);
  return true;
}

console.table(iData);

//Settings for row selector in React-Bootstrap-Table element
//This is where the selected row background color can be changed
var selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  selected: Array.from(selected),
  onSelect: onSelectRow,
  bgColor: 'gold', //Change this if you don't like gold colors for selected archetypes
  onSelectAll: onSelectAll,
  unselectable: unselectable
};

//Render table and selector
var domContainerTable = document.querySelector('#archetype_table_js');
ReactDOM.render(React.createElement(ArchetypeTable, { data: iData }), domContainerTable);
var domContainerSelector = document.querySelector('#class_selector_js');
ReactDOM.render(React.createElement(ClassSelector, null), domContainerSelector);

//Perform axios calls to pull data from 3 json files
axios.get("archetypedataCache.json").then(function (result) {
  console.log(result);
  data = result.data;
  updateOptions(data);
  console.log(data);
  ReactDOM.render(React.createElement(ClassSelector, null), domContainerSelector);
});

axios.get("archetypeFlavor.json").then(function (result) {
  console.log(result);
  flavor = result.data;
});

axios.get("archetypepairCache.json").then(function (result) {
  console.log(result);
  pairs = result.data;
});
