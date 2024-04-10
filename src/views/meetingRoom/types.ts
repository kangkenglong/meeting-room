import { BUTTON_TYPE } from './constants';

type ButtonsConfig = {
    type: BUTTON_TYPE;
    label: string;
    onClick: () => void;
};

export { type ButtonsConfig };
