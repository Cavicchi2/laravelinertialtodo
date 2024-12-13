import React, {useState} from 'react';

const ToDoListItem = ({ item}) => {
    const [complete, setComplete] = useState(item.completed);

    const handleToggleItem = async () => {
        const id = item.id;

        try {
            const response = await fetch(`/to-do-items/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute('content'),
                },
                body: JSON.stringify({ done: !complete }),
            });

            if (!response.ok) {
                throw new Error(`Error toggling item: ${response.statusText}`);
            }

            setComplete(!complete);
        } catch (error) {
            alert('Failed to toggle the item status');
            console.error(error);
        }
    };

    return (
        <li className="mb-1 flex items-center">
            <button
                onClick={handleToggleItem}
                className={`mr-2 px-2 py-1 rounded ${
                    complete ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
                }`}
            >
                {complete ? 'Undo' : 'Done'}
            </button>
            <span className={complete ? 'line-through text-gray-500' : ''}>
                {item.title}
            </span>
        </li>
    );
};

export default ToDoListItem;
