import { MeetingScheduleInfo } from '@module/types';
import styles from './ScheduleInfoForm.module.scss';
import { ChangeEvent } from 'react';
import { Input } from 'antd';
import { ParticipantSelector } from '../participantSelector/ParticipantSelector';

type Props = {
    scheduleInfo: Partial<MeetingScheduleInfo>;
    onUpdateFormData: (data: Partial<MeetingScheduleInfo>) => void;
}

export const ScheduleInfoForm = ({
    scheduleInfo,
    onUpdateFormData,
}: Props) => {
    const {
        ownerName,
        timeScope,
        usePurpose,
        purposeDescription,
        participant = [],
    } = scheduleInfo;

    const handleChangedUsePurpose = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        onUpdateFormData({
            usePurpose: value,
        });
    }

    const handleChangedPurposeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        onUpdateFormData({
            purposeDescription: value,
        });
    }

    const handleChangedParticipant = (value: string[]) => {
        onUpdateFormData({
            participant: value,
        });
    }

    return (
        <div className={styles.scheduleInfoForm}>
            <div className='info-item'>
                <p className='info-item__label'>时间段：{timeScope}</p>
                <div className='info-item__value'></div>
            </div>
            <div className='info-item'>
                <p className='info-item__label'>使用者：{ownerName}</p>
                <div className='info-item__value'></div>
            </div>
            <div className='info-item'>
                <p className='info-item__label'>
                    <span className='require-tips'>*</span>使用用途：
                </p>
                <div className='info-item__value'>
                    <Input
                        style={{ width: '200px', fontSize: '12px' }}
                        value={usePurpose}
                        onChange={handleChangedUsePurpose}
                        placeholder='请输入使用用途'
                    />
                </div>
            </div>
            <div className='info-item'>
                <p className='info-item__label'>用途描述：</p>
                <div className='info-item__value'>
                    <Input
                        style={{ width: '200px', fontSize: '12px' }}
                        value={purposeDescription}
                        onChange={handleChangedPurposeDescription}
                        placeholder='请输入用途描述'
                    />
                </div>
            </div>
            <div className='info-item'>
                <p className='info-item__label'>参会人：</p>
                <div className='info-item__value'>
                </div>
                <ParticipantSelector value={participant} onChanged={handleChangedParticipant} />
            </div>
        </div>
    )
}