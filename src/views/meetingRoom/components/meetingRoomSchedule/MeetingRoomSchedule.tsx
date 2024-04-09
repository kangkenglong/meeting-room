import styles from './MeetingRoomSchedule.module.scss';
import { Buttons } from '../buttons/Buttons';
import { MeetingScheduleList } from '../meetingScheduleList/MeetingScheduleList';
import { ScheduleInfo } from '../scheduleInfo/ScheduleInfo';
import { useMeetingRoomSchedule } from '../../hooks/useMeetingRoomSchedule';
import { MeetingRoomInfo } from '../../types';

type Props = {
    meetingRoom: MeetingRoomInfo | null;
}

export const MeetingRoomSchedule = ({
    meetingRoom,
}: Props) => {
    const {
        currentSchedule,
        scheduleFormData,
        handleChangedSchedule,
        handleGetButtonConfig,
        handleUpdateFormData,
    } = useMeetingRoomSchedule({meetingRoom});

    const renderButtons = () => {
        if (!currentSchedule) {
            return null;
        }

        const config = handleGetButtonConfig();

        return <Buttons config={config} />;
    }

    const renderContent = () => {
        if (!meetingRoom) {
            return null;
        }

        return (
            <>
                <div className='schedule-list'>
                    <div className='title'>
                        <span>日程</span>
                    </div>
                    <MeetingScheduleList
                        currentTimeId={currentSchedule?.timeId || ''}
                        meetingRoom={meetingRoom}
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
            </>
        )
    }

    return (
        <div className={styles.meetingRoomSchedule}>
            {renderContent()}
        </div>
    )
}