import { getStorage } from "@/utils/storage";

export default {
    namespaced: true, //命名空间
    state: {
        goodsLength: 0,
    },
    mutations: {
        getGoodsLength(state) {
            state.goodsLength = 0;
            let shopCarList = getStorage("shopCarList") ? getStorage("shopCarList") : [];
            if (shopCarList.length) {
                // shopCarList.forEach(item => {
                //     state.goodsLength += item.num;
                // });
                state.goodsLength = shopCarList.length;
            }
        },
    },
};