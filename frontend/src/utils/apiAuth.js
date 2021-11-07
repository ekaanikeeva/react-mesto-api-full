export const BASE_URL = "https://ekaanikeeva.backend.nomoredomains.rocks"
const _checkResponse = (res) => {
  if (res.ok) return res.json();
  else return Promise.reject(res.status);
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email
    }),
  }).then(_checkResponse);
};

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(_checkResponse);
};

export const token = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(_checkResponse);
};

