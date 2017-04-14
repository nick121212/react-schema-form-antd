import * as React from 'react';
import { Input, Icon, Select, AutoComplete, Tree } from 'antd';

import { ICommonProps, ICommonChildProps } from '../props/common';
import * as jpp from 'json-pointer';
import { IUiSchema } from '../props/uischema';
import { BaseWidget } from './base';
import { utils } from '../../utils';

export interface IProps extends ICommonChildProps {
    defaultValue: any;
}

export class TreeWidget extends BaseWidget<IProps, any> {
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

    onLoadData(treeNode) {
        const { uiSchema, arrayIndex } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        console.log(treeNode);

        return uiSchema["ui:trigger"] && uiSchema["ui:trigger"](treeNode.eventKey).then((dataSource) => {
            this.setState({
                dataSource: dataSource
            });
        });
    }

    loop(data) {
        data.map((item) => {
            if (item.nodes) {
                return <Tree.TreeNode title={item.name} key={item.key}>{this.loop(item.nodes)}</Tree.TreeNode>;
            }
            return <Tree.TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} />;
        });
    }

    render() {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, defaultValue, formEvent, form, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { tree = {} } = options.widget || {};
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });
        const { dataSource = [] } = this.state || {};

        return (
            <Tree
                loadData={this.onLoadData}
                onSelect={(value) => this.triggerEvent(["change"].concat(keys), keys, value, uiSchema)}
                {...this.setDefaultProps() }
                {...tree}>
            </Tree>
        );
    }
}