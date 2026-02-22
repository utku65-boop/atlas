import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    try {
        const userData = await req.json();

        if (!userData.username) {
            return NextResponse.json({ error: "Username required" }, { status: 400 });
        }

        const { error } = await (supabase as any)
            .from('users')
            .upsert([{
                username: userData.username,
                name: userData.name || userData.username,
                xp: userData.xp || 0,
                level: userData.level || 1,
                streak: userData.streak || 0,
                status: "online",
                last_active: new Date().toISOString(),
                pomodoro_status: userData.pomodoroStatus || null
            }], { onConflict: 'username' });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Sync error:", err);
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}

export async function GET() {
    if (!supabase) return NextResponse.json({ users: [] });
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) throw error;

        return NextResponse.json({ users: data });
    } catch (err: any) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}
