import type { MeetingScheduleInfo } from '@module/types';
import styles from './MeetingRoomSchedule.module.scss';
import { Buttons } from '../buttons/Buttons';
import { MeetingScheduleList } from '../meetingScheduleList/MeetingScheduleList';
import { useState } from 'react';

type Props = {
    meetingRoomSchedule: MeetingScheduleInfo[];
}

export const MeetingRoomSchedule = ({
    meetingRoomSchedule,
}: Props) => {
    const [currentSchedule, setCurrentSchedule] = useState<MeetingScheduleInfo>();

    const handleChangedSchedule = (schedule: MeetingScheduleInfo) => {
        setCurrentSchedule(schedule);
    }

    const renderButtons = () => {
        if (!currentSchedule) {
            return null;
        }

        return <Buttons config={[]} />;
    }

    return (
        <div className={styles.meetingRoomSchedule}>
            <div className='schedule-list'>
                <div className='title'>
                    <span>日程</span>
                </div>
                <MeetingScheduleList meetingRoomSchedule={meetingRoomSchedule} onChangedSchedule={handleChangedSchedule} />
            </div>
            <div className='schedule-info'>
                <div className='title title-options'>
                    <span>日程详情</span>
                    {renderButtons()}
                </div>

            </div>
        </div>
    )
}