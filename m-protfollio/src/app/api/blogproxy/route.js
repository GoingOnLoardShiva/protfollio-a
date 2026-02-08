// portfolio project: api/blogproxy/route.js
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; 

export async function GET() {
  const apiKey = "ren_555_snjj_A08";
  const targetUrl = "https://webnews-psi.vercel.app/api/sharedapi";

  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Accept": "application/json",
      },
      cache: 'no-store' // Critical: Forces fresh data on every request
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Remote API returned ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Connection to Blog Failed" }, { status: 500 });
  }
}