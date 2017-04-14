import * as React from 'react';
import { Input, Icon, Switch, Checkbox } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import * as jpp from 'json-pointer';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps{
    defaultValue: any;
}

export class CheckboxesWidget extends BaseWidget<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    setDefaultProps() {
        const { defaultValue, uiSchema } = this.props;
        const { titleMap = [], schema = {}, readonly } = uiSchema as IUiSchema;

        let props = {};

        if (defaultValue) {
            props["defaultValue"] = defaultValue;
        }
        if (schema.type === "array") {
            props["multiple"] = true;
        }
        props["options"] = titleMap;
        props["disabled"] = readonly;

        return Object.assign(props, super.setDefaultProps());
    }

    render() {
        const { uiSchema, arrayIndex, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { checkboxes = {} } = options.widget || {};
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        return (
            <Checkbox.Group onChange={(values) => this.triggerEvent(["change"].concat(keys), keys, values, uiSchema)} {...this.setDefaultProps() } {...checkboxes} />
        );
    }
}