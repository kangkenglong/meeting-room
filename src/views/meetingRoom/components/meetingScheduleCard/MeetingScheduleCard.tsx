import styles from './MeetingScheduleCard.module.scss';

export const MeetingScheduleCard = () => {
    return (
        <div className={styles.meetingScheduleCard}>
            <div className='schedule-info'>
                <p>时间：</p>
                <p>使用者：</p>
                <p>用途：</p>
            </div>
            <div className='schedule-state'>
                <p>空闲</p>
            </div>
        </div>
    )
}
