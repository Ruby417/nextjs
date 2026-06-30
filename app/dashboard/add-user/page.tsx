"use client";

import { useState } from 'react';

export default function AddUserPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Add User</h1>

            <div className="mb-4">
                <label>Name</label>
                <input type="text" className="border w-full p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="mb-4">
                <label>Email</label>
                <input type="email" className="border w-full p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={async () => {
                        const response = await fetch("/api/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                email,
                            }),
                        });
                        const data = await response.json();
                        console.log(data);
                        alert("User sent successfully!");
                    }}
                    >
                    Submit
                </button>
                {/* <p className="mt-4">Current Name: {name}</p>
                <p>Current Email: {email}</p> */}
                {/* <button
                    onClick={() => {
                        alert(`Name: ${name}\nEmail: ${email}`);
                    }}
                    >
                    Submit
                </button> */}
        </div>
    );
}