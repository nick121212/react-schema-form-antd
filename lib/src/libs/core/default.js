"use strict";
const jpp = require("json-pointer");
const enumToTitleMap = (enm) => {
    const titleMap = [];
    enm.forEach((name) => {
        titleMap.push({ name, value: name, label: name });
    });
    return titleMap;
};
function stdFormObj(name, schema, options) {
    options = options || {};
    const f = options.global && options.global.formDefaults ?
        Object.assign({}, options.global.formDefaults) : {};
    if (options.global && options.global.supressPropertyTitles === true) {
        f.title = schema.title;
    }
    else {
        f.title = schema.title || name;
    }
    if (schema.description) {
        f.description = schema.description;
    }
    if (options.required === true || schema.required === true) {
        f.required = true;
    }
    if (schema.maxLength) {
        f.maxlength = schema.maxLength;
    }
    if (schema.minLength) {
        f.minlength = schema.minLength;
    }
    if (schema.readOnly || schema.readonly) {
        f.readonly = true;
    }
    if (schema.minimum) {
        f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0);
    }
    if (schema.maximum) {
        f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0);
    }
    if (schema.validationMessage) {
        f.validationMessage = schema.validationMessage;
    }
    f.schema = schema;
    return f;
}
exports.stdFormObj = stdFormObj;
;
function number(name, schema, options) {
    if (schema.type === 'number') {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'number';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.number = number;
function integer(name, schema, options) {
    if ((schema.type) === 'integer') {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'number';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.integer = integer;
function checkbox(name, schema, options) {
    if ((schema.type) === 'boolean') {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'checkbox';
        f["ui:options"] = { widget: { size: "default" } };
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.checkbox = checkbox;
function mutiSelect(name, schema, options) {
    if ((schema.type) === 'array' && schema['enum']) {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'select';
        if (!f.titleMap) {
            f.titleMap = enumToTitleMap(schema['enum']);
        }
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.mutiSelect = mutiSelect;
function select(name, schema, options) {
    if ((schema.type) === 'string' && schema['enum']) {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'select';
        if (!f.titleMap) {
            f.titleMap = enumToTitleMap(schema['enum']);
        }
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.select = select;
function checkboxes(name, schema, options) {
    if ((schema.type) === 'array' && schema.items && schema.items['enum']) {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'checkboxes';
        if (!f.titleMap) {
            f.titleMap = enumToTitleMap(schema.items['enum']);
        }
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.checkboxes = checkboxes;
function fieldset(name, schema, options, defaultFormDef) {
    if ((schema.type) === 'object') {
        const f = stdFormObj(name, schema, options);
        f["ui:widget"] = 'fieldset';
        f.key = options.path;
        f.items = [];
        options.lookup[jpp.compile(options.path)] = f;
        if (schema.properties) {
            Object.keys(schema.properties).forEach((key) => {
                const value = schema.properties[key];
                const path = options.path.slice();
                path.push(key);
                if (options.ignore[jpp.compile(path)] !== true) {
                    const required = schema.required && schema.required.indexOf(key) !== -1;
                    const def = defaultFormDef(key, value, {
                        path,
                        required: required || false,
                        lookup: options.lookup,
                        ignore: options.ignore,
                        global: options.global
                    });
                    if (def) {
                        f.items.push(def);
                    }
                }
            });
        }
        return f;
    }
}
exports.fieldset = fieldset;
function array(name, schema, options, defaultFormDef) {
    if ((schema.type) === 'array') {
        const f = stdFormObj(name, schema, options);
        f["ui:widget"] = 'array';
        f.key = options.path;
        options.lookup[jpp.compile(options.path)] = f;
        const required = schema.required &&
            schema.required.indexOf(options.path[options.path.length - 1]) !== -1;
        const arrPath = options.path.slice();
        arrPath.push('');
        f.items = [
            defaultFormDef(name, schema.items, {
                path: arrPath,
                required: required || false,
                lookup: options.lookup,
                ignore: options.ignore,
                global: options.global
            })
        ];
        return f;
    }
}
exports.array = array;
function text(name, schema, options) {
    if ((schema.type) === 'string' && !schema['enum']) {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'text';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}
exports.text = text;
function createDefaults() {
    return {
        string: [select, text],
        object: [fieldset],
        number: [number],
        integer: [integer],
        boolean: [checkbox],
        array: [checkboxes, array, mutiSelect]
    };
}
exports.createDefaults = createDefaults;
;
function defaultFormDefinition(schemaTypes, name, schema, options) {
    const rules = schemaTypes[(schema.type)];
    if (rules) {
        let def;
        const innerDefaultFormDefinition = (childName, childSchema, childOptions) => defaultFormDefinition(schemaTypes, childName, childSchema, childOptions);
        for (let i = 0; i < rules.length; i++) {
            def = rules[i](name, schema, options, innerDefaultFormDefinition);
            if (def) {
                if (def.schema['x-schema-form']) {
                    Object.assign(def, def.schema['x-schema-form']);
                }
                return def;
            }
        }
    }
}
exports.defaultFormDefinition = defaultFormDefinition;
function defaultForm(schema, defaultSchemaTypes, ignore, globalOptions) {
    const form = [];
    const lookup = {};
    ignore = ignore || {};
    globalOptions = globalOptions || {};
    defaultSchemaTypes = defaultSchemaTypes || createDefaults();
    if (schema.properties) {
        Object.keys(schema.properties).forEach((key) => {
            if (ignore[key] !== true) {
                const required = schema.required && schema.required.indexOf(key) !== -1;
                const def = defaultFormDefinition(defaultSchemaTypes, key, schema.properties[key], {
                    path: [key],
                    lookup: lookup,
                    ignore: ignore,
                    required: required,
                    global: globalOptions
                });
                if (def) {
                    form.push(def);
                }
            }
        });
    }
    else {
        throw new Error('Not implemented. Only type "object" allowed at root level of schema.');
    }
    return { form: form, lookup: lookup };
}
exports.defaultForm = defaultForm;
//# sourceMappingURL=default.js.map