import React, { useState } from 'react';
import ToDoListPreview from './ToDoListPreview';
import ToDoListFull from './ToDoListFull';
import Modal from './Modal';

// Main grid component
const ToDoListGrid = ({ entities, mockFetch, name }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [currentEntityKey, setCurrentEntityKey] = useState('');
    const [listData, setListData] = useState(entities);

    const handleOpenModal = async (entity) => {
        setModalOpen(true);
        setCurrentEntityKey(entity.id);

        if (!modalData[entity.id]) {
            try {
                const result = await mockFetch(entity.id);
                setModalData((prev) => ({
                    ...prev,
                    [entity.id]: result,
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAddList = () => {
        const listName = prompt('Enter a name for the new ToDoListGrid:');
        if (listName) {
            const newList = {
                id: listName.length.toString(),
                name: listName,
                description: 'Newly added list.',
                items: [],
            };
            setListData((prevData) => [...prevData, newList]);
        }
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

                    {Object.values(listData).map((entity) => (
                        <ToDoListPreview
                            key={entity.id}
                            entity={entity}
                            onClickFn={handleOpenModal}
                        />
                    ))}
                </div>
                </div>

                {modalOpen && (
                    <Modal show={modalOpen} onClose={handleCloseModal}>
                        {modalData[currentEntityKey] ? (
                            <ToDoListFull data={modalData[currentEntityKey]}/>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </Modal>
                )}
            </div>
            );
            };

            export default ToDoListGrid;
