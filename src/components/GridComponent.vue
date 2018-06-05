<template>
    <div class="wrapper">
        <div class="grid">
            <headrow :colnum="getColNums" />
            <row v-for="r in getRowNums" :key="r" :rownum="r" />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Row from './RowComponent.vue';
    import Headrow from './HeadrowComponent.vue';
    export default {
        components: {
            Row,
            Headrow
        },
        data () {
            return {
                bottom: false,
                right: false,
                grid: {
                    row: 0,
                    col: 0,
                    rows: 0,
                    cols: 0,                    
                },
            }            
        },
        watch: {
            bottom(bottom) {
                if (bottom) {
                    this.loadBottomPage(this.grid)
                }
            },
            right(right) {
                if (right) {
                    this.loadRightPage(this.grid)
                }
            },
        },        
        methods: {
            ...mapActions([
                'addCell',
                'clearPastRows',
            ]),            
            isBottomVisible: function() {                
                const visible = document.documentElement.clientHeight
                const pageHeight = document.documentElement.scrollHeight
                const bottomOfPage = visible + window.scrollY >= pageHeight
                return bottomOfPage || pageHeight < visible
            },
            isRightVisible: function() {                
                const visible = document.documentElement.clientWidth
                const pageWidth = document.documentElement.scrollWidth
                const rightOfPage = visible + window.scrollX >= pageWidth
                return rightOfPage || pageWidth < visible
            },            
            loadBottomPage: function(grid) {
                this.grid.row += this.grid.rows;
                this.dataPayload(grid);      
                this.clearPastRows(this.grid.rows);
                
            },
            loadRightPage: function(grid) {
                this.grid.col += this.grid.cols;
                this.dataPayload(grid);      
                
            },            
            dataPayload: function(grid) {
                let {col,row,cols,rows} = grid;
        
                // generate dummy data matrix.                
                for (var r = row; r < row+rows; r++) {                    
                    for (var c = col; c < col+cols; c++) {
                        let cell = {
                            row: r, col: c, data: Math.floor((Math.random() * 100) + 1)
                        }                                                
                        this.addCell(cell);
                    }
                }  
                
            }
        },
        computed: {
            ...mapGetters([
                'getRowNums',
                'getColNums',
                'getPage',
            ])
        },
        mounted() {
            /* determine how many cells to show
            !!! same should be done for window resize events, but it is trivial task, skipping */
            const height = document.documentElement.clientHeight
            const width = document.documentElement.clientWidth

            // since we set width of the cell to 250px and height to 50px (better to have it in configs of corse)
            this.grid.rows = Math.floor(height / 50);
            this.grid.cols = Math.floor(width / 250);
            
            window.addEventListener('scroll', () => {
                this.bottom = this.isBottomVisible();
                //this.right = this.isRightVisible();
            })
            this.dataPayload(this.grid);
        }        
    }
</script>

<style lang="scss" scoped>
.grid {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    //position:fixed;
    
}
.wrapper1 {
    display: block;
    width: 3000px;
    height: 2000px;
    background: white;
    position: absolute;
    z-index: 10;
    content: ' ';
    top: 0%; left: 0%;
}
</style>