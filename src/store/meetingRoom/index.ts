import {register} from 'core-fe/src';
import { MEETING_ROOM_NAME } from '@module/types';
import { MeetingRoomModule } from './module';

const state = {
    meetingRooms: [
        {
            id: '111',
            name: '筼筜湖',
            schedule: {},
        },
        {
            id: '222',
            name: '日月潭',
            schedule: {},
        },
        {
            id: '333',
            name: '东山岛',
            schedule: {},
        }
    ]
}

export const meetingRoomModule = new MeetingRoomModule(MEETING_ROOM_NAME, state);

const meetingRoomStore = register<MeetingRoomModule>(meetingRoomModule);

export const meetingRoomActions = meetingRoomStore.getActions();
