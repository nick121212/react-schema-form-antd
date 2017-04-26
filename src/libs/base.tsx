import * as React from 'react';
import * as jpp from 'json-pointer';
import { ICommonProps, ICommonChildProps, ISchemaForm } from './props/common';
import { utils } from '../utils';

export class SchemaFormBase<P extends ICommonChildProps, S> extends React.Component<P, S> {

    constructor(props, context) {
        super(props, context);
    }

    /**
     * 根据当前key值获取当前组件的数据
     */
    protected getFieldValue() {
        const { schemaForm } = this.props,
            key = this.getKey(),
            formData = schemaForm.getData(),
            obj = jpp(formData);

        if (obj.has(key)) {
            return obj.get(key);
        }
        return undefined;
    }

    /**
     * 根据当前传入的keys来得到keys的值
     * @param keys 
     */
    protected getFieldValueForKeys(keys: Array<string>) {
        const { schemaForm } = this.props,
            formData = schemaForm.getData(),
            obj = jpp(formData),
            key = jpp.compile(keys);

        if (obj.has(key)) {
            return obj.get(key);
        }
        return undefined;
    }

    /**
     * 数组元素换位置
     * @param arr 
     * @param index1 
     * @param index2 
     */
    swapItems(arr, indexOld, indexNew) {
        arr[indexOld] = arr.splice(indexNew, 1, arr[indexOld])[0];

        return arr;
    }

    swapObjectItems(obj, indexOld, indexNew) {
        let swap = obj[indexOld] || {};

        obj[indexOld] = obj[indexNew] || {};
        obj[indexNew] = swap;
    }

    /**
     * 是否可以向上移动
     * @param arr 
     * @param index 
     */
    canUp(arr, index) {
        return index > 0;
    }

    /**
     * 是否可以向下移动
     * @param arr 
     * @param index 
     */
    canDown(arr, index) {
        return arr.length > index + 1;
    }

    /**
     * 向上移动
     * @param arr 
     * @param index 
     */
    up(arr, index) {
        if (this.canUp(arr, index)) {
            this.swapItems(arr, index, index - 1);
        }
    }

    /**
     * 向下移动
     * @param arr 
     * @param index 
     */
    down(arr, index) {
        if (this.canDown(arr, index)) {
            this.swapItems(arr, index, index + 1);
        }
    }

    /**
     * 获取当前组件的key值
     */
    protected getKey(): string {
        const { uiSchema, arrayIndex } = this.props;

        return utils.compileKeys({ uiSchema, arrayIndex });
    }

    /**
     * 触发事件
     * @param name 事件名称
     * @param args 参数
     */
    triggerEvent(name, ...args) {
        const { formEvent } = this.props;

        formEvent.emit(name, ...args);
    }

    /**
     * 外部设置字段的值
     * @param val 数据项
     */
    setData(val: any) {
        const { uiSchema, arrayIndex } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        this.triggerEvent(["change"].concat(keys), keys, val, uiSchema);

        return true;
    }

}

new SchemaFormBase(null, null);