import * as React from 'react';
import { Input, Icon, AutoComplete, Button } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps {
    defaultValue: any;
}

export class AutoCompleteWidget extends BaseWidget<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    setDefaultProps() {
        const { uiSchema } = this.props;
        const { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        const { value = undefined, text = undefined, loading = false } = this.state || {};
        const defaultValue = this.getFieldValue();
        const changeProp = uiSchema["ui:change"] || "onChange";

        let props = {};

        if (defaultValue) {
            props["defaultValue"] = defaultValue.toString();
        }
        if (value) {
            props["value"] = value.toString();
        }

        props[changeProp] = this.handleChange.bind(this);

        if (props.hasOwnProperty("value")) {
            delete props["defaultValue"];
        }

        return props;
    }

    handleChange(value) {
        const { uiSchema, arrayIndex, handleTrigger, ...extra } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });


        if ((uiSchema as IUiSchema).schema.type === "number") {
            value = ~~value;
        }

        if (value === this.getFieldValue()) {
            return;
        }

        this.triggerEvent(["change"].concat(keys), keys, value, uiSchema);
    }

    render() {
        const { uiSchema, children, globalOptions, formData, arrayIndex, schemaForm, onChange, formEvent, form, triggerProps, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { autocomplete = {} } = options.widget || {};
        let { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        let { dataSource = [], text = "", loading = false } = this.state || {};
        let uiData = utils.getUiData(uiSchema, formData);

        if (uiData.length) {
            titleMap = uiData;
        }
        if (dataSource.length) {
            titleMap = dataSource;
        }

        if (options.renderOptions) {
            titleMap = options.renderOptions(titleMap);
        }

        return (
            <AutoComplete
                className="global-search"
                dataSource={titleMap as any}
                disabled={(uiSchema as IUiSchema).readonly}
                placeholder={(uiSchema as tv4.JsonSchema).title}
                optionLabelProp="label"
                {...triggerProps as Object}
                {...this.setDefaultProps() }
                {...autocomplete}>
                <Input
                    suffix={(
                        <Button className="search-btn" size="small" ghost={true}>
                            <Icon type="search" />
                        </Button>
                    )}
                />
            </AutoComplete>
        );
    }
}