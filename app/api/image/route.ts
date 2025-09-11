import { NextRequest } from 'next/server';

const ALLOWLIST = new Set([
  'drive.google.com',
  'lh3.googleusercontent.com',
]);

// Optional: run on Edge for faster streaming
export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id'); // Google Drive file id
  const srcParam = url.searchParams.get('src'); // optional full URL

  // Build source URL
  const src = id
    ? `https://drive.google.com/uc?export=view&id=${id}`
    : srcParam;

  if (!src) {
    return new Response('Missing src or id', { status: 400 });
  }

  // Simple host allowlist (avoid open proxy)
  try {
    const host = new URL(src).hostname;
    if (!ALLOWLIST.has(host)) {
      return new Response('Host not allowed', { status: 403 });
    }
  } catch {
    return new Response('Invalid src URL', { status: 400 });
  }

  // Fetch WITHOUT cookies/credentials
  const upstream = await fetch(src, {
    method: 'GET',
    cache: 'no-store', // change to 'force-cache' with Cache-Control if you want
    redirect: 'follow',
  });

  if (!upstream.ok) {
    return new Response('Upstream error', { status: 502 });
  }

  const contentType = upstream.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) {
    // Drive may return HTML if file isn’t public
    return new Response('Not an image (is the file public?)', { status: 415 });
  }

  // Stream the bytes through with safe headers
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      // Good defaults; tweak if you want CDN caching
      // 'Cache-Control': 'public, max-age=86400, immutable',
      'Cross-Origin-Resource-Policy': 'same-origin',
    },
  });
}
