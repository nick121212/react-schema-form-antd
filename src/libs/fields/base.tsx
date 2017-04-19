import * as React from 'react';
import { utils } from '../../utils';
import { SchemaFormBase } from '../base';
import { ICommonChildProps, IHOC } from '../props/common';

export abstract class BaseField<P extends ICommonChildProps, S> extends SchemaFormBase<P, S>{
    private onChangeEvent: () => void;

    constructor(props: P, context: S) {
        super(props, context);
        this.init();
    }

    /**
     * 绑定验证所有组件的事件
     * 用于点击提交按钮的时候使用
     */
    init() {
        const { uiSchema, formEvent, arrayIndex } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        this.onChangeEvent = (() => {
            const { uiSchema, formEvent } = this.props;
            formEvent.emit(["validator"].concat(keys), keys, this.getFieldValue(), uiSchema);
        }).bind(this);

        formEvent.on("validatorAll", this.onChangeEvent);
    }

    componentWillUnmount() {
        const { formEvent } = this.props;

        formEvent.off("validatorAll", this.onChangeEvent);
    }
}