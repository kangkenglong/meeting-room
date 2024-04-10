import { useSelector, useUnaryAction } from 'core-fe/src';
import { message } from 'antd';
import { MEETING_ROOM_NAME, type MeetingRoomInfoBySearch, type MeetingScheduleInfo, type RootState } from '@module/types';
import { userModule } from '@store/user';
import { meetingRoomActions } from '@store/meetingRoom';
import { useEffect, useRef, useState } from 'react';
import { BUTTON_TYPE, SCHEDULE_LIST } from '../constants';
import { ButtonsConfig } from '../types';

type UseMeetingRoomSchedule = {
    contextHolder: React.ReactElement;
    currentUserId: string;
    currentSchedule: MeetingScheduleInfo | null;
    currentMeetingRoom: MeetingRoomInfoBySearch | null;
    scheduleFormData: Partial<MeetingScheduleInfo>;
    handleChangedSchedule: (schedule: MeetingScheduleInfo) => void;
    handleUpdateFormData: (formData: Partial<MeetingScheduleInfo>) => void;
    handleGetButtonConfig: () => ButtonsConfig[];
};

export const useMeetingRoomSchedule = (): UseMeetingRoomSchedule => {
    const currentMeetingRoom = useSelector<RootState, MeetingRoomInfoBySearch | null>((state) => {
        return state.app[MEETING_ROOM_NAME].currentMeetingRoom;
    });
    const meetingRoomListBySearch = useSelector<RootState, MeetingRoomInfoBySearch[]>((state) => {
        return state.app[MEETING_ROOM_NAME].meetingRoomListBySearch;
    });
    const [currentSchedule, setCurrentSchedule] = useState<MeetingScheduleInfo | null>(null);
    const [scheduleFormData, setScheduleFormData] = useState<Partial<MeetingScheduleInfo>>({});
    const lastMeetingRoomId = useRef<string>('');

    const [messageApi, contextHolder] = message.useMessage();

    const { userId: currentUserId, userName: currentUserName } = userModule.state.userInfo;
    const reserveMeetingRoom = useUnaryAction(meetingRoomActions.reserveMeetingRoom);
    const updateSchedule = useUnaryAction(meetingRoomActions.updateSchedule);
    const deleteSchedule = useUnaryAction(meetingRoomActions.deleteSchedule);

    useEffect(() => {
        if (!currentMeetingRoom) {
            handleClearState();
            return;
        }

        if (isNeedSetDefaultSchedule(currentMeetingRoom)) {
            handleSetDefaultSchedule();
            return;
        }

        const newCurrentSchedule = currentMeetingRoom.schedule.find(({ timeId }) => timeId === currentSchedule!.timeId);

        if (!newCurrentSchedule) {
            handleClearState();
            return;
        }

        setCurrentSchedule(newCurrentSchedule);
    }, [currentMeetingRoom]);

    function isNeedSetDefaultSchedule(meetingRoom: MeetingRoomInfoBySearch): boolean {
        return !lastMeetingRoomId.current || lastMeetingRoomId.current !== meetingRoom.id || !currentSchedule;
    }

    const verifyReserveRequestParams = (): boolean => {
        return Boolean(scheduleFormData.usePurpose?.length);
    };

    const verifyHasSameTimeSchedule = (meetingRoomId: string, timeId: string): boolean => {
        const otherMeetingRoom = meetingRoomListBySearch.filter(({ id }) => id !== meetingRoomId);

        if (otherMeetingRoom.length === 0) {
            return false;
        }

        const hasSchedule = otherMeetingRoom.some((room) => {
            return room.schedule.some(({ timeId: id, ownerId }) => id === timeId && ownerId === currentUserId);
        });

        return hasSchedule;
    };

    function handleClearState() {
        setCurrentSchedule(null);
        setScheduleFormData({});
    }

    const handleReserveMeetingRoom = () => {
        if (!currentMeetingRoom) {
            return;
        }

        const { id: roomId, date } = currentMeetingRoom;

        if (verifyHasSameTimeSchedule(roomId, scheduleFormData.timeId!)) {
            messageApi.error('同时段已有会议日程，无法再预定');
            return;
        }

        if (!verifyReserveRequestParams()) {
            messageApi.error('请输入使用用途');
            return;
        }

        reserveMeetingRoom({
            roomId,
            date,
            inUse: true,
            ...(scheduleFormData as MeetingScheduleInfo),
        });
    };

    const handleUpdateSchedule = () => {
        if (!currentMeetingRoom) {
            return;
        }

        if (!verifyReserveRequestParams()) {
            messageApi.error('请输入使用用途');
            return;
        }

        const { id: roomId, date } = currentMeetingRoom;

        updateSchedule({
            roomId,
            date,
            ...(scheduleFormData as MeetingScheduleInfo),
        });
    };

    const handleDeleteSchedule = () => {
        if (!currentMeetingRoom || !scheduleFormData.timeId) {
            return;
        }

        const { id: roomId, date } = currentMeetingRoom;

        deleteSchedule({
            roomId,
            date,
            timeId: scheduleFormData.timeId,
        });
    };

    const handleGetButtonConfig = (): ButtonsConfig[] => {
        if (!currentSchedule) {
            return [];
        }

        const buttonConfig = [];
        const { inUse, ownerId } = currentSchedule;

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
    };

    function handleSetDefaultSchedule() {
        if (!currentMeetingRoom) {
            return;
        }

        lastMeetingRoomId.current = currentMeetingRoom.id;

        if (currentMeetingRoom.schedule.length === 0) {
            const schedule = SCHEDULE_LIST[0];

            setCurrentSchedule(schedule);
            setScheduleFormData({
                ...schedule,
                ownerName: currentUserName,
                ownerId: currentUserId,
            });
            return;
        }

        if (currentMeetingRoom.schedule.length === SCHEDULE_LIST.length) {
            handleClearState();
            return;
        }

        for (let i = 0; i < SCHEDULE_LIST.length; i++) {
            const schedule = SCHEDULE_LIST[i];
            const hasSchedule = currentMeetingRoom.schedule.some(({ timeId }) => timeId === schedule.timeId);

            if (!hasSchedule) {
                setCurrentSchedule(schedule);
                setScheduleFormData({
                    ...schedule,
                    ownerName: currentUserName,
                    ownerId: currentUserId,
                });
                break;
            }
        }
    }

    const handleUpdateFormData = (formData: Partial<MeetingScheduleInfo>, isInital = false) => {
        let newFormData = {};

        if (!isInital) {
            newFormData = {
                ...scheduleFormData,
            };
        }

        setScheduleFormData({
            ...newFormData,
            ...formData,
        });
    };

    const handleChangedSchedule = (schedule: MeetingScheduleInfo) => {
        const { inUse, ownerId, ownerName } = schedule;
        let userName = ownerName;
        let userId = ownerId;

        if (!inUse) {
            userName = currentUserName;
            userId = currentUserId;
        }

        setCurrentSchedule(schedule);
        handleUpdateFormData(
            {
                ...schedule,
                ownerName: userName,
                ownerId: userId,
            },
            true,
        );
    };

    return {
        contextHolder,
        currentUserId,
        currentSchedule,
        currentMeetingRoom,
        scheduleFormData,
        handleChangedSchedule,
        handleUpdateFormData,
        handleGetButtonConfig,
    };
};
