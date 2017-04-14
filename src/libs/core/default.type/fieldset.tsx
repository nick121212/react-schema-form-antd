import * as jpp from 'json-pointer';
import { stdFormObj } from './utils';

export function fieldset(name, schema, options, defaultFormDef) {
    if ((schema.type) === 'object') {
        const f = stdFormObj(name, schema, options);

        f["ui:widget"] = 'fieldset';
        f.key = options.path;
        f.items = [];

        if(options.lookup[jpp.compile(f.key)]){
            return f;
        }

        options.lookup[jpp.compile(f.key)] = f;

        // recurse down into properties
        // if (schema.properties) {
        //     Object.keys(schema.properties).forEach((key) => {
        //         const value = schema.properties[key];
        //         const path = options.path.slice();

        //         path.push(key);

        //         if (options.ignore[jpp.compile(path)] !== true) {
        //             const required = schema.required && schema.required.indexOf(key) !== -1;
        //             const def = defaultFormDef(key, value, Object.assign({}, options, {
        //                 path: path,
        //                 required: required || false,
        //                 definition: true
        //             }))

        //             if (def) {
        //                 f.items.push(def);
        //             }
        //         }
        //     });
        // }
        
        return f;
    }
}