webpackHotUpdate("main",{

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar canvas = document.getElementById('drawing-canvas'); // Some flags for grid cells.\n\nvar EMPTY_CELL = 'E';\nvar FULL_CELL = 'F';\n\nvar Grid =\n/*#__PURE__*/\nfunction () {\n  function Grid(width, height, squareLength) {\n    _classCallCheck(this, Grid);\n\n    this.width = width;\n    this.height = height;\n    this.squareSide = squareLength;\n    this.cells = this.fillEmptyCells();\n    console.log(cells);\n  }\n\n  _createClass(Grid, [{\n    key: \"fillEmptyCells\",\n    value: function fillEmptyCells() {\n      var cells = [];\n\n      for (var i = 0; i < this.height; i++) {\n        var line = [];\n\n        for (var j = 0; j < this.width; j++) {\n          line.push(FULL_CELL);\n        }\n\n        cells.push(line);\n      }\n\n      return cells;\n    }\n  }, {\n    key: \"drawGrid\",\n    value: function drawGrid(context) {\n      for (var y = 0; y < this.height; y++) {\n        for (var x = 0; x < this.width; x++) {\n          var squareState = this.cells[y][x];\n          context.fillStyle = squareState == FULL_CELL ? '#000000' : '#ffffff';\n          context.fillRect(x * this.squareSide, y * this.squareSide, x + this.squareSide, y + this.squareSide);\n        }\n      }\n    }\n  }]);\n\n  return Grid;\n}();\n\nfunction init() {\n  var grid = new Grid(10, 10, 50);\n  console.log('Test!');\n  grid.drawGrid(canvas.getContext('2d'));\n}\n\ninit();\n\n//# sourceURL=webpack:///./src/client/index.js?");

/***/ })

})