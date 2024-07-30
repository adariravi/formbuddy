document.getElementById('captureButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: captureFormData
    });
  });
});

document.getElementById('copyButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.runtime.sendMessage({action: "getFormData"}, response => {
      if (response.data) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: populateFormData,
          args: [response.data]
        });
      }
    });
  });
});
