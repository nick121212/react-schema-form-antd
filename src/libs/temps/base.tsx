import * as React from 'react';
import { Col } from 'antd';

import { ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { SchemaFormBase } from '../base';
import * as jpp from 'json-pointer';

export interface IProps extends ICommonChildProps {

}

export abstract class BaseTemp<P extends ICommonChildProps, T> extends SchemaFormBase<P, T>{
    private onValidatorEvent: (ekey: string, err) => void;

    constructor(props, context) {
        super(props, context);
        // this.init();
    }

    init() {
        const { uiSchema, formEvent, arrayIndex } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        this.onValidatorEvent = ((ekey: string, err: any) => {
            this.forceUpdate();
        }).bind(this);

        formEvent.on(["setValidator"].concat(keys), this.onValidatorEvent);
    }

    getErrorInfo() {
        const { uiSchema, children, arrayIndex, globalOptions = {}, validateResult } = this.props;
        const options = uiSchema["ui:options"] || {};
        const key = this.getKey();
        const { error = null, dirty = false, invalid = true } = jpp(validateResult).has(key) ? jpp(validateResult).get(key) : {};
        const { hasFeedback = false } = options.formItem || {};
        let props = {};

        if (dirty) {
            props["validateStatus"] = invalid ? "error" : "success";
        }

        return { dirty, invalid, error };
    }

    componentWillUnmount() {
        const { uiSchema, formEvent, arrayIndex } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        formEvent.off(["setValidator"].concat(keys).join('.'), this.onValidatorEvent);
    }
}