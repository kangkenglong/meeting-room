import classnames from 'classnames';
import styles from './meetingRoomCard.module.scss';

type Props = {
    id: string;
    name: string;
    freeTime: number;
    isSelected: boolean;
    onClick: (id: string) => void;
}

export const MeetingRoomCard = ({
    id,
    name,
    onClick,
    freeTime = 0,
    isSelected = false,
}: Props) => {
    const classname = classnames(styles.meetingRoomCard, {
        [styles.meetingRoomCardSelected]: isSelected,
    });

    return (
        <div className={classname} onClick={() => onClick(id)}>
            <div className='meeting-room-info'>
                <div className='room-id'>会议室编号：{id}</div>
                <div className='room-name'>会议室名称：{name}</div>
                <div className='room-state'>空余时长：{freeTime} 小时</div>
            </div>
            <div className='right-icon'>{'>'}</div>
        </div>
    )
}