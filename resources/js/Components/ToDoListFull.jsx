import React, { useState } from 'react';
import ToDoListItem from './ToDoItem';

const ToDoListFull = ({ data }) => {
    const [items, setItems] = useState(data?.items || []);

    const handleAddItem = () => {
        const newItemTitle = prompt('Enter a new item title:');
        if (newItemTitle) {
            const newItem = { id: items.length + 1, title: newItemTitle, done: false };
            setItems((prevItems) => [...prevItems, newItem]);
        }
    };

    const handleToggleItem = async (id, done) => {
        // Update state locally
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, done } : item
            )
        );

        // Simulate an API call to update the database
        try {
            await fetch(`/api/updateItem/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done }),
            });
        } catch (error) {
            console.error('Failed to update the item:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-2">{data?.name}</h2>
            <p className="mb-4">{data?.description}</p>

            <ul className="list-disc pl-4">
                {items.map((item) => (
                    <ToDoListItem
                        key={item.id}
                        item={item}
                        onToggle={handleToggleItem}
                    />
                ))}
            </ul>

            <button
                onClick={handleAddItem}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Item
            </button>
        </div>
    );
};

export default ToDoListFull;
