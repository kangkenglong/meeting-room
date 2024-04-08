import { MeetingScheduleInfo } from "@module/types";
import { userModule } from "@store/user";
import { useState } from "react";
import { BUTTON_TYPE } from "../constants";
import { ButtonsConfig } from "../types";

type UseMeetingRoomSchedule = {
    currentUserId: string;
    currentSchedule: MeetingScheduleInfo | undefined;
    scheduleFormData: Partial<MeetingScheduleInfo>;
    handleChangedSchedule: (schedule: MeetingScheduleInfo) => void;
    handleUpdateFormData: (formData: Partial<MeetingScheduleInfo>) => void;
    handleGetButtonConfig: () => ButtonsConfig[];
}

export const useMeetingRoomSchedule = (): UseMeetingRoomSchedule => {
    const [currentSchedule, setCurrentSchedule] = useState<MeetingScheduleInfo>();
    const [scheduleFormData, setScheduleFormData] = useState<Partial<MeetingScheduleInfo>>({});
    const {userId: currentUserId, userName: currentUserName} = userModule.state.userInfo;

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
                onClick: () => {},
            });
        }

        if (inUse && ownerId === currentUserId) {
            buttonConfig.push({
                type: BUTTON_TYPE.EDIT,
                label: '编辑',
                onClick: () => {},
            });
            buttonConfig.push({
                type: BUTTON_TYPE.DELETE,
                label: '删除',
                onClick: () => {},
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