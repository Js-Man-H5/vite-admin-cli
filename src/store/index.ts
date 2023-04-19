/*
 * @Author: jack.hai
 * @Date: 2022-11-22 10:56:22
 * @LastEditTime: 2023-04-19 15:44:37
 * @Description:
 */
import useUserStore from "./modules/user";
import useLoadingStore from "./modules/loading";
const useStore = () => ({
    user: useUserStore(),
    loading: useLoadingStore(),
});

export default useStore;
