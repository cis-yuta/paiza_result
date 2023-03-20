function extractResultsData() {
  const results = [];
  const resultElements = document.querySelectorAll('.d-mypage-my-results__basicBox');

  resultElements.forEach(resultElement => {
    const titleElement = resultElement.querySelector('.d-mypage-my-results__box-top__title a');
    const problemTitleSource = titleElement.textContent.trim();
    const problemId = problemTitleSource.split(':')[0];
    const problemTitle = problemTitleSource.split(':')[1];
    
    const submissionDateElement = resultElement.querySelector('.d-mypage-my-results__box-top__right');
    const submissionDate = submissionDateElement.textContent.replace('提出日：', '').trim();
    
    const languageElement = resultElement.querySelector('.d-mypage-my-results__box-middle span:nth-child(3)');
    const language = languageElement.textContent.trim();
    
    const timeElement = resultElement.querySelector('.d-mypage-my-results__box-middle span:nth-child(5)');
    const time = timeElement.textContent.trim();
    
    const scoreElement = resultElement.querySelector('.d-mypage-my-results__box-middle span:nth-child(9)');
    const score = scoreElement.textContent.trim();

    results.push({
      problemId,
      problemTitle,
      submissionDate,
      language,
      time,
      score
    });
  });

  return results;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'fetch_results_data') {
    const resultsData = extractResultsData();
    sendResponse(resultsData);
  }
});

