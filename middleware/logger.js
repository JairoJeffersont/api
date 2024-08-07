const fs = require('fs');
const path = require('path');

function addLog(baseLogFile, message) {
    const date = new Date().toISOString().split('T')[0];
    const logFile = `${date}_${baseLogFile}`;
    const logPath = path.join(__dirname, '../log', logFile+'.log');
    const logMessage = `${new Date().toISOString()} - ${message}\n`;

    fs.appendFile(logPath, logMessage, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo de log:', err);
        }
    });
}

module.exports = addLog;
