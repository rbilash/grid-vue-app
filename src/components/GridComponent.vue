<template>
    <div class="wrapper" :style="{ width: docWidth + 'px', height: docHeight + 'px' }">
        <headrow :colnum="colNumbers" />
        <div class="grid">            
            <row v-for="r in rowNumbers" :key="r" :rownum="r">
                <cell v-for="c in colNumbers" :key="c" :row="r" :col="c" :oval="cellValue(r,c)"/>
            </row>
        </div>
        <div class="footer" v-show="countChanged"><button @click="saveCells">Save</button></div>
    </div>
</template>

<script>
    const cellHeight = 50;
    const cellWidth = 200;
    const rows = 40000;
    const cols = 40000;
    import _ from 'lodash';
    import { mapGetters,mapActions } from 'vuex'
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

                paddingTop: 0,
                paddingLeft: 0,

            }            
        },
        methods: {
            ...mapActions([
                'saveCells',
            ]),    
            calcDimensions: function() {
                this.winHeight = document.documentElement.clientHeight
                this.winWidth = document.documentElement.clientWidth           
                this.visibleCols = Math.ceil((this.winWidth - 50) / cellWidth); //-50 because of rom numbers column width
                this.visibleRows = Math.ceil((this.winHeight - 50) / cellHeight); // -50 because of header row width
                window.scrollTo(window.scrollX, window.scrollY - 1);
            },        
            loadVisible: function() {
                let {left,top,width,height}  = this.$el.getBoundingClientRect();
                // fix for 0-scroll event
                if (width && height) {                     
                    this.leftOffset = Math.abs(Math.ceil(left / 200));                    
                    this.topOffset = Math.abs(Math.ceil(top / 50));
                    this.paddingTop = Math.abs(top);
                    this.paddingLeft = left;
                    
                    this.dataPayload();
                }
            },
            dataPayload: function() {
                let newpage = [];                
                for (let r = this.topOffset; r < this.topOffset + this.visibleRows; r++) {                
                    for (let c = this.leftOffset; c < this.leftOffset + this.visibleCols; c++) {
                        newpage.push({
                            row: r, col: c, data: String(Math.floor((Math.random() * 100) + 1))
                        });
                    }
                } 
                this.page = [...newpage];
            },
            cellValue: function(row,col) {
                return this.page.find(cell => cell.row == row && cell.col == col).data;
            }

        },
        computed: {
            ...mapGetters([
                'countChanged',
            ]),            
            rowNumbers: function() {                                           
                let limit = this.topOffset + this.visibleRows;
                return _.range(this.topOffset, limit > rows ? rows : limit)
            },
            colNumbers: function() {                          
                let limit = this.leftOffset + this.visibleCols;      
                return _.range(this.leftOffset, limit > cols ? cols : limit)
            }            
            
        },
        mounted() {

            this.docWidth = cols * cellWidth; 
            this.docHeight = rows * cellHeight;

            this.winHeight = document.documentElement.clientHeight
            this.winWidth = document.documentElement.clientWidth
            
            this.visibleCols = Math.ceil((this.winWidth - 50) / cellWidth); //-50 because of rom numbers column width
            this.visibleRows = Math.ceil((this.winHeight - 50) / cellHeight); // -50 because of header row width
            
            window.addEventListener('scroll', this.loadVisible);
            window.addEventListener('resize', this.calcDimensions);

            this.dataPayload();
            
        }        
    }
</script>

<style lang="scss" scoped>
.grid {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    //position: fixed; top:0;
    position: relative;
    margin-top: 50px;
    
}
.wrapper {
    display: block;
    background: white;
}
.footer {
    position: fixed; bottom: 0; width: 100%; background: white;
    text-align: right; padding: 15px;
    box-shadow: 0 -3px 15px rgba(0, 0, 0, 0.3)
}
</style>