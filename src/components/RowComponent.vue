<template>
    <div class="row" :style="{ transform: 'translateY(' + offsetTop + 'px)' }">
        <div class="rownum">{{ rownum }}</div>        
        <slot></slot>
    </div>
   
</template>

<script>

    const height = 50;
    export default {
        name: 'row',
        props: ['rownum'],
        computed: {
            offsetTop: function() {
                return height * this.rownum;
            }
        }
    }
</script>

<style lang="scss" scoped>
.row {
    position: absolute;
    top: 0; left: 0;
}
</style>