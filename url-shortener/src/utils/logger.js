const logs = [];

export const logEvent = (type, message) => {
  const log = {
    type,
    message,
    timestamp: new Date().toISOString()
  };
  logs.push(log);
  // In real usage, send to backend or save to localStorage if required
};

export const getLogs = () => logs;
