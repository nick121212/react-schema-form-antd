import * as jpp from 'json-pointer';
import { stdFormObj } from './utils';

export function array(name, schema, options, defaultFormDef) {
    if ((schema.type) === 'array') {
        const f = stdFormObj(name, schema, options);

        f["ui:widget"] = 'array';
        f.key = options.path;
        options.lookup[jpp.compile(options.path)] = f;

        const required = schema.required &&
            schema.required.indexOf(options.path[options.path.length - 1]) !== -1,
            arrPath = options.path.slice();

        arrPath.push('');

        f.items = [defaultFormDef(name, schema.items, Object.assign({}, options, {
            path: arrPath,
            $ref: schema.$ref,
            required: required || false
        }))];


        return f;
    }
}
