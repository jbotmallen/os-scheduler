import React from 'react';

interface SeekCalculationProps {
    steps: string;
    total: number;
}

const SeekCalculation: React.FC<SeekCalculationProps> = ({ steps, total }) => {
    return (
        <div className="mt-3 space-y-2">
            <div className="text-lg">
                <span className="font-semibold">Steps: </span>
                {steps}
            </div>
            <div className="text-lg">
                <span className="font-semibold">Total Seek Count: </span>
                {total}
            </div>
        </div>
    );
};

export default SeekCalculation;
