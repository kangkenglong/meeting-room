import { useEffect, useState } from 'react';
import { useAction } from 'core-fe/src';
import type { MeetingScheduleInfo } from '@module/types';
import {meetingRoomActions} from '@store/meetingRoom';
import styles from './MeetingRoomList.module.scss';
import { MeetingRoomCard } from '../meetingRoomCard/MeetingRoomCard';
import { MeetingRoomInfo } from '../../types';

type Props = {
    roomList: MeetingRoomInfo[];
    currentRoomId: string;
    onChangedMeetingRoomId: (id: string) => void;
}

export const MeetingRoomList = ({
    roomList,
    currentRoomId,
    onChangedMeetingRoomId,
}: Props) => {
    // const [currentRoomId, setCurrentRoomId] = useState('');

    // useEffect(() => {
    //     handleInitCurrentRoomId();
    // }, [roomList]);

    // const handleInitCurrentRoomId = () => {
    //     if (roomList.length === 0) {
    //         return;
    //     }

    //     if (currentRoomId.length !== 0) {
    //         return;
    //     }

    //     setCurrentRoomId(roomList[0].id);
    // }

    const handleChangedCurrentRoomId = (id: string) => {
        if (id === currentRoomId) {
            return;
        }

        // setCurrentRoomId(id);
        onChangedMeetingRoomId(id);
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
