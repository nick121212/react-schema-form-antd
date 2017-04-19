"use strict";
var jpp = require("json-pointer");
var utils_1 = require("./utils");
function mutiSelect(name, schema, options) {
    if ((schema.type) === 'array' && schema['enum']) {
        var f = utils_1.stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'select';
        if (!f.titleMap) {
            f.titleMap = utils_1.enumToTitleMap(schema['enum']);
        }
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.mutiSelect = mutiSelect;
//# sourceMappingURL=mutiselect.js.map