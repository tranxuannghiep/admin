export const getErrorMessageResponse = (response: any) => {
  if (typeof response?.message === "string") {
    return response?.message;
  }

  if (response?.message?.details[0]) {
    return response?.message?.details[0]?.message;
  }

  return "";
};
