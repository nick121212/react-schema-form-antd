import { stdFormObj } from './utils';
import * as jpp from 'json-pointer';

export function text(name, schema, options) {
    if ((schema.type) === 'string' && !schema['enum']) {
        const f = stdFormObj(name, schema, options);
        f.key = options.path;
        f["ui:widget"] = 'text';
        options.lookup[jpp.compile(options.path)] = f;
        return f;
    }
}