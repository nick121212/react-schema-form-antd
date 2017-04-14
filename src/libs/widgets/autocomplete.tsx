import * as React from 'react';
import { Input, Icon, AutoComplete } from 'antd';

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
        const { defaultValue, uiSchema } = this.props;
        const { schema = {}, titleMap = [] } = uiSchema as IUiSchema;
        const { text = undefined } = this.state || {};

        let props = {};

        if (defaultValue) {
            props["defaultValue"] = defaultValue;
        }
        if (schema.type === "array") {
            props["multiple"] = true;
        }
        if (text != undefined) {
            props["value"] = text;
        }

        return Object.assign({}, super.setDefaultProps(), props);
    }

    handleChange(value: string) {
        const { uiSchema, arrayIndex } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        uiSchema["ui:trigger"] && uiSchema["ui:trigger"](value).then((dataSource) => {
            this.setState({
                dataSource: dataSource,
                text: value
            });
        });

    }

    render() {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { autocomplete = {} } = options.widget || {};
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        const { dataSource = [] } = this.state || {};

        return (
            <AutoComplete
                disabled={(uiSchema as IUiSchema).readonly}
                placeholder={(uiSchema as tv4.JsonSchema).title}
                onSelect={(value) => this.triggerEvent(["change"].concat(keys), keys, value, uiSchema)}
                onChange={this.handleChange.bind(this)}
                optionLabelProp="value"
                dataSource={dataSource}
                {...autocomplete}
                {...this.setDefaultProps() }>
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}