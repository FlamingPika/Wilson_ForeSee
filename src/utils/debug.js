export {infoLog, errorLog};

function infoLog(msg) {
  console.log(`[LOG][${new Date()}]`, arguments);
}

function errorLog(msg) {
  console.log(`[ERROR][${new Date()}]`, arguments);
}
