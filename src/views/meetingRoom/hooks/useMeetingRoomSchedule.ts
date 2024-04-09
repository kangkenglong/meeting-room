import { useUnaryAction } from "core-fe/src";
import { MeetingScheduleInfo } from "@module/types";
import { userModule } from "@store/user";
import { meetingRoomActions } from "@store/meetingRoom";
import { useEffect, useState } from "react";
import { BUTTON_TYPE } from "../constants";
import { ButtonsConfig, MeetingRoomInfo } from "../types";

type Props = {
    meetingRoom: MeetingRoomInfo | null;
}

type UseMeetingRoomSchedule = {
    currentUserId: string;
    currentSchedule: MeetingScheduleInfo | null;
    scheduleFormData: Partial<MeetingScheduleInfo>;
    handleChangedSchedule: (schedule: MeetingScheduleInfo) => void;
    handleUpdateFormData: (formData: Partial<MeetingScheduleInfo>) => void;
    handleGetButtonConfig: () => ButtonsConfig[];
}

export const useMeetingRoomSchedule = ({
    meetingRoom,
}: Props): UseMeetingRoomSchedule => {
    const [currentSchedule, setCurrentSchedule] = useState<MeetingScheduleInfo | null>(null);
    const [scheduleFormData, setScheduleFormData] = useState<Partial<MeetingScheduleInfo>>({});
    const {userId: currentUserId, userName: currentUserName} = userModule.state.userInfo;
    const reserveMeetingRoom = useUnaryAction(meetingRoomActions.reserveMeetingRoom);
    const updateSchedule = useUnaryAction(meetingRoomActions.updateSchedule);
    const deleteSchedule = useUnaryAction(meetingRoomActions.deleteSchedule);

    useEffect(() => {
        if (meetingRoom && meetingRoom.id) {
            console.log(1);
            setCurrentSchedule(null);
            setScheduleFormData({});
        }
    }, [meetingRoom?.id]);

    useEffect(() => {
        console.log(2);
        if (!meetingRoom || !currentSchedule) {
            return;
        }

        if (meetingRoom.schedule.length === 0) {
            setCurrentSchedule(null);
            setScheduleFormData({});
            return;
        }

        const newCurrentSchedule = meetingRoom.schedule.find(({timeId}) => timeId === currentSchedule.timeId);

        if (newCurrentSchedule) {
            setCurrentSchedule(newCurrentSchedule);
        }
    }, [meetingRoom]);

    const handleReserveMeetingRoom = () => {
        if (!meetingRoom) {
            return;
        }

        const {id: roomId, date} = meetingRoom;

        reserveMeetingRoom({
            roomId,
            date,
            inUse: true,
            ...scheduleFormData as MeetingScheduleInfo,
        });
    }

    const handleUpdateSchedule = () => {
        if (!meetingRoom) {
            return;
        }

        const {id: roomId, date} = meetingRoom;

        updateSchedule({
            roomId,
            date,
            ...scheduleFormData as MeetingScheduleInfo,
        });
    }

    const handleDeleteSchedule = () => {
        if (!meetingRoom || !scheduleFormData.timeId) {
            return;
        }

        const {id: roomId, date} = meetingRoom;

        deleteSchedule({
            roomId,
            date,
            timeId: scheduleFormData.timeId,
        });
    }

    const handleGetButtonConfig = (): ButtonsConfig[] => {
        if (!currentSchedule) {
            return [];
        }

        const buttonConfig = [];
        const {inUse, ownerId} = currentSchedule;

        if (!inUse) {
            buttonConfig.push({
                type: BUTTON_TYPE.ADD,
                label: '预定',
                onClick: handleReserveMeetingRoom,
            });
        }

        if (inUse && ownerId === currentUserId) {
            buttonConfig.push({
                type: BUTTON_TYPE.EDIT,
                label: '编辑',
                onClick: handleUpdateSchedule,
            });
            buttonConfig.push({
                type: BUTTON_TYPE.DELETE,
                label: '删除',
                onClick: handleDeleteSchedule,
            });
        }

        return buttonConfig;
    }

    const handleUpdateFormData = (formData: Partial<MeetingScheduleInfo>, isInital = false) => {
        console.log('formData: ', formData);

        let newFormData = {};

        if (!isInital) {
            newFormData = {
                ...scheduleFormData,
            }
        }

        setScheduleFormData({
            ...newFormData,
            ...formData,
        });
    }

    const handleChangedSchedule = (schedule: MeetingScheduleInfo) => {
        console.log('schedule: ', schedule);
        const {inUse, ownerId, ownerName} = schedule;
        let userName = ownerName;
        let userId = ownerId;

        if (!inUse) {
            userName = currentUserName;
            userId = currentUserId;
        }

        setCurrentSchedule(schedule);
        handleUpdateFormData({
            ...schedule,
            ownerName: userName,
            ownerId: userId,
        }, true);
    }

    return {
        currentUserId,
        currentSchedule,
        scheduleFormData,
        handleChangedSchedule,
        handleUpdateFormData,
        handleGetButtonConfig,
    }
}