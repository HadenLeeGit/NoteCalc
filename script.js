// script.js
document.getElementById('calculatorInput').addEventListener('input', function() {
    updateResults();
    autoResize(this);
});

function updateResults() {
    const input = document.getElementById('calculatorInput').value;
    const lines = input.split('\n');
    let resultsHtml = '';
    let maxLength = 0;

    lines.forEach(line => {
        try {
            if (line.trim()) {
                const processedLine = line.replace(/(\d+)%/g, '($1/100)');
                const result = new Function('return ' + processedLine)();
                const resultStr = result.toString();
                resultsHtml += `${resultStr}\n`;
                if (resultStr.length > maxLength) {
                    maxLength = resultStr.length;
                }
            } else {
                resultsHtml += '\n';
            }
        } catch (e) {
            resultsHtml += `Error\n`;
        }
    });

    document.getElementById('results').innerText = resultsHtml;
    adjustResultWidth(maxLength);
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function adjustResultWidth(maxLength) {
    const resultsDiv = document.getElementById('results');
    if (maxLength > 18) {
        resultsDiv.style.width = '40%';
    } else {
        resultsDiv.style.width = '30%';
    }
}

// Import TXT file
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('calculatorInput').value = e.target.result;
            updateResults();
            autoResize(document.getElementById('calculatorInput'));
        };
        reader.readAsText(file);
    }
});

// Export to TXT file
document.getElementById('exportButton').addEventListener('click', function() {
    const text = document.getElementById('calculatorInput').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculations.txt';
    a.click();
    URL.revokeObjectURL(url);
});
