import styles from './MeetingRoomSchedule.module.scss';
import { MeetingScheduleList } from '../meetingScheduleList/MeetingScheduleList';

export const MeetingRoomSchedule = () => {
    return (
        <div className={styles.meetingRoomSchedule}>
            <MeetingScheduleList />
        </div>
    )
}