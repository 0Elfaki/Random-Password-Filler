function fillPasswords() {
  const passwordInputs = document.querySelectorAll("input[type='password']");
  passwordInputs.forEach(input => {
    if (!input.value) input.value = generateRandomPassword();
  });
}

// Wait for DOM updates (for React apps)
chrome.storage.local.get("enabled", (data) => {
  if (data.enabled ?? true) {
    // Initial fill
    fillPasswords();

    // Also observe dynamically added inputs
    const observer = new MutationObserver(() => {
      fillPasswords();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
});
