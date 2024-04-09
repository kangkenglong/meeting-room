import { register } from 'core-fe/src';
import { MEETING_ROOM_NAME, MeetingRoomState } from '@module/types';
import { MeetingRoomModule } from './module';

const state: MeetingRoomState = {
    meetingRooms: [
        {
            id: '111',
            name: '筼筜湖',
            schedule: {},
        },
        {
            id: '222',
            name: '日月潭',
            schedule: {
                '2024-04-20': [
                    {
                        timeId: '10',
                        timeScope: '10:00 - 11:00',
                        ownerId: '111',
                        ownerName: 'Teresa',
                        inUse: true,
                        usePurpose: '例会',
                        participant: ['小白', '小李'],
                    },
                ],
            },
        },
        {
            id: '333',
            name: '东山岛',
            schedule: {},
        },
    ],
    meetingRoomListBySearch: [],
    currentMeetingRoom: null,
};

export const meetingRoomModule = new MeetingRoomModule(MEETING_ROOM_NAME, state);

const meetingRoomStore = register<MeetingRoomModule>(meetingRoomModule);

export const meetingRoomActions = meetingRoomStore.getActions();
