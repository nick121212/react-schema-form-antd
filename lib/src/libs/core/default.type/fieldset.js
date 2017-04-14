"use strict";
const jpp = require("json-pointer");
const utils_1 = require("./utils");
function fieldset(name, schema, options, defaultFormDef) {
    if ((schema.type) === 'object') {
        const f = utils_1.stdFormObj(name, schema, options);
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