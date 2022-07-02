import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const signedPages = ['/', '/playlist', '/library'];

export default function middleware(req: NextRequest) {
  if (signedPages.find((p) => p === req.nextUrl.pathname)) {
    if (!req.cookies.get('X_ACCESS_TOKEN'))
      return NextResponse.rewrite(new URL('/signin', req.url));
  }
}
