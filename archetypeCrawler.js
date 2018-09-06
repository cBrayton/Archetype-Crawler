"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data;

//This data needs to be replaced with the archetypedata cache
//and the archetypeflavor cache filtered by the selected class
var iData = [{ id: 1, name: "Sample Archetype", reqs: "Feats", desc: "This is just a sample archetype." }, { id: 2, name: "Second Archetype", reqs: "Different Feats", desc: "Here's a different archetype" }];

//This data needs to be replaced with the classes from
//archetypedata cache
var options = ['Class 1', 'Class 2', 'Class3'];

function updateOptions(data) {
  var count = 0;
  for(hash in data["keys-0"]) {
    options[count] = hash["key-0"];
    count++;
  }
}

var ArchetypeTable = function (_React$Component) {
  _inherits(ArchetypeTable, _React$Component);

  function ArchetypeTable() {
    _classCallCheck(this, ArchetypeTable);

    return _possibleConstructorReturn(this, (ArchetypeTable.__proto__ || Object.getPrototypeOf(ArchetypeTable)).apply(this, arguments));
  }

  _createClass(ArchetypeTable, [{
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
            { dataField: "name", width: "25%" },
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

function onSelectRow(row, isSelected, e) {
  if (isSelected) {
    //Sort table by compatable archetypes and change color
    //of incompatible archetypes
    //Also make those rows unselectable

  }
}

function onSelectAll(isSelect, row, e) {
  this.tableBody.setState({ selectedRows: [] });
}

console.table(iData);

var selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  onSelect: onSelectRow,
  bgColor: 'gold',
  onSelectAll: onSelectAll
  //unselectable: [0]
};

var domContainerTable = document.querySelector('#archetype_table_js');
ReactDOM.render(React.createElement(ArchetypeTable, { data: iData }), domContainerTable);
var domContainerSelector = document.querySelector('#class_selector_js');
ReactDOM.render(React.createElement(ClassSelector, null), domContainerSelector);
console.log(domContainerSelector.innerHTML);

axios.get("archetypedataCache.json").then(function (result) {
  console.log(result);
  data = JSON.parse(result);
  updateOptions(data);
  console.log(data);
  console.log("In axios call");
  ReactDOM.render(React.createElement(ClassSelector, null), domContainerSelector);
});
