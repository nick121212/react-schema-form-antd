import * as React from 'react';
import { Input, Icon, Select } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import * as jpp from 'json-pointer';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps{
    defaultValue: any;
}

export class SelectWidget extends BaseWidget<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    setDefaultProps() {
        const { defaultValue, uiSchema } = this.props;
        const { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        let props = {};

        if (defaultValue) {
            props["defaultValue"] = defaultValue;
        }
        if (schema.type === "array") {
            props["multiple"] = true;
        }

        return Object.assign(props, super.setDefaultProps());
    }

    render() {
        const { uiSchema,  children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { select = {} } = options.widget || {};
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        const { titleMap = [], schema = {} } = uiSchema as IUiSchema;

        return (
            <Select
                onChange={(value) => this.triggerEvent(["change"].concat(keys), keys, value, uiSchema)}
                disabled={(uiSchema as IUiSchema).readonly}
                placeholder={(uiSchema as tv4.JsonSchema).title}
                {...this.setDefaultProps() }
                {...select}>
                {
                    titleMap.map((val, i) => {
                        return <Select.Option key={i} value={val.value}>{val.label}</Select.Option>
                    })
                }
            </Select>
        );
    }
}