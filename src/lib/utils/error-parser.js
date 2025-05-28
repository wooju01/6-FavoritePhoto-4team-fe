export const parseBackendError = (status, responseText) => {
  if (responseText) {
    try {
      const errorData = JSON.parse(responseText);

      if (
        errorData &&
        typeof errorData.message === "string" &&
        errorData.message.trim()
      ) {
        return errorData.message;
      }
    } catch (e) {}
  }

  return `${status}${
    responseText ? `: ${responseText.substring(0, 100)}` : ""
  }`;
};
