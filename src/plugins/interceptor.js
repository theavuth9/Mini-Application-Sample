export default function ($fetch) {
  $fetch.handleError((error) => {
    console.log("error: ", error);
  });
}
