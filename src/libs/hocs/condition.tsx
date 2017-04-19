import * as React from 'react';
import * as cmp from 'comparejs';

import { SchemaFormBase } from '../base';
import * as jpp from 'json-pointer';
import { HocBase } from './base';
import { utils } from '../../utils';
import { ICommonChildProps } from '../props/common';
/**
 * 组件显示与否的包装HOC
 * @param Component 需要包装的组件
 * @param options   参数
 */
export const ConditionHoc = (Component: any): React.ComponentClass<any> => {
    return class Hoc extends HocBase<ICommonChildProps, any> {
        private initConditionWrapper;

        constructor(props, content) {
            super(props, content);

            this.initConditionWrapper = this.initCondition.bind(this);
        }

        getCurrentConditionKeys() {
            const { uiSchema, formData, formEvent } = this.props;
            const condition = uiSchema["ui:condition"] || {};

            return condition;
        }

        componentWillMount() {
            const { formEvent, uiSchema, arrayIndex } = this.props;
            const { key = "" } = this.getCurrentConditionKeys();

            if (key) {
                formEvent.on(["changed"].concat(jpp.parse(key)), this.initConditionWrapper);

                this.initCondition(utils.mergeKeys({ uiSchema, arrayIndex }), this.getFieldValue());
            }
        }

        componentWillUnmount() {
            const { formEvent } = this.props;
            const { key = "" } = this.getCurrentConditionKeys();

            key && formEvent.off(["changed"].concat(jpp.parse(key)).join(""), this.initConditionWrapper);
        }

        initCondition(keys, data) {
            console.log(this.getKey());
            const { key = "", value, opt = "" } = this.getCurrentConditionKeys();
            const { condition = true } = this.state || {};

            if (!opt || !key) {
                return;
            }

            if (!cmp[opt]) {
                return;
            }

            if (cmp[opt](data, value)) {
                return condition && this.setState({
                    condition: false
                });
            }

            this.setState({
                condition: true
            });
        }

        render() {
            const { condition = true } = this.state || {};

            if (!condition) {
                return <span style={{ display: "none" }}></span>;
            }

            return (
                <Component {...this.props}></Component>
            );
        }
    }
}