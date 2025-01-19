import { TIMEOUT } from "./config.js";

const timeout = function (seconds) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`ERROR: Request timeout `));
    }, seconds * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ☹️ ${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};
