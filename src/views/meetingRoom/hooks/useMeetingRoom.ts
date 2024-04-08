import { useEffect, useRef, useState } from "react";
import { useAction } from "core-fe/src";
import type { MeetingRoom, MeetingScheduleInfo } from "@module/types";
import dayjs from 'dayjs';
import { DATE_FORMAT } from "../constants";
import { meetingRoomModule } from '@store/meetingRoom';
import { MeetingRoomInfo } from "../types";

type SearchParams = {
    date: string;
    keywords: string;
}

type UseMeetingRoom = {
    meetingRoomList: MeetingRoomInfo[];
    searchParams: SearchParams;
    currentRoomSchedule: MeetingScheduleInfo[];
    handleSearch: (keywords: string) => void;
    handleChangedDate: (date: number) => void;
    handleUpdateCurrentRoomSchedule: (schedule: MeetingScheduleInfo[]) => void;
}

export const useMeetingRoom = (): UseMeetingRoom => {
    const [meetingRoomList, setMeetingRoomList] = useState<MeetingRoomInfo[]>([]);
    const [currentRoomSchedule, setCurrentRoomSchedule] = useState<MeetingScheduleInfo[]>([]);
    const searchParams = useRef<SearchParams>({
        date: '',
        keywords: '',
    });

    useEffect(() => {
        const date = dayjs(new Date()).format(DATE_FORMAT);

        handleUpateSearchParams({date});
    }, []);

    const handleUpdateMeetingRoomList = () => {
        let meetingRooms = meetingRoomModule.state.meetingRooms;
        const {date, keywords} = searchParams.current;

        if (meetingRooms.length === 0) {
            return;
        }

        if (keywords.length > 0) {
            meetingRooms = meetingRooms.filter(({name}) => name.includes(keywords)) || [];
        }

        setMeetingRoomList(meetingRooms.map(({id, name, schedule}) => {
            const holpTimes = schedule[date] || [];

            return {
                id,
                name,
                freeTime: 12 - holpTimes.length,
                schedule: holpTimes,
            }
        }));
        setCurrentRoomSchedule([]);
    }

    const handleUpateSearchParams = (params: Partial<SearchParams>) => {
        searchParams.current = {
            ...searchParams.current,
            ...params,
        };

        handleUpdateMeetingRoomList();
    }

    const handleChangedDate = (date: number) => {
        handleUpateSearchParams({date: dayjs(date).format(DATE_FORMAT)});
    }

    const handleSearch = (keywords: string) => {
        handleUpateSearchParams({keywords});
    }

    const handleUpdateCurrentRoomSchedule = (schedule: MeetingScheduleInfo[]) => {
        setCurrentRoomSchedule(schedule);
    }

    return {
        searchParams: searchParams.current,
        currentRoomSchedule,
        meetingRoomList,
        handleSearch,
        handleChangedDate,
        handleUpdateCurrentRoomSchedule,
    };
}