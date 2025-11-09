// app/api/auth/signout/route.js
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("stripe_cust");
  return NextResponse.json({ ok: true });
}
