import * as React from 'react';
import { EventEmitter2 } from 'eventemitter2';

import { utils } from '../utils';
import { IUiSchema } from './props/uischema';
import { IValidateResult } from './props/validateresult';
import { ICommonProps } from './props/common';
import { mergeSchema } from './core/merge';

export interface IProps extends ICommonProps {

}

export class SchemaForm extends React.Component<IProps, any> {
    /**
     * 保存字段的验证信息
     * 如果是Array类型，则保存在Array的field里面
     */
    private validateResult: { [id: string]: IValidateResult } = {};
    /**
     * 验证是否通过
     */
    private valid: boolean = true;
    /**
     * 事件通知类
     */
    private formEvent: EventEmitter2 = new EventEmitter2({ verboseMemoryLeak: false, wildcard: true, maxListeners: 100 });
    /**
     * 字段更改后触发的事件
     */
    private onChangeAll: (keys: Array<string>, data: any, uiSchema: IUiSchema) => void;
    private onValidate: (keys: Array<string>, data: any, uiSchema: IUiSchema) => void;

    /**
     * 构造
     * @param props 
     * @param context 
     */
    constructor(props: IProps, context) {
        super(props, context);
        this.init();
    }

    /**
     * 验证所有的数据
     * 返回验证的结果
     */
    validator() {
        this.valid = true;
        this.formEvent.emit("validatorAll");

        return this.valid;
    }

    /**
     * 获取数据
     */
    getData() {
        return this.props.formData;
    }

    /**
     * 初始化
     * 绑定change事件，所有组件的数据更改都需要通知
     *     验证当前更改的数据字段
     *     发送数据验证的结构通知
     *     发送数据更改的事件，用于多个组件复用同一个字段
     */
    init() {
        const { schema, uiSchema, onChange } = this.props;

        this.onChangeAll = (keys, data, uiSchema: IUiSchema) => {
            // 保存数据
            utils.saveData({ data, formData: this.props.formData, keys });
            // 触发changed事件
            this.formEvent.emit(["changed"].concat(keys), keys, data);
            this.onValidate(keys, data, uiSchema);
            onChange && onChange(keys, data);
        };
        // 单个widget更改事件
        this.formEvent.on(["change", "**"], this.onChangeAll);

        this.onValidate = (keys, data, uiSchema) => {
            let validateResult: tv4.SingleResult = utils.validateSingle({ keys, data, uiSchema, validateResult: this.validateResult });

            this.valid = this.valid && validateResult.valid;

            if (!validateResult.valid) {
                console.log(validateResult);
            }
            // 触发validator事件
            this.formEvent.emit(["setValidator"].concat(keys), keys, validateResult);
        };

        this.formEvent.on(["validator", "**"], this.onValidate);
    }

    /**
     * 注销掉change事件
     */
    componentWillUnmount() {
        this.formEvent.off(["change", "**"].join(''), this.onChangeAll);
        this.formEvent.off(["validator", "**"].join(''), this.onValidate);
    }

    /**
     * 绘画页面
     */
    render() {
        const { schema, uiSchema, children, ...extra } = this.props;
        const { form, options } = mergeSchema(schema, uiSchema, null);

        return (
            <span>
                {utils.getTemplateRender({ schemaForm: this, schema, uiSchemaCombine: form, validateResult: this.validateResult, formEvent: this.formEvent, schemaFormOptions: options, ...extra })}
                {children}
            </span>
        );
    }

    /**
     * HOC，用于包裹schemaform组件
     * @param Componment 组件
     */
    static create(Componment): React.ComponentClass<any> {
        let count = 0;

        return class SchemaFormHoc extends React.Component<any, any> {
            private schemaForm: SchemaForm;
            private key: string;

            componentWillMount() {
                this.key = "schemaForm-" + count++;
            }

            proc(method) {
                let schemaForm = this.refs[this.key];

                if (!schemaForm) {
                    throw new Error("没有找到SchemaForm");
                }

                return schemaForm[method].call(schemaForm);
                // return this.schemaForm[method].call(this.schemaForm);
            }

            render() {
                const props = Object.assign({}, this.props, { getData: this.proc.bind(this, "getData"), validator: this.proc.bind(this, "validator") });

                return (
                    <Componment {...props}>
                        <SchemaForm ref={this.key} schema={props.schema} uiSchema={props.uiSchema} onChange={props.onChange} form={props.form} formData={props.formData||{}} globalOptions={props.globalOptions} >
                            {props.children}
                        </SchemaForm>
                    </Componment>
                );
            }
        }
    }
}