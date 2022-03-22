import React from 'react'

const ProgressBar = ({ progressPercentage }) => {
    return (
        <div className='h-3 my-3 rounded w-full bg-gray-300'>
            <div
                style={{ width: `${progressPercentage}%`}}
                className={`h-full rounded duration-300 ${
                    progressPercentage < 50 ? 'bg-red-600' : 'bg-green-600'}`}>
            </div>
        </div>
    );
};
export default ProgressBar