import {type State} from 'core-fe/src';

const MEETING_ROOM_NAME = 'meetingRoom';

type MeetingRoomModuleName = typeof MEETING_ROOM_NAME;

type MeetingScheduleInfo = {
    timeId: number;
    ownerId: string;
    ownerName: string;
    participant: {
        userId: string;
        userName: string;
    }[];
}

type ScheduleInfo = {
    freeTime: number;
    meetings: MeetingScheduleInfo;
}

type MeetingSchedule = {
    [timestamp: string]: ScheduleInfo;
}

type MeetingRoom = {
    id: string;
    name: string;
    schedule: MeetingSchedule[];
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
};