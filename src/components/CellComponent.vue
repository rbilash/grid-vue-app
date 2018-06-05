<template>
   <div class="cell">
       <input type="checkbox" v-model="check">
       <input type="text" v-model="val" :disabled="check" @keyup="validateInput">
       <button type="button" v-show="!check && changed" @click="saveInput">Save</button>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "cell",
        props: {
            row: {
                type: Number,
                required: true
            },
            col: {
                type: Number,
                required: true
            },            
        },
        data () {
            return {
                check: false,
                changed: false,
                val: '',
                originalValue: '',
            }
        },
        mounted() {            
            this.val = this.$store.getters.getCell(this.row, this.col).data;
            this.originalValue = this.val;
        },
        watch: {
            val: function(val) {                
                this.changed = (this.originalValue != val);                
            }
        },
        methods: {
            saveInput: function() {
                console.log(`Input #${this.row}:${this.col} was modified from '${this.originalValue}' to '${this.val}'`);
            },
            validateInput: function() {
                if (isNaN(this.val)) {                    
                    this.val = this.val.slice(0, -1);
                }
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


input, button { 
    height: 24px;
}

</style>