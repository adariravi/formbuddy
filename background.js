let formData = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveFormData") {
    formData = request.data;
    console.log('Form data saved:', formData);
    chrome.storage.local.set({ [request.url]: request.formData }, () => {
      console.log('Form data saved:', request.formData);
    });
    sendResponse({status: "success", data: formData});
  } else if (request.action === "getFormData") {
    // Fetch all data from local storage and print it to the console
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        console.log(`Key: ${key}, Value: ${value}`);
      }
    console.log('Form data retrieved:', formData);
    sendResponse({data: formData});
  }
  return true;
});
