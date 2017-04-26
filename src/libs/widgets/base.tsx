import * as React from 'react';

import { ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { SchemaFormBase } from '../base';
import { IUiSchema } from '../props/uischema';

/**
 * widget 基础类
 */
export abstract class BaseWidget<P extends ICommonChildProps, S extends { value?: any, dataSource?: any, text?: any, clearValue?: boolean, loading?: boolean }> extends SchemaFormBase<P, S> {
    private onChangedEvent;
    private onTriggerEvent;

    constructor(props, context) {
        super(props, context);
    }

    /**
     * mount的时候
     * 绑定changed事件
     * 绑定triggerEvent事件
     * 绑定setData事件
     */
    componentDidMount() {
        const { uiSchema, arrayIndex, formEvent, schemaForm } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        const { onChange } = uiSchema as IUiSchema;

        this.onChangedEvent = (keys, value) => {
            onChange && onChange(keys, value, schemaForm);
            this.setState({
                value: value
            });
        };
        this.onTriggerEvent = ({ dataSource, text, value, loading, clearValue }) => {
            this.setState({
                dataSource,
                text,
                value,
                loading,
                clearValue
            });
        };

        formEvent.on(["changed"].concat(keys), this.onChangedEvent);
        formEvent.on(["triggerEvent"].concat(keys), this.onTriggerEvent);
        // formEvent.on(["setData"].concat(keys), this.setData.bind(this));
    }

    /**
     * unmount
     * 接触绑定的所有事件
     */
    componentWillUnmount() {
        const { uiSchema, arrayIndex, formEvent } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        formEvent.off(["changed"].concat(keys).join('.'), this.onChangedEvent);
        formEvent.off(["triggerEvent"].concat(keys).join('.'), this.onTriggerEvent);
        // formEvent.off(["setData"].concat(keys).join('.'), this.setData.bind(this));
    }

    /**
     * 设置默认的props
     */
    setDefaultProps(): { [id: string]: any } {
        const { value = null } = this.state || {};

        return {
            value: value || this.getFieldValue()
        };
    }
}