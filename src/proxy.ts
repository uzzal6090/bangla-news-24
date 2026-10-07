
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  // User is not logged in → redirect to sign-in
  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // User is logged in → allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/news/:path*"],
};

