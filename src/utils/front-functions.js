/** Standard way to handle error in the MERN template. */
const ERROR_404 = "No response from server.";
export function handleError(errRes) {
  if (errRes.response) {
    alert(ERROR_404);
    return;
  }
  alert(errRes.response?.data?.msg);
}
