import { userModule } from '@store/user';
import styles from './Header.module.scss';

export const Header = () => {
    const userName = userModule.state.userInfo.userName;

    return (
        <header className={styles.header}>
            <div className="title">会议室预定系统</div>
            <div className="user-info">{userName}</div>
        </header>
    );
};
