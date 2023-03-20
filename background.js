chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'fetch_results_data') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'fetch_results_data' }, response => {
        sendResponse(response);
        return true;
      });
    });
  }
  return true;
});

