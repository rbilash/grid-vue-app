<template>
    <div class="row headrow">        
        <div class="empty"></div>
        <div class="colnum" v-for="c in colnum" :key="c">{{ c }}</div>
    </div>
   
</template>

<script>

    export default {
        name: 'headrow',
        props: ['colnum'],
    }
</script>

<style lang="scss" scoped>
.headrow {
    background: white;
    //position: fixed; top:0;
}
</style>