import * as jpp from 'json-pointer';
import { stdFormObj } from './utils';

export function number(name, schema, options) {
    if (schema.type === 'number') {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'number';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}

export function integer(name, schema, options) {
    if ((schema.type) === 'integer') {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'number';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}