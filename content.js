// content.js

// Capture form data
function captureFormData() {
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value
    };
    chrome.runtime.sendMessage({ action: "saveFormData", data: formData }, response => {
      console.log('Data saved:', response);
    });
  }
  
  // Fill form data
  function fillFormData() {
    chrome.runtime.sendMessage({ action: "getFormData" }, response => {
      if (response && response.data) {
        document.getElementById('firstName').value = response.data.firstName || '';
        document.getElementById('lastName').value = response.data.lastName || '';
        document.getElementById('email').value = response.data.email || '';
      }
    });
  }
  
  // Add event listeners for buttons
  document.addEventListener('DOMContentLoaded', function() {
    const captureButton = document.querySelector('button[onclick="captureFormData()"]');
    if (captureButton) {
      captureButton.addEventListener('click', captureFormData);
    }
  
    const fillButton = document.querySelector('button[onclick="fillFormData()"]');
    if (fillButton) {
      fillButton.addEventListener('click', fillFormData);
    }
  });
  