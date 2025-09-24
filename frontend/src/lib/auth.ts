import Cookies from "js-cookie";

export const saveToken = (token: string) => Cookies.set("rentkar_token", token);
export const getToken = () => Cookies.get("rentkar_token");
export const clearToken = () => Cookies.remove("rentkar_token");
