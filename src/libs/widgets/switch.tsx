import * as React from 'react';
import { Input, Icon, Switch } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import * as jpp from 'json-pointer';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps {
    defaultValue: any;
}

export class SwitchWidget extends BaseWidget<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { schema, uiSchema, children, arrayIndex, globalOptions, schemaForm, onChange, formEvent, defaultValue, form, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { switcho = {} } = options.widget || {};
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        return (
            <Switch onChange={(checked) => this.triggerEvent(["change"].concat(keys), keys, checked, uiSchema)}
                disabled={(uiSchema as IUiSchema).readonly}
                defaultChecked={!!defaultValue}
                {...this.setDefaultProps() }
                {...switcho}></Switch>
        );
    }
}