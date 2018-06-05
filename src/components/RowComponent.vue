<template>
    <div class="row">        
        <div class="rownum">{{ rownum }}</div>
        <cell v-for="c in getColNums" :key="c" :row="rownum" :col="c" />
    </div>
   
</template>

<script>

    import { mapGetters } from 'vuex'
    import Cell from './CellComponent.vue';

    export default {
        name: 'row',
        props: {
            'rownum': {
                type: Number,
                required: true
            }
        },
        components: {
            Cell,
        },
        data () {
            return {
                cells: 10,
            }            
        },
        computed: {
            ...mapGetters([
                'getRowNums',
                'getColNums',
                'getPage',
            ])
        }
    }
</script>

<style lang="scss" scoped>
</style>