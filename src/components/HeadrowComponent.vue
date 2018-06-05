<template>
    <div class="row headrow">        
        <div class="empty"></div>
        <div class="colnum" v-for="(c,i) in colnum" :key="i">{{ i }}</div>
    </div>
   
</template>

<script>

    import Cell from './CellComponent.vue';

    export default {
        name: 'headrow',
        props: {
            'colnum': {
                type: Array,
                required: true
            }, 
        },
        components: {
            Cell,
        },
        data () {
            return {
                cells: 10,
            }            
        }
    }
</script>

<style lang="scss" scoped>
.headrow {
    background: white;
}
</style>