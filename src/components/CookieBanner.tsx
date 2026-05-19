import { createSessionId } from "@/analytics/analytics";
import { useCallback, useEffect, useRef, useState } from "react";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};
const CONSENT_KEY = "afaq_cookie_consent";
type BannerView = "banner" | "modal" | "hidden";


function createVisitorId(): string {
  const existing = getCookie("afaq_visitor_id");

  if (existing) return existing;

  const id = crypto.randomUUID();
  setCookie("afaq_visitor_id", id, 365);

  return id;
}

function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(state: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {}
}


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

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}


function CookieIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C8A84B"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="9" r="1" fill="#C8A84B" stroke="none" />
      <circle cx="15" cy="8" r="1" fill="#C8A84B" stroke="none" />
      <circle cx="8" cy="14" r="1" fill="#C8A84B" stroke="none" />
      <circle cx="14" cy="14.5" r="1" fill="#C8A84B" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A6B7C"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}


interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  id: string;
  label: string;
}

function Toggle({ checked, disabled, onChange, id, label }: ToggleProps) {
  return (
    <label
      htmlFor={id}
      style={{
        position: "relative",
        display: "inline-block",
        width: 40,
        height: 22,
        cursor: disabled ? "not-allowed" : "pointer",
        flexShrink: 0,
      }}
      aria-label={label}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ opacity: 0, width: 0, height: 0, position: "absolute" }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 11,
          background: disabled ? "#C8A84B" : checked ? "#1A6B7C" : "#D6E0EC",
          transition: "background 0.2s",
          opacity: disabled ? 0.85 : 1,
        }}
      >
        <span
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            top: 3,
            left: 3,
            background: "#fff",
            borderRadius: "50%",
            transition: "transform 0.2s",
            transform:
              checked || disabled ? "translateX(18px)" : "translateX(0)",
          }}
        />
      </span>
    </label>
  );
}


interface ModalProps {
  prefs: Omit<ConsentState, "necessary">;
  onSave: (prefs: Omit<ConsentState, "necessary">) => void;
  onAcceptAll: () => void;
  onClose: () => void;
}

function PreferencesModal({ prefs, onSave, onAcceptAll, onClose }: ModalProps) {
  const [local, setLocal] = useState(prefs);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };



  const rows: Array<{
    key: keyof typeof local;
    label: string;
    desc: string;
    disabled?: boolean;
  }> = [
    {
      key: "analytics",
      label: "Analytics",
      desc: "Helps us understand how visitors interact with our platform.",
    },
    {
      key: "marketing",
      label: "Marketing",
      desc: "Used to deliver relevant content and cooperative announcements.",
    },
  ];

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10001,
        padding: "1rem",
        animation: "afaqFadeIn 0.2s ease both",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          width: "100%",
          maxWidth: 460,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(13,43,78,0.22)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            background: "#1A535C",
            padding: "1.1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2
            id="modal-title"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "0.01em",
              margin: 0,
            }}
          >
            Manage Cookie Preferences
          </h2>
          <button
            onClick={onClose}
            aria-label="Close preferences"
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Necessary row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
            padding: "0.85rem 1.25rem",
            borderBottom: "0.5px solid #EEF1F6",
          }}
        >
          <div>
            <div
              style={{ fontSize: 13, fontWeight: 600, color: "#1A535C" }}
            >
              Necessary
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: "#7A8FA6",
                lineHeight: 1.5,
                marginTop: 2,
              }}
            >
              Required for the platform to function. Cannot be disabled.
            </div>
          </div>
          <span
            style={{
              fontSize: 10.5,
              background: "rgba(200,168,75,0.12)",
              color: "#8A6C20",
              border: "1px solid rgba(200,168,75,0.3)",
              borderRadius: 5,
              padding: "2px 7px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              alignSelf: "center",
            }}
          >
            Always on
          </span>
        </div>

        {/* Optional rows */}
        {rows.map((row, idx) => (
          <div
            key={row.key}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "0.85rem 1.25rem",
              borderBottom:
                idx < rows.length - 1 ? "0.5px solid #EEF1F6" : "none",
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1A535C" }}>
                {row.label}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: "#7A8FA6",
                  lineHeight: 1.5,
                  marginTop: 2,
                }}
              >
                {row.desc}
              </div>
            </div>
            <Toggle
              id={`toggle-${row.key}`}
              label={`${row.label} cookies`}
              checked={local[row.key]}
              onChange={(val) => setLocal((s) => ({ ...s, [row.key]: val }))}
            />
          </div>
        ))}

        {/* Footer */}
        <div
          style={{
            padding: "0.85rem 1.25rem",
            background: "#F4F7FA",
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => onSave(local)}
            style={{
              height: 34,
              padding: "0 1rem",
              borderRadius: 7,
              fontSize: 12.5,
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              background: "#1A6B7C",
              color: "#fff",
              fontFamily: "inherit",
            }}
          >
            Save preferences
          </button>
          <button
            onClick={onAcceptAll}
            style={{
              height: 34,
              padding: "0 1rem",
              borderRadius: 7,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              background: "#C8A84B",
              color: "#1A535C",
              fontFamily: "inherit",
            }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Banner ──────────────────────────────────────────────────────────────

export default function CookieBanner() {
  const [view, setView] = useState<BannerView>("hidden");
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState<Omit<ConsentState, "necessary">>({
    analytics: true,
    marketing: false,
  });

  // On mount: check if consent already given
  useEffect(() => {
    const existing = loadConsent();
    if (!existing) {
      setView("banner");
    }
  }, []);

  // Re-open preferences via CustomEvent from footer link
  useEffect(() => {
    const handler = () => {
      setSaved(false);
      setPrefs(
        loadConsent() ?? { analytics: true, marketing: false }
      );
      setView("banner");
    };
    window.addEventListener("afaq:open-cookie-prefs", handler);
    return () => window.removeEventListener("afaq:open-cookie-prefs", handler);
  }, []);

const applyConsent = useCallback((state: ConsentState) => {
  saveConsent(state);

const hasTracking = state.analytics;
  if (hasTracking) {
    const visitorId = createVisitorId();   
      const sessionId = createSessionId();
    window.dispatchEvent(
      new CustomEvent("afaq:consent-changed", {
        detail: {
          state,
          visitorId,
          sessionId,
        },
      })
    );
  } else {
    // revoke tracking
    document.cookie = "afaq_visitor_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.removeItem("sessionId");

    window.dispatchEvent(
      new CustomEvent("afaq:consent-changed", {
        detail: { state },
      })
    );
  }
}, []);

 const acceptAll = useCallback(() => {
  const state: ConsentState = {
    necessary: true,
    analytics: true,
    marketing: true,
  };

  setPrefs({ analytics: true, marketing: true });
  applyConsent(state);
  setView("hidden");
}, [applyConsent]);

 const rejectAll = useCallback(() => {
  const state: ConsentState = {
    necessary: true,
    analytics: false,
    marketing: false,
  };

  setPrefs({ analytics: false, marketing: false });
  applyConsent(state);
  setView("hidden");
}, [applyConsent]);

  const saveCustom = useCallback(
  (p: Omit<ConsentState, "necessary">) => {
    const state: ConsentState = { necessary: true, ...p };

    setPrefs(p);
    applyConsent(state);
    setView("hidden");
  },
  [applyConsent]
);
  if (view === "hidden") return null;

  return (
    <>
      <style>{`
        @keyframes afaqSlideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes afaqFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Banner */}
      <div
        role="region"
        aria-label="Cookie consent"
       style={{
  position: "fixed",
  bottom: 16,
  left: 16,
  right: 16,
  width: "auto",
  maxWidth: 800,
  margin: "0 auto",
  zIndex: 10000,
  animation: "afaqSlideUp 0.5s cubic-bezier(.22,.68,0,.99) both",
  background: "#1A535C",
  borderRadius: 14,
  border: "1px solid rgba(200,168,75,0.3)",
  boxShadow: "0 4px 40px rgba(13,43,78,0.35)",
  overflow: "hidden",
}}
      >
        {/* Gold accent bar */}
        <div
          style={{
            height: 3,
            background:
              "linear-gradient(90deg, #C8A84B 0%, #E8D080 50%, #C8A84B 100%)",
          }}
        />

        {!saved ? (
          <div style={{ padding: "1.25rem 1.5rem" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "0.55rem",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  background: "rgba(200,168,75,0.15)",
                  borderRadius: 8,
                  border: "1px solid rgba(200,168,75,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CookieIcon />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#C8A84B",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Cookie Preferences
              </span>
            </div>

            {/* Message */}
            <p
              style={{
                fontSize: 13.5,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.6,
                marginBottom: "1.1rem",
                maxWidth: 580,
              }}
            >
              We use cookies to improve your experience, analyze traffic, and
              personalize content. You can manage your preferences at any time.{" "}
              <a
                href="/privacy"
                style={{
                  color: "#C8A84B",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                Privacy Policy
              </a>
            </p>

            {/* Actions */}
           <div
  style={{
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  }}
>
              <button
                onClick={acceptAll}
                aria-label="Accept all cookies"
                style={{
                  height: 38,
                  padding: "0 1.3rem",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  background: "#C8A84B",
                  color: "#1A535C",
                  fontFamily: "inherit",
                  letterSpacing: "0.01em",
                }}
              >
                Accept All
              </button>
              <button
                onClick={() => setView("modal")}
                aria-label="Customize cookie preferences"
                style={{
                  height: 38,
                  padding: "0 1.3rem",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.28)",
                  fontFamily: "inherit",
                  letterSpacing: "0.01em",
                }}
              >
                Customize
              </button>
              <button
                onClick={rejectAll}
                aria-label="Reject all optional cookies"
                style={{
                  height: 38,
                  padding: "0 0.6rem",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 400,
                  cursor: "pointer",
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  border: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                  fontFamily: "inherit",
                }}
              >
                Reject All
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(26,107,124,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckIcon />
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                margin: 0,
                textAlign: "center",
              }}
            >
              Preferences saved. Thank you.
            </p>
          </div>
        )}
      </div>

      {/* Preferences modal */}
      {view === "modal" && (
        <PreferencesModal
          prefs={prefs}
          onSave={saveCustom}
          onAcceptAll={acceptAll}
          onClose={() => setView("banner")}
        />
      )}
    </>
  );
}