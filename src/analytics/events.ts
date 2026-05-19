import api from "../api/axios";
import { getSessionId, getVisitorId } from "./analytics";

function hasAnalyticsConsent(): boolean {
  const raw = localStorage.getItem("afaq_cookie_consent");

  if (!raw) return false;

  try {
    return JSON.parse(raw).analytics === true;
  } catch {
    return false;
  }
}

export function trackEvent(
  event: string,
  data: {
    path: string;
    referrer?: string;
    pageId?: string;
    category?: string;
    userAgent?: string; 
  }
) {
  if (!hasAnalyticsConsent()) return;

  if (!data.path || data.path.startsWith("/api")) {
    console.warn("Blocked analytics for:", data.path);
    return;
  }

  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  if (!visitorId || !sessionId) return;

 api.post(
  "/analytics/event",
  {
    event,
    path: data.path,
    referrer: data.referrer,
    pageId: data.pageId,
    category: data.category,   
    userAgent: data.userAgent || navigator.userAgent, 
  },
  {
    headers: {
      "X-Visitor-Id": visitorId,
      "X-Session-Id": sessionId,
    },
  }
);
}