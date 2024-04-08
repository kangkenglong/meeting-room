import { Select } from 'antd';

const mockParticipantOptions = [
    {
        label: '小李',
        value: '小李',
    },
    {
        label: '小白',
        value: '小白',
    },
    {
        label: '小张',
        value: '小张',
    },
];

type Props = {
    value: string[];
    onChanged: (value: string[]) => void;
}

export const ParticipantSelector = ({
    value = [],
    onChanged,
}: Props) => {
    const handleChanged = (value: string[]) => {
        onChanged(value);
    }

    return (
        <Select
            mode="multiple"
            allowClear
            style={{ width: '200px', fontSize: '12px' }}
            placeholder="请选择参会人员"
            value={value}
            onChange={handleChanged}
            options={mockParticipantOptions}
        />
    )
};
