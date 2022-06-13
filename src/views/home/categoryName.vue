<template>
    <van-grid v-if="data.category" :column-num="data.category.length">
        <van-grid-item
            v-for="(item,idx) in data.category"
            :key="item.mallCategoryId"
            :icon="$resetUrl(item.image)"
            :text="item.mallCategoryName"
            :to="{path:'/list',query:{idx:idx}}"
        />
    </van-grid>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            required:true,
        }
    },
    // created(){
    //     console.log(this.data);
    // }
}
</script>

<style>

</style>