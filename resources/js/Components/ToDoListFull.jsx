import React, { useEffect, useState } from 'react';
import ToDoListItem from './ToDoItem';

const ToDoListFull = ({ list }) => {
    const [items, setItems] = useState([]);

    // Fetch items when the component is mounted or `list` changes
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const listId = list.id;
                const response = await fetch(`/to-do-items?list_id=${listId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute('content'),
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching items: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                setItems(data.items || []); // Ensure a safe fallback
            } catch (error) {
                alert('Error fetching items');
            }
        };

        if (list?.id) {
            fetchItems();
        }
    }, [list. items]);

    const handleAddItem = async () => {
        const name = prompt('Enter a name for the new Item:');
        if (!name) {
            return;
        }

        try {
            const response = await fetch('/to-do-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute('content'),
                },
                body: JSON.stringify({ title: name, list_id: list.id }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setItems((prevItems) => [...prevItems, data.items]); // Update state with the new item
        } catch (error) {
            alert('Failed to create Item');
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-2">{list?.name}</h2>
            <p className="mb-4">{list?.description}</p>

            <ul className="list-disc pl-4">
                {items.map((item) => (
                    <ToDoListItem
                        key={item.id}
                        item={item}
                        completed={item.completed}
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
