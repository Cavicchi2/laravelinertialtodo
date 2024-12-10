import React from 'react';

const ToDoListPreview = ({ entity, onClickFn }) => {
    return (
        <div
            className="border p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => onClickFn(entity)}
        >
            <h4 className="text-sm text-center text-nowrap font-semibold">{entity.name}</h4>
        </div>
    );
};

export default ToDoListPreview;
