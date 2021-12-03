// eslint-disable-next-line no-console
const consoles = {
  LOG: console.log.bind(console),
  INFO: console.info.bind(console),
  WARN: console.warn.bind(console),
  ERROR: console.error.bind(console),
  DEBUG: console.debug.bind(console),
  TRACE: console.trace.bind(console),
}
function consoleAppender(layout, timezoneOffset) {
  return (loggingEvent) => {
    const { level } = loggingEvent;
    const consoleLog = consoles[level.levelStr]  || consoles.LOG;
    consoleLog(layout(loggingEvent, timezoneOffset));
  };
}

function configure(config, layouts) {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return consoleAppender(layout, config.timezoneOffset);
}

module.exports.configure = configure;
