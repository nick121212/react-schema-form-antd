import * as React from 'react';

import { BaseField } from './base';
import { ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { IUiSchema } from '../props/uischema';

export interface IProps extends ICommonChildProps {

}

export class NoneField extends BaseField<IProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { schema, uiSchema, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {};

        return (
            <span style={{ width: "100%" }}>
                {utils.getTemplateRender({ schema, uiSchemaCombine: (uiSchema as IUiSchema).items, ...extra })}
            </span>
        );
    }

}