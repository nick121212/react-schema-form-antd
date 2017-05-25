"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jpp = require("json-pointer");
var utils_1 = require("./utils");
function fieldset(name, schema, options, defaultFormDef) {
    if ((schema.type) === 'object') {
        var f = utils_1.stdFormObj(name, schema, options);
        f["ui:widget"] = 'fieldset';
        f.key = options.path;
        f.items = [];
        if (options.lookup[jpp.compile(f.key)]) {
            return f;
        }
        options.lookup[jpp.compile(f.key)] = f;
        return f;
    }
}
exports.fieldset = fieldset;
//# sourceMappingURL=fieldset.js.map