import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  console.log({ tag });
  revalidateTag(tag ?? '');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
