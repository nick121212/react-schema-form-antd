import * as React from 'react';

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
export const ConditionHoc = (Component: any, options = {}) => {
    return class Hoc extends HocBase<ICommonChildProps, any> {

        constructor(props, content) {
            super(props, content);
        }

        getCurrentConditionKeys() {
            const { uiSchema, formData, formEvent } = this.props;
            const condition = uiSchema["ui:condition"] || {};


            return condition;
        }

        componentDidMount() {
            const { formEvent, uiSchema, arrayIndex } = this.props;
            const { key = "", equal = "" } = this.getCurrentConditionKeys();

            if (key) {
                formEvent.on(["changed"].concat(jpp.parse(key)), this.initCondition.bind(this));

                this.initCondition(utils.mergeKeys({ uiSchema, arrayIndex }), this.getFieldValue());
            }
        }

        componentWillUnmount() {
            const { formEvent } = this.props;
            const { key = "", equal = "" } = this.getCurrentConditionKeys();

            formEvent.off(["changed"].concat(jpp.parse(key)).join(""), this.initCondition.bind(this));
        }

        initCondition(keys, data) {
            const { key = "", equal = "" } = this.getCurrentConditionKeys();

            if (data !== equal) {
                return this.setState({
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