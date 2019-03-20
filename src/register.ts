export const AppComponent = {
    install(v: any, opt: any) {
        v.component('app-layout', () => import('./components/app-layout/app-layout'));
        v.component('app-tree', () => import('./components/app-tree/app-tree'));
        v.component('context-menu-container', () => import('./components/context-menu-container/context-menu-container'));
        v.component('context-menu', () => import('./components/context-menu/context-menu'));
        v.component('header-menus', () => import('./components/header-menus/header-menus'));
        v.component('little-menus', () => import('./components/little-menus/little-menus'));
        v.component('design-view-container', () => import('./components/design-view-container/design-view-container'));
        v.component('panel-design-tree', () => import('./components/panel-design-tree/panel-design-tree'));
        v.component('app-keep-alive', () => import('./components/app-keep-alive/app-keep-alive'));
        v.component('tab-page-exp', () => import('./components/tab-page-exp/tab-page-exp'));
        v.component('app-form', () => import('./components/form/form'));
        v.component('app-form-item', () => import('./components/form-item/form-item'));
        v.component('app-form-group', () => import('./components/form-group/form-group'));
    }
};