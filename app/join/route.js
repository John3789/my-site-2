// app/join/route.js
import { NextResponse } from "next/server";

export function GET(req) {
  const url = new URL(req.url);
  url.pathname = "/membership";
  return NextResponse.redirect(url, { status: 308 });
}
