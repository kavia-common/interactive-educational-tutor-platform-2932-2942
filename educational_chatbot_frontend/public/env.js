(function () {
  // PUBLIC_INTERFACE
  // This file allows injecting environment variables at runtime without rebuilding.
  // The orchestrator should set EDUCHAT_API_BASE to point to the backend gateway.
  window.env = window.env || {};
  // Example (to be overridden during deployment):
  // window.env.EDUCHAT_API_BASE = 'http://localhost:3001';
})();
