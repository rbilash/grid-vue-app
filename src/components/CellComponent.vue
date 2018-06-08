<template>
    <div class="cell">
        <input type="checkbox" v-model="check">
        <input type="text" v-model="val" :disabled="check" @keyup="validateInput">
    </div>
</template>

<script>

    import Vue from 'vue';

    export default {
        name: "cell",
        props: ['row', 'col', 'oval'],
        data () {
            return {
                check: false,
                changed: false,
                val: '',
                visible: false,
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
            validateInput: function() {
                if (isNaN(this.val)) {                    
                    this.val = this.val.slice(0, -1);
                }
            }
        },
        computed: {
        }

    }
</script>

<style lang="scss" scoped>


input, button { 
    height: 24px;
}

</style>