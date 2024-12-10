import React from 'react';

interface PathVisualizerProps {
    path: number[];
}

const PathVisualizer: React.FC<PathVisualizerProps> = ({ path }) => {
    return (
        <div className="mt-3 space-y-2">
            {path.map((value, index) => {
                if (index === 0) return null;
                const prevValue = path[index - 1];
                const direction = value > prevValue ? '>' : '<';
                return (
                    <div key={index} className="flex items-center">
                        <span className="w-12 font-semibold">{prevValue < value ? prevValue : value}</span>
                        <span className="text-lg font-bold ml-2 text-red-500">
                            {direction === '<' && '<'}
                        </span>
                        <span
                            className={`flex-grow border-t-2 ${direction === '>' ? 'border-green-500' : 'border-red-500'
                                }`}
                        ></span>
                        <span className="text-lg font-bold mr-2 text-green-500">
                            {direction === '>' && '>'}
                        </span>
                        <span className="w-12 font-semibold">{prevValue < value ? value : prevValue}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default PathVisualizer;