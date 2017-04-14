import * as React from 'react';
import { Form, Input } from 'antd';
import * as jpp from 'json-pointer';

import { ICommonProps, ICommonChildProps } from '../props/common';
import { IUiSchema } from '../props/uischema';
import { utils } from '../../utils';
import { BaseTemp } from './base';

export interface IProps extends ICommonChildProps {
    arrayItems?: JSX.Element;
}

export class FormItemTemp extends BaseTemp<IProps, any> {
    constructor(props, context) {
        super(props, context);
        super.init();
    }

    render() {
        const { uiSchema, children, arrayIndex, globalOptions = {}, validateResult, arrayItems } = this.props;
        const options = uiSchema["ui:options"] || {};
        const { hasFeedback = false } = options.formItem || {};
        const { dirty, invalid, error } = this.getErrorInfo();
        let props = {};

        if (dirty) {
            props["validateStatus"] = invalid ? "error" : "success";
        }

        return (
            <Form.Item {...globalOptions.formItem}
                required={(uiSchema as IUiSchema).required}
                label={(uiSchema as tv4.JsonSchema).title}
                extra={(uiSchema as tv4.JsonSchema).description}
                help={error ? error.message : ""}
                hasFeedback={dirty && hasFeedback}
                {...props}
                {...globalOptions.formItem}
                {...options.formItem}>
                {children}
                {arrayItems}
            </Form.Item>
        );
    }
}
