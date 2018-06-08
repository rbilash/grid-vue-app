<template>
    <div class="row">        
        <div class="rownum">{{ rownum }}</div>        
        <slot></slot>
    </div>
   
</template>

<script>

    export default {
        name: 'row',
        props: ['rownum'],
    }
</script>

<style lang="scss" scoped>
</style>