import { useEffect, useState } from 'react';
import { useAction } from 'core-fe/src';
import type { MeetingScheduleInfo } from '@module/types';
import {meetingRoomActions} from '../../store';
import styles from './MeetingRoomList.module.scss';
import { MeetingRoomCard } from '../meetingRoomCard/MeetingRoomCard';
import { MeetingRoomInfo } from '../../types';

type Props = {
    roomList: MeetingRoomInfo[];
    onChangedSchedule: (schedule: MeetingScheduleInfo[]) => void;
}

export const MeetingRoomList = ({
    roomList,
    onChangedSchedule,
}: Props) => {
    const [currentRoomId, setCurrentRoomId] = useState('');

    useEffect(() => {
        handleInitCurrentRoomId();
    }, [roomList]);

    const handleInitCurrentRoomId = () => {
        if (roomList.length === 0) {
            return;
        }

        if (currentRoomId.length !== 0) {
            return;
        }

        setCurrentRoomId(roomList[0].id);
    }

    const handleChangedCurrentRoomId = (id: string) => {
        if (id === currentRoomId) {
            return;
        }

        const room = roomList.find(({id: roomId}) => id === roomId);

        setCurrentRoomId(id);
        onChangedSchedule(room?.schedule || []);
    }

    const renderRoomList = () => {
        return roomList.map(({id, name, freeTime}, index) => {
            const isSelected = id === currentRoomId;

            return (
                <MeetingRoomCard
                    key={`room-id-${index}`}
                    isSelected={isSelected}
                    id={id}
                    name={name}
                    freeTime={freeTime}
                    onClick={handleChangedCurrentRoomId}
                />
            );
        });
    }

    return (
        <div className={styles.meetingRoomList}>
            {renderRoomList()}
        </div>
    )
}
