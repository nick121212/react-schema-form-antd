import * as React from 'react';
import { Input, Icon, Select, Spin } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import * as jpp from 'json-pointer';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps {
    defaultValue: any;
}

export class SelectWidget extends BaseWidget<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    setDefaultProps() {
        const { uiSchema } = this.props;
        const { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        const { value = undefined, text = undefined } = this.state || {};
        const defaultValue = this.getFieldValue();
        const changeProp = uiSchema["ui:change"] || "onChange";

        let props = {};

        if (schema.type === "array") {
            props["mode"] = "multiple";
            if (defaultValue) {
                props["defaultValue"] = defaultValue.map((d) => {
                    return d.toString();
                });
            }
            if (value) {
                props["value"] = value.map((d) => {
                    return d.toString();
                });;
            }
        } else {
            if (defaultValue) {
                props["defaultValue"] = defaultValue.toString();
            }
            if (value) {
                props["value"] = value.toString();
            }
        }

        props[changeProp] = this.handleChange.bind(this);

        if (props.hasOwnProperty("value")) {
            delete props["defaultValue"];
        }

        props["children"] = [{
            key: 1,
            text: "id1"
        }];

        return props;
    }

    handleChange(value, item) {
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
        const options = uiSchema["ui:options"] || {}, { select = {} } = options.widget || {};
        let { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        let { dataSource = [], text = "", loading = false } = this.state || {};
        let uiData = utils.getUiData(uiSchema, formData);

        if (uiData.length) {
            titleMap = uiData;
        }

        if (dataSource.length) {
            titleMap = dataSource;
        }

        return (
            <Select
                disabled={(uiSchema as IUiSchema).readonly}
                placeholder={(uiSchema as tv4.JsonSchema).title}
                notFoundContent={loading ? <Spin size="small" /> : null}
                {...triggerProps as Object}
                {...select}
                {...this.setDefaultProps() }>
                {
                    titleMap.map((val, i) => {
                        return <Select.Option value={val.value} key={val.value}>{val.label}</Select.Option>
                    })
                }
            </Select>
        );
    }
}