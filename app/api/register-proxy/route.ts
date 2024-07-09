import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

// Handle POST requests to the proxy
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post('http://54.225.197.41:8000/api/register/', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;
      return NextResponse.json({ message: axiosError.response?.data || 'Internal server error' }, { status: axiosError.response?.status || 500 });
    } else {
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
}