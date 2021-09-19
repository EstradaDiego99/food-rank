/** Standard way to handle error in the MERN template. */
const ERROR_404 = "No response from server.";
export function handleError(errRes) {
  if (errRes.response) {
    alert(ERROR_404);
    return;
  }
  alert(errRes.response?.data?.msg);
}

/** Function to convert object into a query string. */
export function toQueryString(query) {
  return Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");
}

/** Is the second string a substring of the first one?
 * @param {String} outer
 * @param {String} inner
 * @returns {boolean}
 */
export function stringsMatch(outer, inner) {
  outer = outer
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  inner = inner
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return outer.indexOf(inner) !== -1;
}
