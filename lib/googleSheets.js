// lib/googleSheets.js
import { google } from "googleapis";

// We'll reuse a single Sheets client across requests
let sheetsClientPromise = null;

export async function getSheetsClient() {
  if (!sheetsClientPromise) {
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();

    sheetsClientPromise = google.sheets({
      version: "v4",
      auth: authClient,
    });
  }

  return sheetsClientPromise;
}
