import type { CSSProperties } from "react";
import markUrl from "@app/assets/brand/modern-logo/gsi-pdf.png";
import "@app/ui/Logo.css";

/** iconOnly = mark; textOnly = "GSI-PDF" wordmark; iconAndText = both. */
export type LogoVariant = "iconOnly" | "iconAndText" | "textOnly";

interface LogoProps {
  variant?: LogoVariant;
  /** Layout for iconAndText: mark left of text, or stacked above it. */
  orientation?: "horizontal" | "vertical";
  /** Height of the mark (CSS length). */
  iconHeight?: string;
  /** Height of the wordmark (CSS length). */
  textHeight?: string;
  /** Gap between mark and wordmark. */
  gap?: string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
}

/**
 * Desktop brand lockup: the GSI mark plus a plain-text "GSI-PDF" wordmark.
 * Shadows the core lockup (GSI-PDF SVG mark + wordmark) — same props so
 * every consumer (sidebar header, landing, login) works unchanged.
 */
export function Logo({
  variant = "iconAndText",
  orientation = "horizontal",
  iconHeight = "1.75rem",
  textHeight = "1rem",
  gap = "0.5rem",
  className,
  style,
  alt = "GSI-PDF",
}: LogoProps) {
  const showIcon = variant === "iconOnly" || variant === "iconAndText";
  const showText = variant === "textOnly" || variant === "iconAndText";

  const cls = [
    "sui-logo",
    orientation === "vertical" ? "sui-logo--vertical" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const layoutStyle: CSSProperties = {
    display: orientation === "vertical" ? "flex" : "inline-flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    alignItems: "center",
    gap,
  };

  return (
    <span className={cls} style={{ ...layoutStyle, ...style }}>
      {showIcon && (
        <img
          className="sui-logo__mark"
          src={markUrl}
          alt={showText ? "" : alt}
          aria-hidden={showText ? true : undefined}
          style={{ height: iconHeight }}
        />
      )}
      {showText && (
        <span
          className="sui-logo__wordmark"
          aria-label={alt}
          style={{
            height: textHeight,
            lineHeight: textHeight,
            fontSize: `calc(${textHeight} * 0.72)`,
            fontWeight: 700,
            letterSpacing: "0.01em",
            color: "var(--c-text)",
            whiteSpace: "nowrap",
          }}
        >
          GSI-PDF
        </span>
      )}
    </span>
  );
}
