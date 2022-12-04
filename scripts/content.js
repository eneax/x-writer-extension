const insert = (content) => {
  // Find Calmly editor input section
  const elements = document.getElementsByClassName("droid");

  if (elements.length === 0) return;

  const element = elements[0];

  const pToRemove = element.childNodes[0];
  pToRemove.remove();

  const splitContent = content.split("\n");

  splitContent.forEach((content) => {
    const p = document.createElement("p");

    if (content === "") {
      const br = document.createElement("br");
      p.appendChild(br);
    } else {
      p.textContent = content;
    }

    element.appendChild(p);
  });

  return true;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "inject") {
    const { content } = request;

    const result = insert(content);

    if (!result) {
      sendResponse({ status: "failed" });
    }

    sendResponse({ status: "success" });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "inject") {
    const { content } = request;

    console.log(content);

    sendResponse({ status: "success" });
  }
});
