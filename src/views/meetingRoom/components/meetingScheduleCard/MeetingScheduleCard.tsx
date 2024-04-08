import styles from './MeetingScheduleCard.module.scss';

type Props = {
    timeScope: string;
    inUse?: boolean;
    userName?: string;
    usePurpose?: string;
    onClick: () => void;
}

export const MeetingScheduleCard = ({
    timeScope,
    onClick,
    inUse = false,
    userName = '无',
    usePurpose = '无',
}: Props) => {
    return (
        <div className={styles.meetingScheduleCard} onClick={onClick}>
            <div className='schedule-info'>
                <p>时间：{timeScope}</p>
                <p>使用者：{userName}</p>
                <p>用途：{usePurpose}</p>
            </div>
            <div className='schedule-state'>
                <p>{inUse ? '占用' : '空闲'}</p>
            </div>
        </div>
    )
}
