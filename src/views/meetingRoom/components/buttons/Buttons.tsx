import styles from './Buttons.module.scss';
import { BUTTON_TYPE } from '../../constants';

type ButtonsConfig = {
    type: BUTTON_TYPE;
    label: string;
    onClick: () => void;
}

type Props = {
    config: ButtonsConfig[];
}

export const Buttons = ({
    config,
}: Props) => {
    const renderButton = () => {
        return config.map(({type, label, onClick}) => {
            const classname = `button-${type}`;

            return <button key={type} className={classname} onClick={onClick}>{label}</button>;
        });
    }

    return (
        <div className={styles.buttons}>
            {renderButton()}
        </div>
    )
};
