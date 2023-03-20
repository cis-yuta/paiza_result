function copyTable() {
  const table = document.querySelector('#resultsTable');
  const range = document.createRange();
  range.selectNode(table);

  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}

document.getElementById('generateTable').addEventListener('click', () => {
  const button = document.getElementById('generateTable');
  
  if (button.textContent === 'Generate Table') {
    chrome.runtime.sendMessage({ message: 'fetch_results_data' }, response => {
      if (response) {
        const tableBody = document.querySelector('#resultsTable tbody');

        response.forEach(result => {
          // 提出日フォーマット変更
          const submissionDateFormat = result.submissionDate.replace(/(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})/, '$1/$2/$3 $4:$5');

          // 時間フォーマット変更
          const timeFormat = result.time.replace(/(\d+)分(\d+)秒/, (match, p1, p2) => {
            const hours = Math.floor(+p1 / 60);
            const minutes = +p1 % 60;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${p2.padStart(2, '0')}`;
          });

          // スコアフォーマット変更
          const scoreFormat = result.score.replace(/(\d+)点/, '$1');

          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${submissionDateFormat}</td>
            <td>${result.language}</td>
            <td>${result.problemId}</td>
            <td>${result.problemTitle}</td>
            <td>${timeFormat}</td>
            <td>${scoreFormat}</td>
          `;
          tableBody.appendChild(row);
        });

        // ボタンのテキストを "Copy" に変更
        button.textContent = 'Copy';
      } else {
        console.error('Error: No response received from content_script.js');
      }
    });
  } else if (button.textContent === 'Copy') {
    // テーブルをコピーする処理
    copyTable();
  }
});

