
import Vue from 'vue'
import Vuex from 'vuex'
import Page from './Page'
import wen from './wen'
import swipe from './swipe'
import rating from './rating'
import image from './image'
import cdy from './cdy'
import loading from './loading'
import token from './token'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		Page,
    	wen,
    	swipe,
    	rating,
    	image,
    	cdy,
    	loading,
    	token
	},
})
