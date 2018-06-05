import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'

Vue.use(Vuex)

// initial state object
const state = {
    page: [],
}

// define getters that can be accessed to retreive data
const getters = {
    getPage: state => {
        return state.page
    },
    getCell: (state) => (row,col) => {
        return state.page.find(cell => cell.row == row && cell.col == col);
    },    
    getRowNums: state => {
        return [ ...new Set(state.page.map(value => value.row)) ];
    },
    getColNums: state => {
        return [ ...new Set(state.page.map(value => value.col)) ];
    }            
}

// define mutations that can be applied to our state
const mutations = {
    addCell (state, cell) {
        state.page.push(cell);
    },
    clearPastRows (state, count) {        
        let rownums = [ ...new Set(state.page.map(value => value.row)) ];               

        if (rownums.length > count * 3) { //just delete when there are 3 screens
            rownums.splice(count);    
            for (let r = 0; r < rownums.length; r++) { 
                let index = -1;        
                let row = rownums[r];
                
                do {
                    index = state.page.findIndex(item => item.row == row);                            
                    if(index !== -1) state.page.splice(index, 1);    
                }
                while (index !== -1)
                
            }
        }
    }
    
}

// define actions that can be called to perform mutations
const actions = {
    addCell (context, cell) {
        context.commit('addCell', cell)
    },
    clearPastRows (context, count) {
        context.commit('clearPastRows', count)
    }            
}

// create Vuex instance and export store for use by our components
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})