<template>
   <div class="cell">
       <input type="checkbox" v-model="check">
       <input type="text" v-model="val" :disabled="check" @keyup="validateInput">
       <button type="button" v-show="!check && changed" @click="saveInput">Save</button>
   </div>
</template>

<script>
    import Vue from 'vue'
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
            oval: {
                type: Number,
                requred: true
            }            
        },
        data () {
            return {
                check: false,
                changed: false,
                val: '',
            }
        },
        mounted() {      
            Vue.nextTick().then( () => {   
                this.val = this.oval
            })      
        },
        watch: {
            val: function(val) {                
                this.changed = (this.oval != val);                
            }
        },
        methods: {
            saveInput: function() {
                console.log(`Input #${this.row}:${this.col} was modified from '${this.oval}' to '${this.val}'`);
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