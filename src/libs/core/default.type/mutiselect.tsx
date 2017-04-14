import * as jpp from 'json-pointer';
import { stdFormObj, enumToTitleMap } from './utils';

export function mutiSelect(name, schema, options) {
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