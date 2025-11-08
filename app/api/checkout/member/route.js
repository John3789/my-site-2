// app/api/checkout/member/route.js
import { NextResponse } from "next/server";
export async function GET() { return NextResponse.redirect("/members", { status: 302 }); }
