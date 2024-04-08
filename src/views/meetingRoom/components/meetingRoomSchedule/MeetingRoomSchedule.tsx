import type { MeetingScheduleInfo } from '@module/types';
import styles from './MeetingRoomSchedule.module.scss';
import { Buttons } from '../buttons/Buttons';
import { MeetingScheduleList } from '../meetingScheduleList/MeetingScheduleList';
import { ScheduleInfo } from '../scheduleInfo/ScheduleInfo';
import { useMeetingRoomSchedule } from '../../hooks/useMeetingRoomSchedule';

type Props = {
    meetingRoomSchedule: MeetingScheduleInfo[];
}

export const MeetingRoomSchedule = ({
    meetingRoomSchedule,
}: Props) => {
    const {
        currentSchedule,
        scheduleFormData,
        handleChangedSchedule,
        handleGetButtonConfig,
        handleUpdateFormData,
    } = useMeetingRoomSchedule();

    const renderButtons = () => {
        if (!currentSchedule) {
            return null;
        }

        const config = handleGetButtonConfig();

        return <Buttons config={config} />;
    }

    return (
        <div className={styles.meetingRoomSchedule}>
            <div className='schedule-list'>
                <div className='title'>
                    <span>日程</span>
                </div>
                <MeetingScheduleList
                    currentTimeId={currentSchedule?.timeId || ''}
                    meetingRoomSchedule={meetingRoomSchedule}
                    onChangedSchedule={handleChangedSchedule}
                />
            </div>
            <div className='schedule-info'>
                <div className='title title-options'>
                    <span>日程详情</span>
                    {renderButtons()}
                </div>
                <ScheduleInfo scheduleInfo={scheduleFormData} onUpdateFormData={handleUpdateFormData} />
            </div>
        </div>
    )
}