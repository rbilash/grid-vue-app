<template>
    <div class="row">        
        <div class="rownum">{{ rownum }}</div>
        <cell v-for="c in getColNums" :key="c" :row="rownum" :col="c" :oval="cellValue(rownum,c)"/>
    </div>
   
</template>

<script>

    import { mapGetters } from 'vuex'
    //import store from './store'
    import Cell from './CellComponent.vue';

    export default {
        name: 'row',
        //store,
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
            }            
        },
        computed: {
            ...mapGetters([
                'getRowNums',
                'getColNums',
                'getPage',
            ])
        },
        methods: {
            cellValue: function(row,col) {
                return this.$store.state.page.find(cell => cell.row == row && cell.col == col).data;
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>