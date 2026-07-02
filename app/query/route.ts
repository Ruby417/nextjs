import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  const data = await sql`
    SELECT *
    FROM invoices
    ORDER BY date DESC;
  `;

  return Response.json(data);
}