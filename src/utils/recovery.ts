/**
 * Utility functions for app state recovery and cache clearing in case of runtime crashes.
 */

export function clearBrowserCacheAndRecover() {
  console.warn("Recovering application from crash: clearing storage and caches...");

  try {
    // 1. Clear Web Storage
    localStorage.clear();
    sessionStorage.clear();

    // 2. Clear service workers if any are active
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    // 3. Clear Cache Storage API if supported
    if ("caches" in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => {
          caches.delete(key);
        });
      });
    }

    // 4. Force reload and redirect to the safe main home page
    // Using simple replacement to avoid history stack loops
    window.location.replace("/home");
  } catch (error) {
    console.error("Failed to execute automatic cache reset:", error);
    // Fallback redirect
    window.location.href = "/home";
  }
}

/**
 * Tracks the frequency of crashes to prevent redirect loops.
 * Returns true if a recovery reload was triggered.
 */
export function autoRecoverIfCrashingRepeatedly(): boolean {
  try {
    const crashKey = "app_crash_count";
    const lastCrashTimeKey = "app_last_crash_time";
    
    const now = Date.now();
    const lastCrashTime = parseInt(localStorage.getItem(lastCrashTimeKey) || "0", 10);
    let crashCount = parseInt(localStorage.getItem(crashKey) || "0", 10);

    // If the last crash was more than 15 seconds ago, reset the count
    if (now - lastCrashTime > 15000) {
      crashCount = 1;
    } else {
      crashCount += 1;
    }

    localStorage.setItem(crashKey, crashCount.toString());
    localStorage.setItem(lastCrashTimeKey, now.toString());

    // If we crashed more than 2 times within 15 seconds, trigger full storage clear and recover
    if (crashCount >= 2) {
      console.error("Multiple successive crashes detected. Triggering deep recovery...");
      clearBrowserCacheAndRecover();
      return true;
    }
  } catch (e) {
    console.error("Failed to track crash stats:", e);
  }
  return false;
}
