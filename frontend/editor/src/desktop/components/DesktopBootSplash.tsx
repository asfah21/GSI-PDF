interface DesktopBootSplashProps {
  status?: string;
}

/**
 * Instant first-frame UI for the desktop boot path.
 *
 * Rendered while AppProviders resolves connection mode / auth state. The
 * previous branch rendered an empty div here, so a slow invoke (cold
 * WebView2, locked store, backend still starting) left the undecorated
 * window visibly blank/black with no feedback. This splash paints
 * immediately, is theme-aware via the pre-paint <html> attributes, and
 * carries no backend/auth dependencies of its own.
 */
export function DesktopBootSplash({ status }: DesktopBootSplashProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        minHeight: "100vh",
        backgroundColor: "var(--c-bg)",
        color: "var(--c-text)",
      }}
    >
      <img
        src="modern-logo/logo192.png"
        alt=""
        width={72}
        height={72}
        draggable={false}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <div style={{ fontSize: 18, fontWeight: 600 }}>GSI-PDF</div>
      <div
        aria-hidden="true"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "3px solid var(--c-border)",
          borderTopColor: "var(--c-accent-text)",
          animation: "gsi-boot-spin 0.9s linear infinite",
        }}
      />
      <style>
        {"@keyframes gsi-boot-spin { to { transform: rotate(360deg); } }"}
      </style>
      <div style={{ fontSize: 13, opacity: 0.75 }}>
        {status || "Menyiapkan GSI-PDF…"}
      </div>
    </div>
  );
}

export default DesktopBootSplash;
