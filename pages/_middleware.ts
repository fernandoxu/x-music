import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const signedPages = ['/', '/playlist', '/library'];

export default function middleware(req: NextRequest) {
  if (signedPages.find((p) => p === req.nextUrl.pathname)) {
    const { X_ACCESS_TOKEN: token } = req.cookies;

    if (!token) return NextResponse.rewrite(new URL('/signin', req.url));
  }
}
