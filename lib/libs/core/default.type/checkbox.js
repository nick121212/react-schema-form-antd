"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jpp = require("json-pointer");
var utils_1 = require("./utils");
function checkbox(name, schema, options) {
    if ((schema.type) === 'boolean') {
        var f = utils_1.stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'checkbox';
        f["ui:options"] = { widget: { size: "default" } };
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.checkbox = checkbox;
//# sourceMappingURL=checkbox.js.map