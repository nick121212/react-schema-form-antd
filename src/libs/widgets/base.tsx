import * as React from 'react';

import { ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { SchemaFormBase } from '../base';

/**
 * widget 基础类
 */
export abstract class BaseWidget<P extends ICommonChildProps, S extends { value?: any, dataSource?: any, text?: any, loading?: boolean }> extends SchemaFormBase<P, S> {
    private onChangedEvent;
    private onTriggerEvent;

    constructor(props, context) {
        super(props, context);
    }

    /**
     * 
     */
    componentDidMount() {
        const { uiSchema, arrayIndex, formEvent } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        this.onChangedEvent = (keys, value) => {
            this.setState({
                value: value
            });
        };
        this.onTriggerEvent = ({ dataSource, text, loading }) => {
            this.setState({
                dataSource,
                text,
                loading
            });
        };

        formEvent.on(["changed"].concat(keys), this.onChangedEvent);
        formEvent.on(["triggerEvent"].concat(keys), this.onTriggerEvent);
    }

    componentWillUnmount() {
        const { uiSchema, arrayIndex, formEvent } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        formEvent.off(["changed"].concat(keys).join('.'), this.onChangedEvent);
        formEvent.off(["triggerEvent"].concat(keys).join('.'), this.onTriggerEvent);
    }

    triggerEvent(name, ...args) {
        const { formEvent } = this.props;

        formEvent.emit(name, ...args);
    }

    setDefaultProps(): { [id: string]: any } {
        const { value = null } = this.state || {};

        return {
            value: value || this.getFieldValue()
        };
    }
}