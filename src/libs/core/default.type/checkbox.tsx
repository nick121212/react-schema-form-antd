import * as jpp from 'json-pointer';
import { stdFormObj } from './utils';

export function checkbox(name, schema, options) {
    if ((schema.type) === 'boolean') {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'checkbox';
        f["ui:options"] = { widget: { size: "default" } }
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}