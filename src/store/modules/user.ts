/*
 * @Author: jack.hai
 * @Date: 2022-11-22 11:19:07
 * @LastEditTime: 2022-11-23 19:32:30
 * @Description:
 */
import { defineStore } from "pinia";
const UserState = defineStore({
    id: "user",
    state: () => ({
        name: "jack.hai",
    }),
    getters: {
        getName(): string {
            return this.name;
        },
    },
    actions: {
        setName(name: string): void {
            this.name = name;
        },
    },
});
export default UserState;
