import * as React from 'react';
import { ICommonProps, ICommonChildProps } from '../props/common';
import { utils } from '../../utils';
import { IUiSchema } from '../props/uischema';
import { BaseField } from './base';
import { Card, Row, Col } from 'antd';
import { mergeSchema } from '../core/merge';

export interface IProps extends ICommonChildProps {
    arrayItems: Array<JSX.Element>;
}

export class ObjectField extends BaseField<IProps, any>{
    constructor(props, context) {
        super(props, context);
    }

    init() {
        const { uiSchema, formEvent, arrayIndex, schemaFormOptions } = this.props;

        if (!(uiSchema as IUiSchema).init) {
            const uiSchemaCombine = mergeSchema(uiSchema["schema"], uiSchema["uiSchema"], schemaFormOptions, (uiSchema as IUiSchema).key as string[]);

            (uiSchema as IUiSchema).items = uiSchemaCombine.form;
            (uiSchema as IUiSchema).init = true;
        }

        super.init();
    }

    render() {
        const { schema, uiSchema, arrayItems, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {};

        return (
            <Card {...options.card} style={{ marginBottom: 10 }} title={
                <Row type="flex" justify="space-between">
                    <Col>
                        {(uiSchema as tv4.JsonSchema).title}
                    </Col>
                    <Col>
                        {arrayItems}
                    </Col>
                </Row>
            }>
                {utils.getTemplateRender({ schema, uiSchemaCombine: (uiSchema as IUiSchema).items, ...extra })}
            </Card>
        );
    }
}