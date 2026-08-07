import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TOKEN_PATH = path.join(process.cwd(), ".data", "google-tokens.json");

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`
  );
}

function loadTokens() {
  // 1. Try file (first auth after redirect)
  if (fs.existsSync(TOKEN_PATH)) {
    return JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
  }
  // 2. Try env var (persistent after first auth)
  const envTokens = process.env.GOOGLE_REFRESH_TOKEN;
  if (envTokens) {
    return { refresh_token: envTokens };
  }
  return null;
}

export async function GET(req: NextRequest) {
  const tokens = loadTokens();
  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated", needsAuth: true }, { status: 401 });
  }

  try {
    const oauth2 = getOAuth2Client();
    oauth2.setCredentials(tokens);

    // If access token expired, refresh it
    if (tokens.refresh_token && !tokens.access_token) {
      const { credentials } = await oauth2.refreshAccessToken();
      oauth2.setCredentials(credentials);
      // Update stored tokens
      if (fs.existsSync(path.dirname(TOKEN_PATH))) {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify({ ...tokens, ...credentials }, null, 2));
      }
    }

    const calendar = google.calendar({ version: "v3", auth: oauth2 });

    // Get date range from query params or default to current week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const timeMin = req.nextUrl.searchParams.get("timeMin") || startOfWeek.toISOString();
    const timeMax = req.nextUrl.searchParams.get("timeMax") || endOfWeek.toISOString();

    // Fetch from all calendars the user has
    const calendarList = await calendar.calendarList.list();
    const allEvents: any[] = [];

    for (const cal of calendarList.data.items || []) {
      if (!cal.id) continue;
      try {
        const res = await calendar.events.list({
          calendarId: cal.id,
          timeMin,
          timeMax,
          singleEvents: true,
          orderBy: "startTime",
          maxResults: 10,
        });
        for (const ev of res.data.items || []) {
          allEvents.push({
            id: ev.id,
            title: ev.summary,
            start: ev.start?.dateTime || ev.start?.date,
            end: ev.end?.dateTime || ev.end?.date,
            calendar: cal.summaryOverride || cal.summary,
            color: cal.backgroundColor || "#4285F4",
            allDay: !!ev.start?.date,
          });
        }
      } catch (e) {
        // Skip calendars we can't access
        continue;
      }
    }

    // Sort by start time
    allEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    return NextResponse.json({
      events: allEvents,
      weekStart: startOfWeek.toISOString(),
      weekEnd: endOfWeek.toISOString(),
    });
  } catch (err: any) {
    console.error("Calendar fetch error:", err);
    if (err?.response?.status === 401) {
      return NextResponse.json({ error: "Token expired", needsAuth: true }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch calendar" }, { status: 500 });
  }
}
