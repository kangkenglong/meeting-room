import { useEffect, useRef, useState } from "react";
import { useAction, useSelector } from "core-fe/src";
import dayjs from 'dayjs';
import { DATE_FORMAT } from "../constants";
import { meetingRoomModule } from '@store/meetingRoom';
import { MeetingRoomInfo } from "../types";
import { RootState, MEETING_ROOM_NAME, MeetingRoom } from "@module/types";

type SearchParams = {
    date: string;
    keywords: string;
}

type UseMeetingRoom = {
    meetingRoomList: MeetingRoomInfo[];
    searchParams: SearchParams;
    currentMeetingRoom: MeetingRoomInfo | null;
    handleSearch: (keywords: string) => void;
    handleChangedDate: (date: number) => void;
    handleUpdateCurrentMeetingRoomId: (id: string) => void;
    // handleUpdateCurrentMeetingRoom: (meetingRoom: MeetingRoomInfo) => void;
}

export const useMeetingRoom = (): UseMeetingRoom => {
    const originMeetingRooms = useSelector<RootState, MeetingRoom[]>((state) => {
        return state.app[MEETING_ROOM_NAME].meetingRooms;
    });
    const [meetingRoomList, setMeetingRoomList] = useState<MeetingRoomInfo[]>([]);
    const [currentMeetingRoom, setCurrentMeetingRoom] = useState<MeetingRoomInfo | null>(null);
    const searchParams = useRef<SearchParams>({
        date: '',
        keywords: '',
    });

    useEffect(() => {
        const date = dayjs(new Date()).format(DATE_FORMAT);

        handleUpateSearchParams({date});
    }, [originMeetingRooms]);

    const handleClearCurrentMeetingRoom = () => {
        setCurrentMeetingRoom(null);
    }

    const handleUpdateCurrentMeetingRoom = (meetingRooms: MeetingRoomInfo[]) => {
        // setCurrentMeetingRoom(meetingRoom);
    }

    const handleUpdateMeetingRoomList = () => {
        const {date, keywords} = searchParams.current;
        let meetingRoom = originMeetingRooms;

        if (originMeetingRooms.length === 0) {
            return;
        }

        if (keywords.length > 0) {
            meetingRoom = originMeetingRooms.filter(({name}) => name.includes(keywords)) || [];
        }

        if (meetingRoom.length === 0) {
            setMeetingRoomList([]);
            setCurrentMeetingRoom(null);
            return;
        }

        const newMeetingRoomList = meetingRoom.map(({id, name, schedule}) => {
            const holpTimes = schedule[date] || [];

            return {
                id,
                name,
                date,
                freeTime: 12 - holpTimes.length,
                schedule: holpTimes,
            }
        });

        setMeetingRoomList(newMeetingRoomList);

        if (currentMeetingRoom) {
            const newCurrentMeetingRoom = newMeetingRoomList.find(({id: roomId}) => roomId === currentMeetingRoom.id);

            setCurrentMeetingRoom(newCurrentMeetingRoom || null);
        }
    }

    const handleUpateSearchParams = (params: Partial<SearchParams>) => {
        searchParams.current = {
            ...searchParams.current,
            ...params,
        };

        handleUpdateMeetingRoomList();
    }

    const handleChangedDate = (date: number) => {
        handleClearCurrentMeetingRoom();
        handleUpateSearchParams({date: dayjs(date).format(DATE_FORMAT)});
    }

    const handleSearch = (keywords: string) => {
        handleClearCurrentMeetingRoom();
        handleUpateSearchParams({keywords});
    }

    const handleUpdateCurrentMeetingRoomId = (id: string) => {
        if (meetingRoomList.length === 0) {
            return;
        }

        const meetingRoom = meetingRoomList.find(({id: roomId}) => roomId === id);

        if (meetingRoom) {
            setCurrentMeetingRoom(meetingRoom);
        }
    }

    return {
        searchParams: searchParams.current,
        currentMeetingRoom,
        meetingRoomList,
        handleSearch,
        handleChangedDate,
        // handleUpdateCurrentMeetingRoom,
        handleUpdateCurrentMeetingRoomId,
    };
}