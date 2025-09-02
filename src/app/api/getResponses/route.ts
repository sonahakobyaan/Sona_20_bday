import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";

export async function GET() {
  console.log("Spreadsheet ID:", process.env.GOOGLE_SHEET_ID);
console.log("Range:", process.env.GOOGLE_SHEET_RANGE);
  try {
    const auth = new GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: process.env.GOOGLE_SHEET_RANGE,
    });

    const rows = response.data.values || [];

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Google Sheets error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
