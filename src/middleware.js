import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("accessToken")?.value;

  const isAuthenticated = !!authToken;

  const authPaths = ["/login", "/signup"];
  const isAuthRoute = authPaths.some((path) => pathname === path);

  const protectedRoutes = ["/my-gallery", "/home/[id]"];
  const isProtectedRoute = protectedRoutes.some((route) => {
    if (route.includes("[") && route.includes("]")) {
      let regexPatternString = route
        .replace(/\[\.\.\..*?\]/g, "(.*)")
        .replace(/\[.*?\]/g, "([^/]+)");

      const regex = new RegExp("^" + regexPatternString);
      return regex.test(pathname);
    } else {
      return pathname.startsWith(route);
    }
  });

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
