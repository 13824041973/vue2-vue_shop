<template>
    <van-grid :border="false" :column-num="3">
        <van-grid-item
         v-for="item in data.recommend"
         :key="item.goodsId"
         class="everyItem"
        >
            <router-link :to="{path:'/details',query:{id:item.goodsId}}">
                <van-image lazy-load :src="$resetUrl(item.image)" />
                <div>{{item.goodsName}}</div>
                <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </router-link>
        </van-grid-item>
    </van-grid>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            required:true,
        }
    }
}
</script>

<style lang="scss" scoped>
.everyItem {
    width: 110px;
    div {
        width: 100px;
        font-size: 12px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    a {
        color: black;
    }
}
</style>