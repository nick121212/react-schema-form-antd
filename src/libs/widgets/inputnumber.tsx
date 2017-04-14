import * as React from 'react';
import { Input, Icon, InputNumber } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import * as jpp from 'json-pointer';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps{
    defaultValue: any;
}

export class InputNumberWidget extends BaseWidget<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { schema, uiSchema,  children, globalOptions, schemaForm, arrayIndex, onChange, formEvent, defaultValue,  form, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { inputnumber = {} } = options.widget || {};
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        return (
            <InputNumber style={{ width: "100%" }}
                onChange={(value) => this.triggerEvent(["change"].concat(keys), keys, value, uiSchema)}
                disabled={(uiSchema as IUiSchema).readonly}
                defaultValue={defaultValue}
                 placeholder={(uiSchema as tv4.JsonSchema).title}
                {...this.setDefaultProps() }
                {...inputnumber}></InputNumber>
        );
    }
}