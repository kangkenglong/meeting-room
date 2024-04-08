import styles from './MeetingRoom.module.scss';
import { Header } from './components/header/Header';
import { MeetingRoomList } from './components/meetingRoomList/MeetingRoomList';
import { MeetingRoomSchedule } from './components/meetingRoomSchedule/MeetingRoomSchedule';
import { SearchRoom } from './components/searchRoom/SearchRoom';
import { useMeetingRoom } from './hooks/useMeetingRoom';

export const MeetingRoom = () => {
    const {
        searchParams,
        meetingRoomList,
        handleChangedDate,
    } = useMeetingRoom();
    const {keywords, date} = searchParams;

    return (
        <div className={styles.meetingRoom}>
            <Header />
            <div className='content'>
                <div className='content--left'>
                    <SearchRoom currentDate={date} keywords={keywords} onChangedDate={handleChangedDate} />
                    <MeetingRoomList roomList={meetingRoomList} />
                </div>
                <div className='content--right'>
                    <MeetingRoomSchedule />
                </div>
            </div>
        </div>
    );
};
