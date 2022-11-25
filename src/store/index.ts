/*
 * @Author: jack.hai
 * @Date: 2022-11-22 10:56:22
 * @LastEditTime: 2022-11-23 19:31:10
 * @Description:
 */
import useUserStore from "./modules/user";

const useStore = () => ({
    user: useUserStore(),
});

export default useStore;
