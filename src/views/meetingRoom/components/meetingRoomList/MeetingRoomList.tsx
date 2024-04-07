import { MeetingRoom } from '@module/types';
import { useAction } from 'core-fe/src';
import {meetingRoomActions} from '../../store';
import styles from './MeetingRoomList.module.scss';
import { MeetingRoomCard } from '../meetingRoomCard/MeetingRoomCard';
import { useEffect, useState } from 'react';

type Props = {
    roomList: MeetingRoom[];
}

export const MeetingRoomList = ({roomList}: Props) => {
    const [currentRoomId, setCurrentRoomId] = useState('');
    const addRoom = useAction(meetingRoomActions.addRoom);
    console.log(meetingRoomActions);

    useEffect(() => {
        handleInitCurrentRoomId();
    }, []);

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

        setCurrentRoomId(id);

        addRoom();
    }

    const renderRoomList = () => {
        return roomList.map(({id, name}, index) => {
            const isSelected = id === currentRoomId;

            return (
                <MeetingRoomCard
                    key={`room-id-${index}`}
                    isSelected={isSelected}
                    id={id}
                    name={name}
                    freeTime={0}
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
