import { MeetingScheduleCard } from '../meetingScheduleCard/MeetingScheduleCard';
import styles from './MeetingScheduleList.module.scss';

export const MeetingScheduleList = () => {
    return (
        <div className={styles.meetingScheduleList}>
        <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
            <MeetingScheduleCard />
        </div>
    )
}