/* libs and dependencies */
import Vue from 'vue'

/* app components and dependencies */
import GridComponent from './components/GridComponent.vue'
import store from './store'

/* styles, fonts etc. */
import './assets/app.scss'

/* render main component and mount to the DOM */
new Vue({
    store,
    render: h => h(GridComponent)
}).$mount('#app')