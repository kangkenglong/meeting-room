import { useState } from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import styles from './SearchRoom.module.scss';
import IconCalendar from '../../assets/icon-calendar.png';
import IconSearch from '../../assets/icon-search.png';

type Props = {
    keywords: string;
    currentDate: string;
    onChangedDate: (date: number) => void;
}

export const SearchRoom = ({
    keywords,
    currentDate,
    onChangedDate,
}: Props) => {
    const [showCalendarPopup, setShowCalendarPopup] = useState(false);

    const wrapperStyle: React.CSSProperties = {
        width: 260,
        border: `1px solid #ccc`,
        borderRadius: '8px',
    };

    const handleShowCalendarPopup = () => {
        setShowCalendarPopup(!showCalendarPopup);
    }

    const handleChangedDate = (value: Dayjs) => {
        setShowCalendarPopup(false);
        onChangedDate(value.valueOf());
    }

    const renderCalendarPopup = () => {
        if (!showCalendarPopup) {
            return;
        }

        return (
            <div className='calendar__popup' style={wrapperStyle}>
                <Calendar fullscreen={false} value={dayjs(currentDate)} onSelect={handleChangedDate} />
            </div>
        );
    }

    return (
        <div className={styles.searchRoom}>
            <img className='icon' src={IconCalendar} alt='calendar icon' onClick={handleShowCalendarPopup} />
            <input className='search__input' placeholder='请输入会议室名称' value={keywords} />
            <img className='icon' src={IconSearch} alt='search icon' />
            {renderCalendarPopup()}
        </div>
    )
}