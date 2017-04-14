import * as React from 'react';
import { Input, Icon } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import * as jpp from 'json-pointer';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps{
    defaultValue: any;
}

export class InputWidget extends BaseWidget<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { uiSchema, globalOptions, arrayIndex, defaultValue, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { input = {} } = options.widget || {};
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        return (
            <Input onChange={(e) => this.triggerEvent(["change"].concat(keys), keys, e.target["value"], uiSchema)}
                disabled={(uiSchema as IUiSchema).readonly}
                defaultValue={defaultValue}
                placeholder={(uiSchema as tv4.JsonSchema).title}
                {...this.setDefaultProps() }
                {...input}>
            </Input>
        );
    }
}