import { fieldFactory, tempFactory, widgetFactory, utils } from './utils';
import { ObjectField } from './libs/fields/object';
import { StringField } from './libs/fields/string';
import { NumberField } from './libs/fields/number';
import { BoolField } from './libs/fields/boolean';
import { ArrayField } from './libs/fields/array';
import { NoneField } from './libs/fields/none';
import { DefaultTemp } from './libs/temps/default';
import { RowTemp } from './libs/temps/row';
import { ColTemp } from './libs/temps/col';
import { FormItemTemp } from './libs/temps/formitem';
// import { ArrayTemp } from './libs/temps/array';
import { InputWidget } from './libs/widgets/input';
import { InputNumberWidget } from './libs/widgets/inputnumber';
import { SwitchWidget } from './libs/widgets/switch';
import { CheckboxWidget } from './libs/widgets/checkbox';
import { SelectWidget } from './libs/widgets/select';
import { CheckboxesWidget } from './libs/widgets/checkboxes';
import { AutoCompleteWidget } from './libs/widgets/autocomplete';
import { TreeWidget } from './libs/widgets/tree';
import { StepsWidget } from './libs/widgets/steps';

import { SchemaForm } from './libs/form';
import { CardTemp } from './libs/temps/card';
import { IUiSchema } from './libs/props/uischema';
import { BaseWidget } from './libs/widgets/base';
import { BaseField } from './libs/fields/base';
import { BaseTemp } from './libs/temps/base';
import { BaseFactory } from './libs/base.factory';
import { ICommonChildProps } from "./libs/props/common";

fieldFactory.add("object", ObjectField as any);
fieldFactory.add("string", StringField as any);
fieldFactory.add("text", StringField as any);
fieldFactory.add("number", NumberField as any);
fieldFactory.add("boolean", BoolField as any);
fieldFactory.add("array", ArrayField as any);
fieldFactory.add("none", NoneField as any);

tempFactory.add("default", DefaultTemp as any);
tempFactory.add("row", RowTemp as any);
tempFactory.add("card", CardTemp as any);
tempFactory.add("col", ColTemp as any);
tempFactory.add("formitem", FormItemTemp as any);
// tempFactory.add("array", ArrayTemp as any);

widgetFactory.add("default", InputWidget as any);
widgetFactory.add("number", InputNumberWidget as any);
widgetFactory.add("checkbox", CheckboxWidget as any);
widgetFactory.add("switch", SwitchWidget as any);
widgetFactory.add("select", SelectWidget as any);
widgetFactory.add("checkboxes", CheckboxesWidget as any);
widgetFactory.add("autocomplete", AutoCompleteWidget as any);
widgetFactory.add("tree", TreeWidget as any);
widgetFactory.add("steps", StepsWidget as any);

export {
    SchemaForm, fieldFactory, tempFactory, widgetFactory, IUiSchema, BaseWidget, BaseField, BaseTemp, BaseFactory, utils, ICommonChildProps
};