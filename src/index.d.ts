import { Http } from './util/Http';

declare module "vue/types/vue" {
    interface Vue {
        $http: Http
    }
}