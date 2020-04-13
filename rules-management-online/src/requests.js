const APIURL = "http://localhost:8080/drools";
const URI_GET_RULES = "/engine/rules";
const URI_ADD_RULES = "/engine/rules";
const URI_FIRE_RULES = "/engine/run-rules";
export const getRules = async () => {
  const res = await fetch(`${APIURL}${URI_GET_RULES}`);
  // console.log(res);
  // console.log(res.clone().json());
  // console.log(res.clone().json().data);
  return res.json();
};
export const addRule = async data => {
  const response = await fetch(`${APIURL}${URI_ADD_RULES}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return response.json();
};
export const fireRules = async data => {
    const response = await fetch(`${APIURL}${URI_FIRE_RULES}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  };
// export const editContact = async data => {
//   const response = await fetch(`${APIURL}/contacts/${data.id}`, {
//     method: "PUT",
//     mode: "cors",
//     cache: "no-cache",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   });
//   return response.json();
// };
// export const deleteContact = async id => {
//   const response = fetch(`${APIURL}/contacts/${id}`, {
//     method: "DELETE",
//     mode: "cors",
//     cache: "no-cache"
//   });
//   return response;
// };