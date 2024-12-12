import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ToDoListGroup from "@/Components/ToDoListGroup.jsx";

export default function Dashboard() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Fetch groups for the authenticated user
        const fetchGroups = async () => {
            try {
                const response = await fetch('/to-do-groups', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setGroups(data.groups); // Set the groups to state
                } else {
                    throw new Error('Failed to fetch groups');
                }
            } catch (error) {
                alert('Error fetching groups');
            }
        };

        fetchGroups();
    }, []); // Empty dependency array to run only once when the component mounts

    const handleAddGroup = async () => {
        const name = prompt('Enter a name for the new Group:');
        if (!name) {
            return;
        }

        try {
            const response = await fetch('/to-do-groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            alert(data.message);
            setGroups((prevGroups) => [...prevGroups, data.groups]); // Add the new group to state
        } catch (error) {
            alert('Failed to create Group');
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
                                onClick={handleAddGroup}
                                className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-end"
                            >
                                Add new Group
                            </button>
                            {groups?.map((group) => (
                                <div key={group.id} className="mb-6">
                                    <ToDoListGroup name={group.name} groupId={group.id} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
