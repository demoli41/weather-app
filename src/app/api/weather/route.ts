
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  if (!latitude || !longitude) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}