import React from 'react';

const ToDoListItem = ({ item, onToggle }) => {
    const handleToggle = () => {
        onToggle(item.id, !item.done);
    };

    return (
        <li className="mb-1 flex items-center">
            <button
                onClick={handleToggle}
                className={`mr-2 px-2 py-1 rounded ${
                    item.done ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
                }`}
            >
                {item.done ? 'Undo' : 'Done'}
            </button>
            <span className={item.done ? 'line-through text-gray-500' : ''}>
                {item.title}
            </span>
        </li>
    );
};

export default ToDoListItem;
