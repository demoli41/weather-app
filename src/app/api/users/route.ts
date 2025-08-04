import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const results = searchParams.get('results') || '9';

  try {
    const response = await fetch(`https://randomuser.me/api/?results=${results}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}