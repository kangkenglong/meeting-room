import {Module, type SagaGenerator} from 'core-fe/src';
import {
    type RootState,
    type MeetingRoomModuleName,
    type MeetingRoomState,
    type MeetingRoom,
} from '@module/types';

export class MeetingRoomModule extends Module<RootState, MeetingRoomModuleName> {
    constructor(name: MeetingRoomModuleName, initialState: MeetingRoomState) {
        super(name, initialState);
    }

    getMeetingRooms(): MeetingRoom[] {
        return this.state.meetingRooms;
    }
}
