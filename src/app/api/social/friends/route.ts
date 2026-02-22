import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    try {
        const { action, sender, receiver } = await req.json();

        if (action === 'request') {
            const { error } = await (supabase as any)
                .from('friend_requests')
                .upsert([{ sender, receiver, status: 'pending' }], { onConflict: 'sender,receiver' });

            if (error) throw error;
            return NextResponse.json({ message: "Request sent" });
        }

        if (action === 'accept') {
            // 1. Add to friendships (Two entries for easier lookup or one entry?) 
            // Better to have one entry and search for user1 OR user2, but to keep it simple: 
            const { error: friendError } = await supabase
                .from('friendships')
                .upsert([
                    { user1: sender, user2: receiver },
                    { user1: receiver, user2: sender }
                ], { onConflict: 'user1,user2' });

            if (friendError) throw friendError;

            // 2. Remove from requests
            const { error: reqError } = await supabase
                .from('friend_requests')
                .delete()
                .match({ sender, receiver });

            if (reqError) throw reqError;

            return NextResponse.json({ message: "Accepted" });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (err: any) {
        console.error("Friends API error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    if (!supabase) return NextResponse.json({ friends: [], incoming: [] });
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) return NextResponse.json({ error: "Username required" }, { status: 400 });

        // Get friends
        const { data: friendsData, error: friendsError } = await supabase
            .from('friendships')
            .select('user2, users!friendships_user2_fkey(*)')
            .eq('user1', username);

        if (friendsError) throw friendsError;

        // Get incoming requests
        const { data: requestsData, error: requestsError } = await supabase
            .from('friend_requests')
            .select('sender')
            .eq('receiver', username)
            .eq('status', 'pending');

        if (requestsError) throw requestsError;

        return NextResponse.json({
            friends: friendsData.map((f: any) => f.users),
            incoming: requestsData.map((r: any) => r.sender)
        });
    } catch (err: any) {
        console.error("Friends fetch error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
