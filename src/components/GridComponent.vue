<template>
    <div class="wrapper" :style="{ width: docWidth + 'px', height: docHeight + 'px' }">
        <div class="grid">
            <headrow :colnum="colNumbers" />
            <row v-for="r in rowNumbers" :key="r" :rownum="r">
                <cell v-for="c in colNumbers" :key="c" :row="r" :col="c" :oval="cellValue(r,c)"/>
            </row>
        </div>
    </div>
</template>

<script>

    import _ from 'lodash';
    import Row from './RowComponent.vue';
    import Cell from './CellComponent.vue';
    import Headrow from './HeadrowComponent.vue';
    export default {
        components: {
            Row,
            Cell,
            Headrow
        },
        data () {
            return {

                page: [], //elements in visible area
                
                docHeight: 0, //Comple height of current document
                docWidth: 0, //Comple width of current document

                winHeight: 0,
                winWidth: 0,

                visibleCols: 0,
                visibleRows: 0,

                leftOffset: 0,
                topOffset: 0,

                bottom: false,
                right: false,
                grid: {
                    row: 0,
                    col: 0,
                    rows: 10,
                    cols: 10,                    
                },
            }            
        },
        methods: {
            saveInput: function() {
                //console.log(`Input #${this.row}:${this.col} value: '${this.val}'`);
            },            
            loadVisible: function() {
                let {left,top,width,height}  = this.$el.getBoundingClientRect();
                // fix for 0-scroll event
                if (width && height) {                     
                    this.leftOffset = Math.abs(Math.floor(left / 250));                    
                    this.topOffset = Math.abs(Math.floor(top / 50));
                    //this.dataPayload();
                }
            },
            dataPayload: function() {
                let newpage = [];                
                for (let r = this.topOffset; r < this.topOffset + this.visibleRows; r++) {                
                    for (let c = this.leftOffset; c < this.leftOffset + this.visibleCols; c++) {
                        newpage.push({
                            row: r, col: c, data: Math.floor((Math.random() * 100) + 1)
                        });
                    }
                } 
            },
            cellValue: function(row,col) {
                return this.page.find(cell => cell.row == row && cell.col == col);
            },    

        },
        computed: {
            rowNumbers: function() {                
                console.log("rownum:", this.topOffset)                               
                return _.range(this.topOffset, this.topOffset + this.visibleRows)
            },
            colNumbers: function() { 
                console.log("colnum:", this.leftOffset)                               
                return _.range(this.leftOffset, this.leftOffset + this.visibleCols)
            }            
            
        },
        mounted() {

            this.docWidth = 40000 * 250; 
            this.docHeight = 40000 * 50;

            this.winHeight = document.documentElement.clientHeight
            this.winWidth = document.documentElement.clientWidth
            
            this.visibleCols = Math.floor((this.winWidth - 50) / 250); //-50 because of rom numbers column width
            this.visibleRows = Math.floor((this.winHeight - 50) / 50); // -50 because of row width
            
            window.addEventListener('scroll', this.loadVisible);

            //this.dataPayload();
            
        }        
    }
</script>

<style lang="scss" scoped>
.grid {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    position: fixed; top:0;
    
}
.wrapper {
    display: block;
    background: white;
}
</style>