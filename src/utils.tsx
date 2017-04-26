import * as React from 'react';
import * as tv4 from 'tv4';

import { BaseFactory } from './libs/base.factory';
import { IUiSchema } from './libs/props/uischema';
import * as jpp from 'json-pointer';

import { validate } from './libs/validate';
import { ConditionHoc } from './libs/hocs/condition';
import { TempHoc } from './libs/hocs/temp';
import { TriggerHoc } from './libs/hocs/trigger';

export class Utils {
    /**
     * 获取字段的类型返回component
     * @param uiSchema 合并后的数据
     */
    getField(uiSchema: IUiSchema): any {
        let FieldTemp = fieldFactory.get(uiSchema["ui:field"] || uiSchema.type || (uiSchema.schema ? uiSchema.schema.type : ""));
        let hoc = uiSchema["ui:hoc"] || {};

        if (!FieldTemp) {
            console.log(uiSchema, "找不到Field");
        }

        // if (!hoc) {
        //     hoc = {
        //         hoc: (Component, fn) => {
        //             return Component;
        //         },
        //         params: {}
        //     };
        // }
        if (FieldTemp) {
            FieldTemp = TriggerHoc(FieldTemp);
            FieldTemp = TempHoc(FieldTemp);
            FieldTemp = ConditionHoc(FieldTemp);
            if (hoc.hoc) {
                FieldTemp = hoc.hoc(FieldTemp, hoc.params || {});
            }
        }

        return FieldTemp;
    }

    /**
     * 获取模板的components
     * @param uiSchema 合并后的数据
     */
    getTemplate(uiSchema: IUiSchema, globalOptions: any = {}): Array<any> {
        let TempComponent = [];
        let template = uiSchema["ui:temp"] || globalOptions["ui:temp"] || "default";

        // 获取模板的数据，单个模板
        if (typeof template === "string") {
            TempComponent.push(tempFactory.get(template));
        } else {
            // 多个模板
            template.reverse().forEach((tml) => {
                let tmp = tempFactory.get(tml || "default");

                if (!tmp) {
                    console.error(`不存在${tmp}的temp！`);
                } else {
                    TempComponent.push(tempFactory.get(tml || "default"));
                }
            });
        }

        return TempComponent;
    }

    /**
     * 获取组件
     * @param uiSchema 合并后的数据
     */
    getWidget(uiSchema: IUiSchema) {
        return widgetFactory.get(uiSchema["ui:widget"] || "default") || widgetFactory.get("default");
    }

    /**
     * 获取子组件
     * @param schema               JSONSCHEMA
     * @param uiSchemaCombine      合并后的数据
     * @param extra                额外的props
     */
    getTemplateRender({ schema, uiSchemaCombine, wrapper = [], ...extra }) {
        let children = [];

        uiSchemaCombine && uiSchemaCombine.forEach((uiSchema: IUiSchema, idx: number) => {
            let TempComponents: Array<any> = utils.getTemplate(uiSchema), TempComponent;
            let FieldComponent: any = utils.getField(uiSchema);

            // 循环获取子组件
            if (!FieldComponent) {
                FieldComponent = this.getTemplateRender({ schema, uiSchemaCombine: uiSchema.items, ...extra });
            } else {
                FieldComponent = (<FieldComponent key={Date.now() + idx + Math.random()} schema={schema} uiSchema={uiSchema} {...extra} />)
            }

            FieldComponent && children.push(FieldComponent);
        });

        return children;
    }

    /**
     * 合并key生成key
     * @param uiSchema
     * @param arrayIndex
     */
    mergeKeys({ uiSchema, arrayIndex }): Array<string> {
        let keys = (uiSchema as IUiSchema).key as Array<string> || [];
        let arrayIndexes = arrayIndex ? arrayIndex.concat([]) : [];

        keys = keys.concat([]);
        keys = keys.map((key) => {
            if (key) {
                return key;
            }

            return arrayIndexes.shift().toString();
        });

        return keys;
    }

    compileKeys({ uiSchema, arrayIndex }) {
        let keys = this.mergeKeys({ uiSchema, arrayIndex });

        return jpp.compile(keys);
    }

    /**
     * 保存数据
     * @param data
     * @param key
     * @param formData
     */
    saveData({ data, formData, keys }) {
        let obj = jpp(formData);

        if (data !== null) {
            obj.set(jpp.compile(keys), data == null ? undefined : data);
        }
    }
    /**
    * 保存数据
    * @param data
    * @param key
    */
    validateSingle({ data, uiSchema, keys, validateResult }) {
        let key = jpp.compile(keys);
        let uiSchemaClone = Object.assign({}, uiSchema, { key: jpp.parse(key) });
        let validSingle = validate(uiSchemaClone, data);
        let oldValidSingle = jpp(validateResult).has(key) ? jpp(validateResult).get(key) : {}
        let rtn = Object.assign({}, oldValidSingle, {
            invalid: !validSingle.valid,
            pristine: false,
            dirty: true
        }, validSingle);

        if (jpp(validateResult).has(key)) {
            jpp(validateResult).set(key, Object.assign({}, jpp(validateResult).get(key), rtn));
        } else {
            jpp(validateResult).set(key, rtn);
        }

        return rtn;
    }

}

export const utils = new Utils();
export const fieldFactory = new BaseFactory<new () => React.Component<any, any>>();
export const widgetFactory = new BaseFactory<new () => React.Component<any, any>>();
export const tempFactory = new BaseFactory<new () => React.Component<any, any>>();
