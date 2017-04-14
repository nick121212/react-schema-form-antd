import * as jpp from 'json-pointer';
import { stdFormObj, enumToTitleMap } from './utils';

export function checkboxes(name, schema, options) {
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