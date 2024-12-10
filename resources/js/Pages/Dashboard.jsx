import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ToDoListGrid from '@/Components/ToDoListGrid.jsx';

export default function Dashboard() {
    const gridCategoryMock = [
        {
            id: 0,
            name: "Category A",
        }
    ];

    // Initial mock entities - directly hardcoded for testing
    const initialMockData = [
        {
            id: '0',
            name: 'Task A',
            description: 'Complete the first task.',
            items: [
                { id: '101', title: 'Finish writing report' },
                { id: '102', title: 'Submit before 3 PM' },
            ],
        },
        {
            id: '1',
            name: 'Task B',
            description: 'Second task example.',
            items: [
                { id: '201', title: 'Call supplier' },
                { id: '202', title: 'Place order' },
            ],
        },
        {
            id: '2',
            name: 'Meeting Task',
            description: 'Prepare for team meeting.',
            items: [
                { id: '301', title: 'Create presentation slides' },
                { id: '302', title: 'Prepare meeting agenda' },
            ],
        },
        {
            id: '3',
            name: 'Admin Task',
            description: 'Handle administrative tasks.',
            items: [
                { id: '401', title: 'Check emails' },
                { id: '402', title: 'Schedule meeting' },
            ],
        },
    ];

    const [mockData, setMockData] = useState(gridCategoryMock);

    function mockFetch(index) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockData[index]);
            }, 500); // Simulate network delay
        });
    }

    const handleAddGrid = () => {
        const gridName = prompt('Enter a name for the new ToDoListGrid:');
        if (gridName) {
            const newGrid = {
                id: mockData.length.toString(),
                name: gridName,
                description: 'Newly added ToDoListGrid.',
                items: [],
            };
            setMockData((prevData) => [...prevData, newGrid]);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col">
                            <button
                                onClick={handleAddGrid}
                                className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-end"
                            >
                                Add new List category
                            </button>
                            {mockData.map((grid) => (
                                <div key={grid.id} className="mb-6">
                                    <ToDoListGrid name={grid.name} entities={initialMockData} mockFetch={mockFetch}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
        ;
}
