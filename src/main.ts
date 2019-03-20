import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App';
import ElementUi from 'element-ui';
import iView from 'iview';
import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';
import './theme/default.less';
import './theme/user.less';
import Http from '@/util/Http';
import { AppComponent } from './register';
import { AppStore } from './util/AppStore';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Http);
Vue.use(ElementUi);
Vue.use(iView);
Vue.use(AppComponent);

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    router.app.$store.commit('addPage', to);
  }, 10);
  next();
});

new Vue({
  store: AppStore,
  router,
  render: (h) => h(App),
}).$mount('#app');