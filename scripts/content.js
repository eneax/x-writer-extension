chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "inject") {
    const { content } = request;
    console.log(content);

    if (!content) {
      sendResponse({ status: "failed" });
    }

    sendResponse({ status: "success" });
  }
});
