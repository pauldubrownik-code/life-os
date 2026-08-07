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

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const oauth2 = getOAuth2Client();
    const { tokens } = await oauth2.getToken(code);
    
    // Store tokens
    const dir = path.dirname(TOKEN_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

    // Also expose refresh token for Render env var
    console.log("=== GOOGLE TOKENS ===");
    console.log(`Refresh Token: ${tokens.refresh_token || "N/A (only on first auth)"}`);
    console.log("=====================");

    // Redirect to dashboard with success
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/?calendar=connected`
    );
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/?calendar=error`
    );
  }
}
