import type { MeetingScheduleInfo } from '@module/types';

type MeetingRoomInfo = {
    id: string;
    name: string;
    freeTime: number;
    schedule: MeetingScheduleInfo[];
}

export {
    type MeetingRoomInfo,
}