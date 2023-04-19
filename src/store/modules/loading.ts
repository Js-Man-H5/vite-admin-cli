/*
 * @Author: jack.hai
 * @Date: 2022-12-27 18:46:38
 * @LastEditTime: 2022-12-27 19:35:34
 * @Description:
 */
import { defineStore } from "pinia";
const LoadingState = defineStore({
    id: "loading",
    state: () => ({
        spinning: false,
        requestCount: 0,
    }),
    getters: {
        getSpinning(): boolean {
            return this.spinning;
        },
    },
    actions: {
        setLoadingStart(): void {
            if (this.requestCount === 0) {
                this.spinning = true;
            }
            this.requestCount++;
        },
        setHideLoading(): void {
            this.requestCount--;
            if (this.requestCount === 0) {
                this.spinning = false;
            }
        },
        setSpining(data: boolean): void {
            this.spinning = data;
        },
    },
});
export default LoadingState;
