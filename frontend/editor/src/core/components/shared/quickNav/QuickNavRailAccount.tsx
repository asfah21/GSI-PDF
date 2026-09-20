import { useTranslation } from "react-i18next";
import { Icon } from "@app/ui/Icon";
import type { QuickNavIdentity } from "@app/contexts/QuickNavHostContext";
import { RailButton } from "@app/components/shared/quickNav/QuickNavRailBase";
import "@app/components/shared/quickNav/QuickNavRailAccount.css";

export interface QuickNavRailAccountProps {
  onOpen: () => void;
  /** Null until an identity is first resolved, or when explicitly cleared. */
  identity: QuickNavIdentity | null;
  /** Drawn as the current destination while the settings page is open. */
  active?: boolean;
}

/** Settings entry rendered as a gear icon; the avatar is intentionally unused. */
export function QuickNavRailAccount({
  onOpen,
  identity,
  active = false,
}: QuickNavRailAccountProps) {
  const { t } = useTranslation();
  const displayName =
    identity?.displayName ?? t("auth.displayName.user", "User");
  const label = `${displayName} — ${t("quickNav.account", "Account")}`;

  return (
    <div className="quick-nav-rail-account" data-active={active || undefined}>
      <RailButton
        label={label}
        icon={<Icon name="settings" size="1.125rem" />}
        current={active}
        testId="config-button"
        tourId="config-button"
        onClick={onOpen}
      />
    </div>
  );
}
