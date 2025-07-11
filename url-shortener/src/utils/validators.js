export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidInteger = (value) => {
  const number = parseInt(value);
  return !isNaN(number) && number > 0;
};

export const isValidShortcode = (code) => {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(code); // Optional, alphanumeric + _-
};
