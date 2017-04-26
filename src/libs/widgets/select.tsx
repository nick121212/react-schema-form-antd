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

        let props = {};

        if (schema.type === "array") {
            props["mode"] = "multiple";
            if (defaultValue) {
                props["defaultValue"] = defaultValue;
            }
            if (value) {
                props["value"] = value;
            }
        } else {
            if (defaultValue) {
                props["defaultValue"] = defaultValue.toString();
            }
            if (value) {
                props["value"] = value.toString();
            }
        }

        props = Object.assign({}, props);

        if (props.hasOwnProperty("value")) {
            delete props["defaultValue"];
        }

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

        // this.setState({ text: item.props.title });
        this.triggerEvent(["change"].concat(keys), keys, value, uiSchema);
    }

    render() {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form, triggerProps, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { select = {} } = options.widget || {};
        let { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        let { dataSource = [], text = "", loading = false } = this.state || {};

        if (dataSource.length) {
            titleMap = dataSource;
        }
        
        console.log(triggerProps);
        

        return (
            <Select
                // onSelect={this.handleChange.bind(this)}
                onChange={this.handleChange.bind(this)}
                disabled={(uiSchema as IUiSchema).readonly}
                placeholder={(uiSchema as tv4.JsonSchema).title}
                notFoundContent={loading ? <Spin size="small" /> : null}
                {...select}
                {...triggerProps}
                {...this.setDefaultProps() }>
                {
                    titleMap.map((val, i) => {
                        return <Select.Option value={val.value} title={val.label} key={val.value}>{val.label}</Select.Option>
                    })
                }
            </Select>
        );
    }
}