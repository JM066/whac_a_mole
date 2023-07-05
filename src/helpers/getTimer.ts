import { LOCAL_STORAGE_KEY } from "@/app.type";

export default function getLocalStorage(key: LOCAL_STORAGE_KEY) {
  return localStorage.getItem(key);
}
export function removeLocalStorage(key: LOCAL_STORAGE_KEY) {
  localStorage.removeItem(key);
}
export function setLocalStorage(key: LOCAL_STORAGE_KEY, value: string) {
  localStorage.setItem(key, value);
}
