"use strict";
var jpp = require("json-pointer");
var utils_1 = require("./utils");
function number(name, schema, options) {
    if (schema.type === 'number') {
        var f = utils_1.stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'number';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.number = number;
function integer(name, schema, options) {
    if ((schema.type) === 'integer') {
        var f = utils_1.stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'number';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.integer = integer;
//# sourceMappingURL=number.js.map