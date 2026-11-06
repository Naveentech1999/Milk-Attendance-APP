/* Supabase Realtime bridge for the Capacitor/PWA app.
 * Existing snapshot persistence remains the source of truth. Remote UPDATE
 * events refresh the local view; local edits continue through the existing
 * debounced upsert path in index.html.
 */
(() => {
  let channel = null;
  let subscribedUserId = null;
  let lastAppliedAt = 0;

  function stop() {
    if (channel && typeof cloud !== "undefined" && cloud.client) {
      cloud.client.removeChannel(channel).catch(() => {});
    }
    channel = null;
    subscribedUserId = null;
  }

  function syncSubscription() {
    if (typeof cloud === "undefined" || !cloud.client) return;
    if (!cloud.user || !cloud.enabled) {
      if (channel) stop();
      return;
    }
    if (channel && subscribedUserId === cloud.user.id) return;
    if (channel) stop();

    const userId = cloud.user.id;
    subscribedUserId = userId;
    channel = cloud.client
      .channel("doodhwala-state-" + userId)
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "milk_app_state",
        filter: "user_id=eq." + userId
      }, (event) => {
        const row = event.new;
        if (!row || row.user_id !== userId || !row.payload ||
            !Array.isArray(row.payload.customers) || !row.payload.days) return;

        const updatedAt = Date.parse(row.updated_at || "") || 0;
        if (updatedAt && updatedAt < lastAppliedAt) return;
        if (updatedAt) lastAppliedAt = updatedAt;

        // Ignore the echo of this device's own upsert to avoid interrupting
        // an in-progress form with a redundant full-screen re-render.
        if (JSON.stringify(row.payload) === JSON.stringify(db)) return;

        db = {
          ...db,
          ...row.payload,
          customers: row.payload.customers,
          days: row.payload.days
        };
        try {
          localStorage.setItem("milkBillingSpecV3", JSON.stringify(db));
        } catch (error) {
          console.warn("Could not cache live Doodhwala update", error);
        }
        renderAfterCloudLoad();
        cloudSay("Live cloud update received · " + new Date().toLocaleTimeString());
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          cloudSay("Cloud sync connected · live updates on");
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          cloudSay("Live updates unavailable. Local changes will still sync when connected.");
        }
      });
  }

  // The original app creates its Supabase client and restores the user during
  // startup. Poll briefly for that existing initialization; no credentials
  // or service-role secrets are introduced by this bridge.
  const poll = window.setInterval(() => {
    try { syncSubscription(); } catch (error) {
      console.warn("Doodhwala live sync setup failed", error);
    }
  }, 1200);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      try { syncSubscription(); } catch (_) {}
    }
  });

  window.addEventListener("pagehide", () => {
    window.clearInterval(poll);
    stop();
  });
})();
