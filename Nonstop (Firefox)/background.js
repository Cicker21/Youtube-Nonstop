// Escucha eventos cuando se completa la carga de una pestaña
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
    browser.tabs.executeScript(tabId, { file: "content.js" })
      .then(() => console.log("Content script injected into YouTube"))
      .catch(error => console.error("Error Nonstop:", error));
  }
});
