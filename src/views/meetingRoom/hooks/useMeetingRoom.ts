import { useEffect, useRef } from 'react';
import { useAction, useBinaryAction, useSelector, useUnaryAction } from 'core-fe/src';
import dayjs from 'dayjs';
import { meetingRoomActions } from '@store/meetingRoom';
import { DATE_FORMAT } from '../constants';
import { MEETING_ROOM_NAME, type RootState, type MeetingRoomInfoBySearch, type MeetingRoom } from '@module/types';

type SearchParams = {
    date: string;
    keywords: string;
};

type UseMeetingRoom = {
    meetingRoomList: MeetingRoomInfoBySearch[];
    searchParams: SearchParams;
    currentMeetingRoom: MeetingRoomInfoBySearch | null;
    handleSearch: (keywords: string) => void;
    handleChangedDate: (date: number) => void;
    handleUpdateCurrentMeetingRoomId: (id: string) => void;
};

export const useMeetingRoom = (): UseMeetingRoom => {
    const originMeetingRooms = useSelector<RootState, MeetingRoom[]>((state) => {
        return state.app[MEETING_ROOM_NAME].meetingRooms;
    });
    const meetingRoomList = useSelector<RootState, MeetingRoomInfoBySearch[]>((state) => {
        return state.app[MEETING_ROOM_NAME].meetingRoomListBySearch;
    });
    const currentMeetingRoom = useSelector<RootState, MeetingRoomInfoBySearch | null>((state) => {
        return state.app[MEETING_ROOM_NAME].currentMeetingRoom;
    });

    const resetCurrentMeetingRoom = useAction(meetingRoomActions.resetCurrentMeetingRoom);
    const setCurrentMeetingRoom = useUnaryAction(meetingRoomActions.setCurrentMeetingRoom);
    const getMeetingRoomListBySearch = useBinaryAction(meetingRoomActions.getMeetingRoomListBySearch);

    const searchParams = useRef<SearchParams>({
        date: '',
        keywords: '',
    });

    useEffect(() => {
        handleInitSearchParams();
    }, []);

    useEffect(() => {
        handleUpdateMeetingRoomList();
    }, [originMeetingRooms]);

    useEffect(() => {
        if (currentMeetingRoom) {
            handleUpdateCurrentMeetingRoomId(currentMeetingRoom.id);
        }
    }, [meetingRoomList]);

    function handleInitSearchParams() {
        const date = dayjs(new Date()).format(DATE_FORMAT);

        searchParams.current = {
            ...searchParams.current,
            date,
        };
    };

    function handleUpdateMeetingRoomList() {
        const { date, keywords } = searchParams.current;

        getMeetingRoomListBySearch(date, keywords);
    };

    function handleUpdateCurrentMeetingRoomId(id: string) {
        if (meetingRoomList.length === 0) {
            return;
        }

        const meetingRoom = meetingRoomList.find(({ id: roomId }) => roomId === id);

        if (meetingRoom) {
            setCurrentMeetingRoom(meetingRoom);
        }
    };

    const handleUpateSearchParams = (params: Partial<SearchParams>) => {
        searchParams.current = {
            ...searchParams.current,
            ...params,
        };

        handleUpdateMeetingRoomList();
    };

    const handleChangedDate = (date: number) => {
        resetCurrentMeetingRoom();
        handleUpateSearchParams({ date: dayjs(date).format(DATE_FORMAT) });
    };

    const handleSearch = (keywords: string) => {
        resetCurrentMeetingRoom();
        handleUpateSearchParams({ keywords });
    };

    return {
        searchParams: searchParams.current,
        currentMeetingRoom,
        meetingRoomList,
        handleSearch,
        handleChangedDate,
        handleUpdateCurrentMeetingRoomId,
    };
};
