"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var jpp = require("json-pointer");
function text(name, schema, options) {
    if ((schema.type) === 'string' && !schema['enum']) {
        var f = utils_1.stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'text';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.text = text;
//# sourceMappingURL=text.js.map