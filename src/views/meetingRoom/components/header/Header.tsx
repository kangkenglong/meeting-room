import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className='title'>会议室预定系统</div>
            <div className='user-info'>Kedron</div>
        </header>
    )
}