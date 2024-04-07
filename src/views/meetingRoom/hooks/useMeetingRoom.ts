import { useAction } from "core-fe/src";
import { MeetingRoom } from "@module/types";
import { meetingRoomModule } from '../store';

type UseMeetingRoom = {
    meetingRooms: MeetingRoom[];
}

export const useMeetingRoom = (): UseMeetingRoom => {
    const meetingRooms = meetingRoomModule.state.meetingRooms;

    

    return {
        meetingRooms,
    };
}