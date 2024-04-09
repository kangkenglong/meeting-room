import styles from './Buttons.module.scss';
import { ButtonsConfig } from '../../types';

type Props = {
    config: ButtonsConfig[];
};

export const Buttons = ({ config }: Props) => {
    const renderButton = () => {
        return config.map(({ type, label, onClick }) => {
            const classname = `button-${type}`;

            return (
                <button key={type} className={classname} onClick={onClick}>
                    {label}
                </button>
            );
        });
    };

    return <div className={styles.buttons}>{renderButton()}</div>;
};
