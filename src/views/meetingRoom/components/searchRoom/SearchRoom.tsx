import { ChangeEvent, useState } from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
// eslint-disable-next-line no-duplicate-imports
import dayjs from 'dayjs';
import styles from './SearchRoom.module.scss';
import IconCalendar from '../../assets/icon-calendar.png';
import IconSearch from '../../assets/icon-search.png';

type Props = {
    currentDate: string;
    onChangedDate: (date: number) => void;
    onSearch: (keywords: string) => void;
};

export const SearchRoom = ({ onSearch, currentDate, onChangedDate }: Props) => {
    const [showCalendarPopup, setShowCalendarPopup] = useState(false);
    const [keywordsValue, setKeywordsValue] = useState('');

    const wrapperStyle: React.CSSProperties = {
        width: 260,
        border: `1px solid #ccc`,
        borderRadius: '8px',
    };

    const handleShowCalendarPopup = () => {
        setShowCalendarPopup(!showCalendarPopup);
    };

    const handleChangedDate = (value: Dayjs) => {
        setShowCalendarPopup(false);
        onChangedDate(value.valueOf());
    };

    const handleSearchRoomByKeywords = () => {
        onSearch(keywordsValue);
    };

    const handleChangedKeywords = (e: ChangeEvent<HTMLInputElement>) => {
        setKeywordsValue(e.target.value);
    };

    const renderCalendarPopup = () => {
        if (!showCalendarPopup) {
            return;
        }

        return (
            <div className="calendar__popup" style={wrapperStyle}>
                <Calendar fullscreen={false} value={dayjs(currentDate)} onSelect={handleChangedDate} />
            </div>
        );
    };

    return (
        <div className={styles.searchRoom}>
            <img className="icon" src={IconCalendar} alt="calendar icon" onClick={handleShowCalendarPopup} />
            <input className="search__input" placeholder="请输入会议室名称" value={keywordsValue} onChange={handleChangedKeywords} />
            <img className="icon" src={IconSearch} alt="search icon" onClick={handleSearchRoomByKeywords} />
            {renderCalendarPopup()}
        </div>
    );
};
