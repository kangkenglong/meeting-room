import { MeetingScheduleInfo } from '@module/types';
import styles from './ScheduleInfo.module.scss';
import IconEmpty from '../../assets/icon-empty.png';
import { ScheduleInfoForm } from '../scheduleInfoForm/ScheduleInfoForm';

type Props = {
    scheduleInfo: Partial<MeetingScheduleInfo>;
    onUpdateFormData: (data: Partial<MeetingScheduleInfo>) => void;
};

export const ScheduleInfo = ({ scheduleInfo, onUpdateFormData }: Props) => {
    const renderContent = () => {
        if (!scheduleInfo.timeScope) {
            return (
                <div className="empty-tips">
                    <img src={IconEmpty} alt="empty icon" />
                    请选择日程时间段
                </div>
            );
        }

        return <ScheduleInfoForm scheduleInfo={scheduleInfo} onUpdateFormData={onUpdateFormData} />;
    };

    return <div className={styles.scheduleInfo}>{renderContent()}</div>;
};
