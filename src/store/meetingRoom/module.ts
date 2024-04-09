import {Module, type SagaGenerator} from 'core-fe/src';
import {
    type RootState,
    type MeetingRoomModuleName,
    type MeetingRoomState,
    type MeetingRoom,
    type ReserveParams,
    DeleteScheduleParams,
    type MeetingRoomInfoBySearch,
} from '@module/types';

export class MeetingRoomModule extends Module<RootState, MeetingRoomModuleName> {
    constructor(name: MeetingRoomModuleName, initialState: MeetingRoomState) {
        super(name, initialState);
    }

    getMeetingRooms(): MeetingRoom[] {
        return this.state.meetingRooms;
    }

    *resetCurrentMeetingRoom(): SagaGenerator {
        this.setState({
            currentMeetingRoom: null,
        });
    }

    *setCurrentMeetingRoom(meetingRoom: MeetingRoomInfoBySearch): SagaGenerator {
        this.setState({
            currentMeetingRoom: meetingRoom,
        });
    }

    *updateCurrentMeetingRoom(): SagaGenerator {
        const {currentMeetingRoom: oldCurrentMeetingRoom, meetingRoomListBySearch} = this.state;

        if (!oldCurrentMeetingRoom) {
            return;
        }

        const meetinRoom = meetingRoomListBySearch.find(({id}) => id === oldCurrentMeetingRoom.id);

        if (!meetinRoom) {
            return;
        }

        this.setState({
            currentMeetingRoom: meetinRoom,
        });
    }

    *getMeetingRoomListBySearch(date: string, keywords: string): SagaGenerator {
        const {meetingRooms} = this.state;
        let meetingRoomList = meetingRooms;

        if (keywords.length > 0) {
            meetingRoomList = meetingRooms.filter(({name}) => name.includes(keywords));
        }

        if (meetingRoomList.length === 0) {
            this.setState({
                meetingRoomListBySearch: [],
            });
            return;
        }

        this.setState((draf) => {
            draf.meetingRoomListBySearch = meetingRoomList.map(({id, name, schedule}) => {
                const holpTimes = schedule[date] || [];
    
                return {
                    id,
                    name,
                    date,
                    freeTime: 12 - holpTimes.length,
                    schedule: holpTimes,
                }
            });
        });
    }

    *reserveMeetingRoom({
        roomId,
        date,
        ...newSchedule
    }: ReserveParams): SagaGenerator {
        console.log('reserveMeetingRoom: ', roomId, date, newSchedule);
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
