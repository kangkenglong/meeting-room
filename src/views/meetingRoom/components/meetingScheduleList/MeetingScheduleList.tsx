import { useEffect, useState } from 'react';
import type { MeetingRoomInfoBySearch, MeetingScheduleInfo } from '@module/types';
import { SCHEDULE_LIST } from '../../constants';
import { MeetingScheduleCard } from '../meetingScheduleCard/MeetingScheduleCard';
import styles from './MeetingScheduleList.module.scss';

type Props = {
    currentTimeId: string;
    meetingRoom: MeetingRoomInfoBySearch;
    onChangedSchedule: (schedule: MeetingScheduleInfo) => void;
}

export const MeetingScheduleList = ({
    currentTimeId = '',
    meetingRoom,
    onChangedSchedule,
}: Props) => {
    const [scheduleList, setScheduleList] = useState<MeetingScheduleInfo[]>([]);

    useEffect(() => {
        const schedules = SCHEDULE_LIST.map(({timeId, timeScope}) => {
            const schedule = meetingRoom.schedule.find(({timeId: id}) => id === timeId);

            return {
                timeId,
                timeScope,
                ...schedule,
            }
        });

        setScheduleList(schedules);
    }, [meetingRoom]);

    const handleChangedSchedule = (timeId: string) => {
        const schedule = scheduleList.find(({timeId: id}) => id === timeId);

        if (!schedule) {
            return;
        }

        onChangedSchedule(schedule);
    }

    const renderScheduleList = () => {
        if (scheduleList.length === 0) {
            return null;
        }

        return scheduleList.map(({timeId, timeScope, inUse, usePurpose, ownerName}) => {
            const isSelected = timeId === currentTimeId;

            return (
                <MeetingScheduleCard
                    key={`timeCard-${timeId}`}
                    timeScope={timeScope}
                    inUse={inUse}
                    usePurpose={usePurpose}
                    userName={ownerName}
                    isSelected={isSelected}
                    onClick={() => handleChangedSchedule(timeId)}
                />
            )
        });
    }

    return (
        <div className={styles.meetingScheduleList}>
            {renderScheduleList()}
        </div>
    )
}