<template>
    <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="item in data.slides" :key="item.goodsId">
            <router-link :to="{path:'/details',query:{id:item.goodsId}}">
                <van-image :src="$resetUrl(item.image)" />
            </router-link>
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            required:true,
        },
    }
}
</script>

<style>

</style>