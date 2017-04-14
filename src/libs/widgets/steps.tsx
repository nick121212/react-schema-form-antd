import * as React from 'react';
import { Input, Icon, Select, Steps, Button, Row, Col, Layout } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import * as jpp from 'json-pointer';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps{
    defaultValue: any;
}

export class StepsWidget extends BaseWidget<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    handleDelete(idx) {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form, ...extra } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();

        data.splice(idx, 1);

        this.triggerEvent(["change"].concat(keys), keys, data, uiSchema);
    }

    handleUp(idx) {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form, ...extra } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();

        this.up(data, idx);
        this.triggerEvent(["change"].concat(keys), keys, data, uiSchema);
    }

    handleDown(idx) {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form, ...extra } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        let data = this.getFieldValue();

        this.down(data, idx);
        this.triggerEvent(["change"].concat(keys), keys, data, uiSchema);
    }

    render() {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { steps = {} } = options.widget || {};

        let titleMap = this.getFieldValue();

        if (titleMap && titleMap.length) {
            return (
                <Steps {...steps}>
                    {
                        titleMap && titleMap.map((val, i) => {
                            return <Steps.Step key={val.key + "-" + i} title={
                                <div>
                                    <span>{val.title}</span>
                                    <Button.Group>
                                        <Button onClick={this.handleDelete.bind(this, i)} icon="minus"></Button>
                                        <Button disabled={!this.canUp(titleMap, i)} onClick={this.handleUp.bind(this, i)} icon="arrow-up"></Button>
                                        <Button disabled={!this.canDown(titleMap, i)} onClick={this.handleDown.bind(this, i)} icon="arrow-down"></Button>
                                    </Button.Group>
                                </div>
                            } />;
                        })
                    }
                </Steps>
            );
        }

        return <span>暂无数据</span>
    }
}