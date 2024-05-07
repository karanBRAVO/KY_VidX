export const getLocaleTime = (utcTimeString) => {
  const utcDate = new Date(utcTimeString);

  const localTimeString = utcDate.toLocaleString();
  return localTimeString;
};

// change the time format to HH:MM:SS
export const getFormatedTime = (seconds) => {
  let hours = Math.ceil(Math.floor(seconds / 3600));
  let minutes = Math.ceil(Math.floor((seconds - hours * 3600) / 60));
  let secs = Math.ceil(seconds - hours * 3600 - minutes * 60);

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0")
  );
};
