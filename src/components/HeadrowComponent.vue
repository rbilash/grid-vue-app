<template>
    <div class="row headrow">        
        <div class="empty"></div>
        <div class="colnum" v-for="c in colnum" :key="c" :style="{ transform: 'translateX(' + offsetLeft(c) + 'px)' }">{{ c }}</div>
    </div>
   
</template>

<script>
    const cellwidth = 200;
    const runnerWidth = 60;

    export default {
        name: 'headrow',
        props: ['colnum'],
        methods: {
            offsetLeft: function(col) {
                return cellwidth * col + runnerWidth;
            }            
        }
    }
</script>

<style lang="scss" scoped>
.headrow {
    background: white;
    position: sticky;
    top: 0;
    z-index: 1000;
    

    > div {
        position: absolute;
        top: 0; left: 0;  
        width: 200px;  
    }
}
</style>