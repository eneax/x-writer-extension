chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "inject") {
    const { content } = request;
    console.clear();
    console.log("=====");
    console.log(content);
    console.log("=====");

    if (!content) {
      sendResponse({ status: "failed" });
    }

    sendResponse({ status: "success" });
  }
});
