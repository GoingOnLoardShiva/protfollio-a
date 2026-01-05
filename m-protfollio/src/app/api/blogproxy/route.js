
import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = "ren_555_snjj_A08";
    try {
        const res = await fetch(
            "https://webnews-psi.vercel.app/api/sharedapi",
            {
                headers: {
                    "x-api-key": apiKey,
                },
                next: { revalidate: 600 }, // cache 10 minutes
            }
        );

        if (!res.ok) {
            throw new Error("Blog API failed");
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error("Proxy error:", err);
        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}
