import { NextResponse } from 'next/server';
import { LoginParams } from './param';
import { createSession } from '@/lib/sessionStore';

export async function POST(request: Request) {
    const loginParams: LoginParams = await request.json();

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/loginBuyer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginParams),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Login failed' }, { status: 401 });
    }

    const { userId , token} = await response.json(); 

    const res = NextResponse.json({ token });
    //res.headers.set('Set-Cookie', `sessionId=${sessionId}; Path=/; Secure; HttpOnly; SameSite=Strict`);
    return res;
}