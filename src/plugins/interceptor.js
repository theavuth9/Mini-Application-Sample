export const errorHandler = (fetch) => {
  fetch.handleError((error) => {
    console.log("error: ", error);
  });
};
