<template>
  <van-search
  v-model="value"
  shape="round"
  background="#4fc08d"
  placeholder="请输入搜索关键词"
/>
</template>

<script>
export default {
    data(){
        return {
            value:"",
        }
    },
}
</script>

<style>

</style>