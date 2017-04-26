import * as React from 'react';

import { ICommonChildProps } from "../props/common";
import { BaseWidget } from './base';
import { mergeSchema } from '../core/merge';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps {

}

export interface IState {

}

export class FormWidget extends BaseWidget<IProps, IState> {
    constructor(props, context) {
        super(props, context);
    }

    handleChange(value) {

    }

    render() {
        const { schema, uiSchema, children, validateResult, formEvent, schemaFormOptions, ...extra } = this.props;
        const val = this.getFieldValue();

        if (!val.schema) {
            return <span>{children}</span>;
        }

        const { form, options } = mergeSchema(val.schema, val.uiSchema || {}, schemaFormOptions);

        return (
            <span>
                {/*utils.getTemplateRender({ schema: val.schema, uiSchemaCombine: form,  schemaFormOptions: options, ...extra })*/}
                {children}
            </span>
        );
    }
}