// app/api/media/[id]/route.js
import { NextResponse } from "next/server";
export async function GET(_req, { params }) {
  const placeholder = "https://file-examples.com/storage/fe9b4a0b6f6b8311f4b1e2b/2017/11/file_example_MP3_700KB.mp3";
  return NextResponse.redirect(placeholder, { status: 302 });
}
