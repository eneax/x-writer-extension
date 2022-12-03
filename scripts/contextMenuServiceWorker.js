const getKey = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["openai-key"], (result) => {
      if (result["openai-key"]) {
        const decodedKey = atob(result["openai-key"]);
        resolve(decodedKey);
      }
    });
  });
};

const generate = async (prompt) => {
  const key = await getKey();
  const url = "https://api.openai.com/v1/completions";

  const completionResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1250,
      temperature: 0.7,
    }),
  });

  const completion = await completionResponse.json();
  return completion.choices.pop();
};

const generateCompletionAction = async (info) => {
  try {
    const { selectionText } = info;
    const basePromptPrefix = `
      Write me a detailed table of contents for a blog post with the title below.

      Title:
      `;

    const baseCompletion = await generate(
      `${basePromptPrefix}${selectionText}`
    );

    console.log(baseCompletion.text);
  } catch (error) {
    console.log(error);
  }
};

chrome.contextMenus.create({
  id: "context-run",
  title: "Generate blog post",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(generateCompletionAction);
