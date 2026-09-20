import { useEffect, useRef, useState } from "react";
import { connectionModeService } from "@app/services/connectionModeService";
import { authService } from "@app/services/authService";

const FIRST_LAUNCH_CHECK_TIMEOUT_MS = 5000;

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}
export function useFirstLaunchCheck(): {
  isFirstLaunch: boolean;
  setupComplete: boolean;
} {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const setupCheckCompleteRef = useRef(false);

  // Check if this is first launch.
  // Never blocks the boot splash: every invoke is time-boxed so a cold
  // WebView2 / locked store still resolves to "not first launch, proceed".
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const firstLaunch = await withTimeout(
          connectionModeService.isFirstLaunch(),
          FIRST_LAUNCH_CHECK_TIMEOUT_MS,
          "isFirstLaunch",
        );
        setIsFirstLaunch(firstLaunch);

        if (!firstLaunch) {
          // Not first launch - initialize auth state
          await withTimeout(
            authService.initializeAuthState(),
            FIRST_LAUNCH_CHECK_TIMEOUT_MS,
            "initializeAuthState",
          );
          setSetupComplete(true);
        }

        setupCheckCompleteRef.current = true;
      } catch (error) {
        console.error("Failed to check first launch:", error);
        // On error, assume not first launch and proceed
        setIsFirstLaunch(false);
        setSetupComplete(true);
        setupCheckCompleteRef.current = true;
      }
    };

    if (!setupCheckCompleteRef.current) {
      checkFirstLaunch();
    }
  }, []);

  return { isFirstLaunch, setupComplete };
}
