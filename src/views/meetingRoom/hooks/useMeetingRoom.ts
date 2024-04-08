import { useEffect, useRef, useState } from "react";
import { useAction } from "core-fe/src";
import { MeetingRoom } from "@module/types";
import dayjs from 'dayjs';
import { meetingRoomModule } from '../store';
import { MeetingRoomInfo } from "../types";

type SearchParams = {
    date: string;
    keywords: string;
}

type UseMeetingRoom = {
    meetingRoomList: MeetingRoomInfo[];
    searchParams: SearchParams;
    handleChangedDate: (date: number) => void;
}

export const useMeetingRoom = (): UseMeetingRoom => {
    const [meetingRoomList, setMeetingRoomList] = useState<MeetingRoomInfo[]>([]);
    const searchParams = useRef<SearchParams>({
        date: '',
        keywords: '',
    });

    useEffect(() => {
        console.log(new Date().valueOf());
        const date = dayjs(new Date()).format('YYYY-MM-DD');

        handleUpateSearchParams({date});
    }, []);

    const handleUpdateMeetingRoomList = () => {
        let meetingRooms = meetingRoomModule.state.meetingRooms;
        const {date, keywords} = searchParams.current;

        if (meetingRooms.length === 0) {
            return;
        }

        if (keywords.length > 0) {
            meetingRooms = meetingRooms.filter(({name}) => name.includes(name)) || [];
        }

        setMeetingRoomList(meetingRooms.map(({id, name, schedule}) => {
            const holpTimes = schedule[date] || [];

            return {
                id,
                name,
                freeTime: 12 - holpTimes.length,
            }
        }));
    }

    const handleUpateSearchParams = (params: Partial<SearchParams>) => {
        searchParams.current = {
            ...searchParams.current,
            ...params,
        };

        handleUpdateMeetingRoomList();
    }

    const handleChangedDate = (date: number) => {
        console.log(dayjs(date).format('YYYY-MM-DD'));

        handleUpateSearchParams({date: dayjs(date).format('YYYY-MM-DD')});
    }

    return {
        searchParams: searchParams.current,
        meetingRoomList,
        handleChangedDate,
    };
}