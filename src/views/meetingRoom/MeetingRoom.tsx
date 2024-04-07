import styles from './MeetingRoom.module.scss';
import { Header } from './components/header/Header';
import { MeetingRoomList } from './components/meetingRoomList/MeetingRoomList';
import { useMeetingRoom } from './hooks/useMeetingRoom';

export const MeetingRoom = () => {
    const {
        meetingRooms,
    } = useMeetingRoom();

    return (
        <div className={styles.meetingRoom}>
            <Header />
            <div className='content'>
                <div className='content--left'>
                    <MeetingRoomList roomList={meetingRooms} />
                </div>
                <div className='content--right'>
                    
                </div>
            </div>
        </div>
    );
};
