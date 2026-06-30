export async function POST (request:Request){
    const body = await request.json();

    console.log("Recieved data:", body);

    return Response.json({
        message: "User recieved successfully!",
        user: body,
    });
}