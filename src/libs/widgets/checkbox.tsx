import * as React from 'react';
import {  Checkbox } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps{
    defaultValue: any;
}

export class CheckboxWidget extends BaseWidget<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    setDefaultProps() {
        let baseProps = super.setDefaultProps();

        return {
            defaultChecked: this.getFieldValue()
        };
    }

    render() {
        const { schema, uiSchema, children, arrayIndex, globalOptions, schemaForm, onChange, formEvent, defaultValue, form, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { checkbox = {} } = options.widget || {};
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        return (
            <Checkbox onChange={(e) => this.triggerEvent(["change"].concat(keys), keys, e.target["checked"], uiSchema)}
                disabled={(uiSchema as IUiSchema).readonly}
                {...checkbox}
                {...this.setDefaultProps()}
                ></Checkbox>
        );
    }
}