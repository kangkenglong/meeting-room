import {type State} from 'core-fe/src';

const MEETING_ROOM_NAME = 'meetingRoom';

type MeetingRoomModuleName = typeof MEETING_ROOM_NAME;

type MeetingScheduleInfo = {
    timeId: string;
    timeScope: string;
    ownerId?: string;
    ownerName?: string;
    inUse?: boolean;
    usePurpose?: string;
    purposeDescription?: string;
    participant?: {
        userId: string;
        userName: string;
    }[];
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

interface RootState extends State {
    app: {
        [MEETING_ROOM_NAME]: MeetingRoomState,
    }
}

export {
    MEETING_ROOM_NAME,
    type MeetingRoomModuleName,
    type MeetingRoomState,
    type RootState,
    type MeetingRoom,
    type MeetingScheduleInfo,
};
