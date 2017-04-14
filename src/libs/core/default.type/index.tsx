import { select } from './select';
import { text } from './text';
import { fieldset } from './fieldset';
import { number, integer } from './number';
import { checkbox } from './checkbox';
import { checkboxes } from './checkboxes';
import { array } from './array';
import { mutiSelect } from './mutiselect';

export const createDefaults = () => {
    return {
        string: [select, text],
        object: [fieldset],
        number: [number],
        integer: [integer],
        boolean: [checkbox],
        array: [checkboxes, array, mutiSelect]
    };
};