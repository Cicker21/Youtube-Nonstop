// Escucha eventos cuando se completa la carga de una pestaña
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"]
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error Nonstop:", chrome.runtime.lastError);
      } else {
        console.log("Content script injected into YouTube");
      }
    });
  }
});
