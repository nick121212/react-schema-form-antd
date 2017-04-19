"use strict";
var jpp = require("json-pointer");
var utils_1 = require("./utils");
function array(name, schema, options, defaultFormDef) {
    if ((schema.type) === 'array') {
        var f = utils_1.stdFormObj(name, schema, options);
        f["ui:widget"] = 'array';
        f.key = options.path;
        options.lookup[jpp.compile(options.path)] = f;
        var required = schema.required &&
            schema.required.indexOf(options.path[options.path.length - 1]) !== -1, arrPath = options.path.slice();
        arrPath.push('');
        f.items = [defaultFormDef(name, schema.items, Object.assign({}, options, {
                path: arrPath,
                $ref: schema.$ref,
                required: required || false
            }))];
        return f;
    }
}
exports.array = array;
//# sourceMappingURL=array.js.map