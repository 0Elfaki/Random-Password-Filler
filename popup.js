const toggleButton = document.getElementById("toggle");
const statusText = document.getElementById("status");

// Load current state
chrome.storage.local.get("enabled", (data) => {
  const isEnabled = data.enabled ?? true;
  updateButtonText(isEnabled);
});

// Toggle state on click
toggleButton.addEventListener("click", () => {
  chrome.storage.local.get("enabled", (data) => {
    const current = data.enabled ?? true;
    const newValue = !current;
    chrome.storage.local.set({ enabled: newValue }, () => {
      updateButtonText(newValue);
      showStatusMessage(
        newValue ? "Extension Enabled ✅" : "Extension Disabled ❌",
        newValue
      );
    });
  });
});

function updateButtonText(enabled) {
  toggleButton.textContent = enabled ? "Disable" : "Enable";
}

function showStatusMessage(message, enabled) {
  statusText.textContent = message;
  statusText.style.opacity = "1";
  statusText.style.color = enabled ? "green" : "red";

  setTimeout(() => {
    statusText.style.opacity = "0";
    statusText.textContent = "";
  }, 3000);
}
