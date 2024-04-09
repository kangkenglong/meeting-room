import {Module, type SagaGenerator} from 'core-fe/src';
import {
    type RootState,
    type MeetingRoomModuleName,
    type MeetingRoomState,
    type MeetingRoom,
    type ReserveParams,
    DeleteScheduleParams,
} from '@module/types';

export class MeetingRoomModule extends Module<RootState, MeetingRoomModuleName> {
    constructor(name: MeetingRoomModuleName, initialState: MeetingRoomState) {
        super(name, initialState);
    }

    getMeetingRooms(): MeetingRoom[] {
        return this.state.meetingRooms;
    }

    *reserveMeetingRoom({
        roomId,
        date,
        ...newSchedule
    }: ReserveParams): SagaGenerator {
        console.log(222222222222, roomId, date, newSchedule);
        this.setState((draf) => {
            const meetingRooms = draf.meetingRooms;
            const targetMeetingRoom = meetingRooms.find(({id}) => id === roomId);
    
            if (!targetMeetingRoom) {
                return;
            }

            const {schedule} = targetMeetingRoom;

            if (schedule[date]) {
                schedule[date].push(newSchedule);
                return;
            }

            schedule[date] = [newSchedule];
        });
    }

    *updateSchedule({
        roomId,
        date,
        ...newSchedule
    }: ReserveParams): SagaGenerator {
        console.log(222222222222, roomId, date, newSchedule);
        this.setState((draf) => {
            const meetingRooms = draf.meetingRooms;
            const targetMeetingRoom = meetingRooms.find(({id}) => id === roomId);
    
            if (!targetMeetingRoom) {
                return;
            }

            const {schedule} = targetMeetingRoom;
            const scheduleList = schedule[date]

            if (!scheduleList) {
                return;
            }

            const index = scheduleList.findIndex(({timeId}) => timeId === newSchedule.timeId);

            if (index !== -1) {
                scheduleList[index] = {
                    ...scheduleList[index],
                    ...newSchedule,
                }
            }
        });
    }

    *deleteSchedule({
        roomId,
        date,
        timeId: targetTimeId,
    }: DeleteScheduleParams): SagaGenerator {
        this.setState((draf) => {
            const meetingRooms = draf.meetingRooms;
            const targetMeetingRoom = meetingRooms.find(({id}) => id === roomId);
    
            if (!targetMeetingRoom) {
                return;
            }

            const {schedule} = targetMeetingRoom;
            const scheduleList = schedule[date]

            if (!scheduleList) {
                return;
            }

            const index = scheduleList.findIndex(({timeId}) => timeId === targetTimeId);

            if (index !== -1) {
                scheduleList.splice(index, 1);
            }
        });
    }
}
