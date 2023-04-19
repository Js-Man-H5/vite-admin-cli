/*
 * @Author: jack.hai
 * @Date: 2022-12-30 10:41:30
 * @LastEditTime: 2023-03-22 16:39:11
 * @Description:
 */
const tokenObject = {
    token: "token",
    name: "name",
    roleList: "roleList",
};

export function getSession<K extends keyof typeof tokenObject>(key: K) {
    return sessionStorage.getItem(tokenObject[key]);
}

export function setSession<K extends keyof typeof tokenObject>(key: K, token: string) {
    return sessionStorage.setItem(tokenObject[key], token);
}

export function removeSession<K extends keyof typeof tokenObject>(key: K) {
    return sessionStorage.removeItem(tokenObject[key]);
}
