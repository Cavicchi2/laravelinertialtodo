import React, { useEffect, useState } from 'react';
import ToDoListPreview from './ToDoListPreview';
import ToDoListFull from './ToDoListFull';
import Modal from './Modal';

// Main grid component
const ToDoListGroup = ({ name, groupId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [currentEntityKey, setCurrentEntityKey] = useState('');
    const [lists, setLists] = useState([]); // Renamed for clarity

    useEffect(() => {
        // Fetch lists for the current group
        const fetchLists = async () => {
            try {
                const response = await fetch(`/to-do-lists?group_id=${groupId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLists(data.lists); // Ensure this matches the returned data structure
                } else {
                    throw new Error('Failed to fetch lists');
                }
            } catch (error) {
                alert('Error fetching lists');
            }
        };

        fetchLists();
    }, [groupId]); // Re-run if groupId changes

    const handleAddList = async () => {
        const name = prompt('Enter a name for the new List:');
        if (!name) {
            return;
        }

        try {
            const response = await fetch('/to-do-lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({name, group_id: groupId}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            alert(data.message);
            setLists((prevLists) => [...prevLists, data.lists]); // Update state with the new list

        } catch (e) {
            alert('Failed to create List');
            console.log(e);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenModal = (entity) => {
        setCurrentEntityKey(entity);
        setModalOpen(true);
    };

    return (
        <div>
            <div className="flex flex-row flex-wrap gap-8">
                <h3 className="text-lg font-bold flex-grow-0 flex-shrink-0 self-center">{name}</h3>
                <button
                    onClick={handleAddList}
                    className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-200 flex-end col-span-1 flex-grow-0 flex-shrink-0 fit-content"
                >
                    New List
                </button>
                <div className="todo-grid grid grid-cols-4 gap-8 flex-shrink-0 flex-grow-0 basis-full">
                    {lists.map((entity) => (
                        <ToDoListPreview
                            key={entity.id}
                            entity={entity}
                            onClickFn={() => handleOpenModal(entity)} // Pass the entity's ID
                        />
                    ))}
                </div>
            </div>

            {modalOpen && (
                <Modal show={modalOpen} onClose={handleCloseModal}>
                    {currentEntityKey ? (
                        <ToDoListFull data={currentEntityKey} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default ToDoListGroup;
