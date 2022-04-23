import React, { FC, ReactElement, useState } from 'react';
import { SortDirection } from '../types/general-types';

interface SortButtonProps {
    callback: (direction: SortDirection) => void;
    ascendingLabel: string;
    descendingLabel: string;
    label: string;
}

const SortButton: FC<SortButtonProps> = ({
    callback,
    ascendingLabel,
    descendingLabel,
    label,
}: SortButtonProps): ReactElement => {
    const [direction, setDirection] = useState<SortDirection>();
    const handleClick = () => {
        const currentDirection = direction || 'ASC';
        const newDirection = currentDirection === 'ASC' ? 'DESC' : 'ASC';
        setDirection(newDirection);
        callback(currentDirection);
    };
    return (
        <div className="sort-button-container">
            <button onClick={() => handleClick()}>
                Sort by <span>{label}</span> (
                {direction === 'ASC' || !direction
                    ? ascendingLabel
                    : descendingLabel}
                )
            </button>
        </div>
    );
};

export default SortButton;
