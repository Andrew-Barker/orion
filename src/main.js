import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import unicons from './utils/unicons'
import Notifications from 'vue-notification'
import VueTippy, { TippyComponent } from 'vue-tippy'
import IconComponent from './components/IconComponent.vue'
import LoaderComponent from './components/LoaderComponent.vue'
import ModalComponent from './components/ModalComponent.vue'
import VueCryptojs from 'vue-cryptojs'
import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyDPT_Hq2ipio4nDBqNf5qTXnG_P-EwUyEo",
	authDomain: "cod-camo-tracker-5f821.firebaseapp.com",
	databaseURL: "https://cod-camo-tracker-5f821-default-rtdb.firebaseio.com",
	projectId: "cod-camo-tracker-5f821",
	storageBucket: "cod-camo-tracker-5f821.appspot.com",
	messagingSenderId: "228754273847",
	appId: "1:228754273847:web:546735f5d53d1c8e55f1b2",
	measurementId: "G-956JFRDM7T"
  };



Unicon.add(unicons)

Vue.use(PiniaVuePlugin)
Vue.use(Unicon)
Vue.use(Notifications)
Vue.use(VueTippy, { arrow: true, arrowType: 'round' })
Vue.use(VueCryptojs)

Vue.component('TippyComponent', TippyComponent)
Vue.component('IconComponent', IconComponent)
Vue.component('LoaderComponent', LoaderComponent)
Vue.component('ModalComponent', ModalComponent)

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const database = firebase.database();

new Vue({
	router,
	pinia: createPinia(),
	render: (h) => h(App),
}).$mount('#app')
