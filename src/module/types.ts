import {type State} from 'core-fe/src';

const MEETING_ROOM_NAME = 'meetingRoom';

type MeetingRoomModuleName = typeof MEETING_ROOM_NAME;

const USER_NAME = 'user';

type UserModuleName = typeof USER_NAME;

type MeetingScheduleInfo = {
    timeId: string;
    timeScope: string;
    ownerId?: string;
    ownerName?: string;
    inUse?: boolean;
    usePurpose?: string;
    purposeDescription?: string;
    participant?: string[];
}

// type ScheduleInfo = {
//     freeTime: number;
//     meetings: MeetingScheduleInfo;
// }

type MeetingSchedule = {
    [timestamp: string]: MeetingScheduleInfo[];
}

type MeetingRoom = {
    id: string;
    name: string;
    schedule: MeetingSchedule;
}

type MeetingRoomState = {
    meetingRooms: MeetingRoom[];
}

type UserInfo = {
    userId: string;
    userName: string;
}

type UserState = {
    userInfo: UserInfo;
}

interface RootState extends State {
    app: {
        [MEETING_ROOM_NAME]: MeetingRoomState,
        [USER_NAME]: UserState,
    }
}

export {
    USER_NAME,
    MEETING_ROOM_NAME,
    type UserModuleName,
    type MeetingRoomModuleName,
    type MeetingRoomState,
    type UserState,
    type UserInfo,
    type RootState,
    type MeetingRoom,
    type MeetingScheduleInfo,
};
