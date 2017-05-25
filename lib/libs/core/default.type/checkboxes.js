"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jpp = require("json-pointer");
var utils_1 = require("./utils");
function checkboxes(name, schema, options) {
    if ((schema.type) === 'array' && schema.items && schema.items['enum']) {
        var f = utils_1.stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'checkboxes';
        if (!f.titleMap) {
            f.titleMap = utils_1.enumToTitleMap(schema.items['enum']);
        }
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.checkboxes = checkboxes;
//# sourceMappingURL=checkboxes.js.map