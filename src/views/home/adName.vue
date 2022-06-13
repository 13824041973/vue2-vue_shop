<template>
    <div v-if="data.advertesPicture">
        <marquee direction="right" loop="1" scrollamount="8">
            <van-image :src="$resetUrl(data.advertesPicture.PICTURE_ADDRESS)" />
        </marquee>
    </div>
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