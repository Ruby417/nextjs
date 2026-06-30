export default async function Page(){
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    const users = await res.json();

    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {users.map((user:any) => (
                <div key={user.id}
                className="border rounded-lg p-4 mb-4 shadow">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                </div>
            ))}
        </div>
    );
}