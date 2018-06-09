import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'

Vue.use(Vuex)

// initial state object
const state = {
    changed: [],
}

// define getters that can be accessed to retreive data
const getters = {
    countChanged: state => {
        return state.changed.length
    }
}

// define mutations that can be applied to our state
const mutations = {
    addCell (state, cell) {
        let {row,col} = cell;
        let index = state.changed.findIndex((c) => c.row == row && c.col == col)
        if (index > -1) {
            state.changed[index].data = cell.data
        }
        state.changed.push(cell);
    },
    removeCell (state, cell) {
        let {row,col} = cell;
        let index = state.changed.findIndex((c) => c.row == row && c.col == col)
        if (index > -1) {
            state.changed.splice(index,1)
        }

    },    
    clearCells (state) {
        state.changed = [];
    }    
}

// define actions that can be called to perform mutations
const actions = {
    addCell (context, cell) {
        context.commit('addCell', cell)
    },
    removeCell (context, cell) {
        context.commit('removeCell', cell)
    },    
    clearCells (context) {
        context.commit('clearCells')
    },
    saveCells (context) {
        state.changed.forEach((el) => {
            console.log(`Input #${el.row}:${el.col} value: '${el.data}'`)            
        });
        context.commit('clearCells')
    }            
}

// create Vuex instance and export store for use by our components
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})