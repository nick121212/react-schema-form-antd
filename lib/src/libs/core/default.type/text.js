"use strict";
const utils_1 = require("./utils");
const jpp = require("json-pointer");
function text(name, schema, options) {
    if ((schema.type) === 'string' && !schema['enum']) {
        const f = utils_1.stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'text';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.text = text;
//# sourceMappingURL=text.js.map