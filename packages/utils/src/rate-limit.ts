/**
 * In-Memory Token Bucket / Sliding Window Rate Limiter for Next.js API Routes
 * Compliant with api-patterns skill guidelines.
 * Sets X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset headers.
 */

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

const trackers = new Map<string, RateLimitTracker>();

// Clean up expired buckets periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, tracker] of trackers.entries()) {
      if (now > tracker.resetTime) {
        trackers.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 60s)
  maxRequests?: number; // Max requests allowed within window (default: 60)
  keyPrefix?: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  headers: Record<string, string>;
}

/**
 * Check if the given identifier (IP or User ID) has exceeded the rate limit
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const windowMs = options.windowMs || 60 * 1000; // 60 seconds default
  const maxRequests = options.maxRequests || 60; // 60 requests/min default
  const keyPrefix = options.keyPrefix || "global";
  const key = `${keyPrefix}:${identifier || "anonymous"}`;

  const now = Date.now();
  let tracker = trackers.get(key);

  if (!tracker || now > tracker.resetTime) {
    tracker = {
      count: 1,
      resetTime: now + windowMs,
    };
    trackers.set(key, tracker);
  } else {
    tracker.count += 1;
  }

  const remaining = Math.max(0, maxRequests - tracker.count);
  const resetSeconds = Math.ceil(tracker.resetTime / 1000);
  const success = tracker.count <= maxRequests;

  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(maxRequests),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(resetSeconds),
  };

  if (!success) {
    headers["Retry-After"] = String(Math.ceil((tracker.resetTime - now) / 1000));
  }

  return {
    success,
    limit: maxRequests,
    remaining,
    reset: resetSeconds,
    headers,
  };
}

/**
 * Middleware helper: Get client identifier (IP address or Auth User ID) from Request
 */
export function getClientIdentifier(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  const userId = req.headers.get("x-user-id");
  if (userId) {
    return `user_${userId}`;
  }
  return "127.0.0.1";
}
