"use strict";
const jpp = require("json-pointer");
const utils_1 = require("./utils");
function number(name, schema, options) {
    if (schema.type === 'number') {
        const f = utils_1.stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'number';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.number = number;
function integer(name, schema, options) {
    if ((schema.type) === 'integer') {
        const f = utils_1.stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'number';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.integer = integer;
//# sourceMappingURL=number.js.map