function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
}

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

// ensure visitor identity
export function getVisitorId(): string | null {
  return getCookie("afaq_visitor_id");
}
export function getSessionId(): string | null {
  return sessionStorage.getItem("sessionId");
}

export function createSessionId(): string {
  const existing = sessionStorage.getItem("sessionId");

  if (existing) return existing;

  const session = crypto.randomUUID();
  sessionStorage.setItem("sessionId", session);

  return session;
}


