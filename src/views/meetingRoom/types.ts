import type { MeetingScheduleInfo } from '@module/types';
import { BUTTON_TYPE } from './constants';

type ButtonsConfig = {
    type: BUTTON_TYPE;
    label: string;
    onClick: () => void;
}

export {
    // type MeetingRoomInfo,
    type ButtonsConfig,
}