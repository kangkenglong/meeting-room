import styles from './MeetingRoom.module.scss';
import { Header } from './components/header/Header';
import { MeetingRoomList } from './components/meetingRoomList/MeetingRoomList';
import { MeetingRoomSchedule } from './components/meetingRoomSchedule/MeetingRoomSchedule';
import { SearchRoom } from './components/searchRoom/SearchRoom';
import { useMeetingRoom } from './hooks/useMeetingRoom';

export const MeetingRoom = () => {
    const {
        searchParams,
        currentMeetingRoom,
        meetingRoomList,
        handleSearch,
        handleChangedDate,
        handleUpdateCurrentMeetingRoomId,
    } = useMeetingRoom();
    const currentMeetingRoomId = currentMeetingRoom?.id || '';
    const {date} = searchParams;
    console.log(0);

    return (
        <div className={styles.meetingRoom}>
            <Header />
            <div className='content'>
                <div className='content--left'>
                    <SearchRoom currentDate={date} onSearch={handleSearch} onChangedDate={handleChangedDate} />
                    <MeetingRoomList currentRoomId={currentMeetingRoomId} roomList={meetingRoomList} onChangedMeetingRoomId={handleUpdateCurrentMeetingRoomId} />
                </div>
                <div className='content--right'>
                    <MeetingRoomSchedule />
                </div>
            </div>
        </div>
    );
};
