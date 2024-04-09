import type { MeetingRoomInfoBySearch } from '@module/types';
import styles from './MeetingRoomList.module.scss';
import { MeetingRoomCard } from '../meetingRoomCard/MeetingRoomCard';

type Props = {
    roomList: MeetingRoomInfoBySearch[];
    currentRoomId: string;
    onChangedMeetingRoomId: (id: string) => void;
};

export const MeetingRoomList = ({ roomList, currentRoomId, onChangedMeetingRoomId }: Props) => {
    const handleChangedCurrentRoomId = (id: string) => {
        if (id === currentRoomId) {
            return;
        }

        onChangedMeetingRoomId(id);
    };

    const renderRoomList = () => {
        return roomList.map(({ id, name, freeTime }, index) => {
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
    };

    return <div className={styles.meetingRoomList}>{renderRoomList()}</div>;
};
