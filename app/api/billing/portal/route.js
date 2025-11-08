// app/api/billing/portal/route.js
import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ url: "/account" }); }
