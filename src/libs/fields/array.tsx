import * as React from 'react';
import * as jpp from 'json-pointer';
import { Button, Card, Row, Col } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { IUiSchema } from '../props/uischema';
import { BaseField } from './base';
import { EventEmitter2 } from 'eventemitter2';
import { IValidateResult } from '../props/validateresult';

export interface IProps extends ICommonChildProps {

}

/**
 * 数组类型的字段用这个组件
 * 
 */
export class ArrayField extends BaseField<IProps, any>{
    /**
     * 当数组中的子元素更改的时候，触发当前数组值得更改委托
     */
    private changeCurrentArray: (childKeys: Array<string>, data: any) => void;
    private onChanged: (childKeys: Array<string>, data: any) => void;
    /**
     * 构造
     * @param props 
     * @param context 
     */
    constructor(props, context) {
        super(props, context);
    }

    /**
     * 
     * @param opt 操作类型
     * @param idx 数组索引
     * @param keys 数据路径
     * @param items 当前数据
     */
    handleChange(opt: string, idx: number, keys: Array<string>, items) {
        const { formEvent, uiSchema, arrayIndex, validateResult } = this.props;

        switch (opt) {
            case "add":
                break;
            case "delete":
                if (jpp(validateResult).has(jpp.compile(keys))) {
                    jpp(validateResult).has(jpp.compile(keys.concat([idx.toString()]))) && jpp(validateResult).remove(jpp.compile(keys.concat([idx.toString()])));
                    for (let i = idx; i <= items.length; i++) {
                        this.swapObjectItems(jpp(validateResult).get(jpp.compile(keys)), i + 1, i);
                    }
                }
                break;
            case "down":
                this.swapObjectItems(jpp(validateResult).get(jpp.compile(keys)), idx, ++idx);
                break;
            case "up":
                this.swapObjectItems(jpp(validateResult).get(jpp.compile(keys)), idx, --idx);
                break;
        }

        formEvent.emit(["change"].concat(keys), keys, items, uiSchema);
        // this.forceUpdate();
    }

    /**
     * 添加方法
     * @param e 按钮的事件
     */
    handleAdd(e) {
        const { formEvent, uiSchema, arrayIndex, schemaFormOptions } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        let items = this.getFieldValue() || [];
        let { type = "", $ref = "" } = jpp(uiSchema).has("/schema/items") ? jpp(uiSchema).get("/schema/items") : {};

        if (!type && $ref) {
            type = (schemaFormOptions.global.schemas[$ref] || {}).type;
        }

        items = items.concat([type === "object" ? {} : null]);
        this.handleChange("add", 0, keys, items);

        e.preventDefault();
    }

    /**
     * 删除方法
     * @param idx 当前组件的索引
     * @param e   按钮的事件
     */
    handleDelete(idx, e) {
        const { formEvent, uiSchema, arrayIndex } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        let items = this.getFieldValue() || [];

        items.splice(idx, 1);
        this.handleChange("delete", idx, keys, items);

        e.preventDefault();
    }

    /**
     * 向上移动数据
     * @param idx 下标
     */
    handleUp(idx) {
        const { uiSchema, arrayIndex, formEvent, ...extra } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();

        this.up(data, idx);
        this.handleChange("up", idx, keys, data);
        this.forceUpdate();
    }
    /**
     * 向上移动数据
     * @param idx 下标
     */
    handleDown(idx) {
        const { uiSchema, arrayIndex, formEvent, ...extra } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();

        this.down(data, idx);
        this.handleChange("down", idx, keys, data);
        this.forceUpdate();
    }

    /**
     * 根据当前的值，绘画子组件数据
     */
    renderItems() {
        const { schema, uiSchema, validateResult, arrayIndex, formEvent, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {};
        let { add = true, remove = true, move = true } = options.array || {};
        let items = this.getFieldValue() || [], children = [];

        items.forEach((item, idx) => {
            let idxs = arrayIndex ? arrayIndex.concat([idx]) : [idx];
            let arrayItems = (
                <Button.Group>
                    {remove && <Button size="small" onClick={this.handleDelete.bind(this, idx)} icon="minus"></Button>}
                    {move && <Button size="small" disabled={!this.canUp(items, idx)} onClick={this.handleUp.bind(this, idx)} icon="arrow-up"></Button>}
                    {move && <Button size="small" disabled={!this.canDown(items, idx)} onClick={this.handleDown.bind(this, idx)} icon="arrow-down"></Button>}
                </Button.Group>
            );
            children.push(
                utils.getTemplateRender({ validateResult, formEvent, schema, uiSchemaCombine: (uiSchema as IUiSchema).items, arrayIndex: idxs, arrayItems, ...extra })
            );
        });

        return children;
    }
    // /**
    //  * 属性更改事件
    //  * @param prevProps 
    //  * @param prevState 
    //  */
    // componentDidUpdate(prevProps, prevState) {
    //     const { formEvent } = this.props;

    //     formEvent.emit("refreshArray");
    // }

    /**
     * 初始化方法
     * 监听子组件的change事件，触发父组件的change事件用于验证
     * 监听子组件的validator事件，记录子组件的验证数据
     */
    init() {
        const { uiSchema, formEvent, arrayIndex, schemaFormOptions, schemaForm } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        const { onChange } = uiSchema as IUiSchema;
        let timeid;

        this.changeCurrentArray = (childKeys: Array<string>, data) => {
            if (timeid) {
                clearTimeout(timeid);
            }
            timeid = setTimeout(() => {
                let parentKeys = childKeys.concat([]);
                let currentValue = this.getFieldValue();

                // if (!Number.isInteger(parentKeys.pop() as any) && parentKeys.join() === keys.join()) {
                //     formEvent.emit(["change"].concat(parentKeys), parentKeys, currentValue, uiSchema);
                // } else {
                //     formEvent.emit(["change"].concat(keys), keys, currentValue, uiSchema);
                // }
                // onChange && onChange(keys, currentValue, schemaForm);
                onChange && onChange(keys, currentValue, schemaForm);
            }, 1000);
        }

        this.onChanged = (childKeys: Array<string>, data) => {
            this.forceUpdate();
            onChange && onChange(keys, data, schemaForm);
        }

        formEvent.on(["change"].concat(keys), this.onChanged.bind(this));
        formEvent.on(["changed"].concat(keys).concat(["*"]), this.changeCurrentArray.bind(this));
        formEvent.on(["changed"].concat(keys).concat(["*", "*"]), this.changeCurrentArray.bind(this));

        super.init();
    }

    dispose() {
        const { formEvent, uiSchema, arrayIndex } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        formEvent.off(["change"].concat(keys).join("."), this.onChanged.bind(this));
        formEvent.off(["changed"].concat(keys).concat(["*"]).join("."), this.changeCurrentArray.bind(this));
        formEvent.off(["changed"].concat(keys).concat(["*", "*"]).join("."), this.changeCurrentArray.bind(this));

        super.dispose();
    }

    /**
     * 绘画组件
     */
    render() {
        const { schema, uiSchema, schemaFormOptions, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {};
        const { add = true } = options.array || {};

        return (
            <Card title={
                <Row type="flex" justify="space-between">
                    <Col>
                        {(uiSchema as tv4.JsonSchema).title}
                    </Col>
                    <Col>
                        {add && <Button onClick={this.handleAdd.bind(this)} shape="circle" icon="plus"></Button>}
                    </Col>
                </Row>}>
                {this.renderItems()}
            </Card>
        );
    }

}