import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const AppStore = new Vuex.Store({
    state: {
        pageTagList: [],
        pageMetas: [],
        historyPathList: []
    },
    mutations: {
        /**
         * 添加页面管理
         *
         * @param {*} state
         * @param {*} arg
         */
        addPage(state: any, arg) {
            if (arg && !Object.is(arg.meta.viewType, 'APPINDEX')) {
                const page: any = {};
                const pageMeta: any = {};
                Object.assign(page, arg);
                Object.assign(pageMeta, page.meta);
                const index = state.pageTagList.findIndex((tag: any) => Object.is(tag.fullPath, page.fullPath));
                if (index < 0) {
                    state.pageTagList.push(page);
                    state.pageMetas.push(pageMeta);
                } else {
                    const index2 = state.historyPathList.indexOf(page.fullPath);
                    if (index2 >= 0) {
                        state.historyPathList.splice(index2, 1);
                    }
                }
                state.historyPathList.push(page.fullPath);
            }
        },
        /**
         * 删除页面管理
         *
         * @param {*} state
         * @param {*} arg
         */
        deletePage(state, arg) {
            let delPage: any = null;
            if (isNaN(arg)) {
                const index = state.pageTagList.findIndex((page: any) => Object.is(page.fullPath, arg));
                if (index >= 0) {
                    delPage = state.pageTagList[index];
                    state.pageTagList.splice(index, 1);
                    state.pageMetas.splice(index, 1);
                }
            } else {
                delPage = state.pageTagList[arg];
                state.pageTagList.splice(arg, 1);
                state.pageMetas.splice(arg, 1);
            }
            const index = state.historyPathList.findIndex((path: any) => Object.is(path, delPage.fullPath));
            if (index >= 0) {
                state.historyPathList.splice(index, 1);
            }
        },
        /**
         * 设置当前页面
         *
         * @param {*} state
         * @param {*} arg
         */
        setCurPage(state, arg) {
            let page: any = null;
            if (isNaN(arg)) {
                const index = state.pageTagList.findIndex((page: any) => Object.is(page.fullPath, arg));
                if (index >= 0) {
                    page = state.pageTagList[index];
                }
            } else {
                page = state.pageTagList[arg];
            }
            if (page) {
                const index = state.historyPathList.findIndex((path: any) => Object.is(path, page.fullPath));
                if (index >= 0) {
                    state.historyPathList.splice(index, 1);
                    state.historyPathList.push(page.fullPath);
                }
            }
        },
        /**
         * 设置当前页标题
         *
         * @param {*} state
         * @param {*} caption
         */
        setCurPageCaption(state, params) {
            if (params && params.route) {
                const index = state.pageTagList.findIndex((page: any) => Object.is(page.fullPath, params.route.fullPath));
                if (index >= 0) {
                    state.pageMetas[index].caption = params.caption;
                }
            }
        },
        /**
         * 清空所有
         *
         * @param {*} state
         */
        removeAllPage(state) {
            if (state.pageTagList.length > 0) {
                state.pageMetas = [];
                state.pageTagList = [];
                state.historyPathList = [];
            }
        },
        /**
         * 删除其他
         *
         * @param {*} state
         */
        removeOtherPage(state) {
            if (state.historyPathList.length > 0) {
                const curPath = state.historyPathList[state.historyPathList.length - 1];
                const index = state.pageTagList.findIndex((page: any) => Object.is(page.fullPath, curPath));
                if (index >= 0) {
                    const page = state.pageTagList[index];
                    const meta: any = {};
                    Object.assign(meta, page.meta);
                    state.pageTagList = [];
                    state.pageMetas = [];
                    state.historyPathList = [];
                    state.historyPathList.push(page.fullPath);
                    state.pageTagList.push(page);
                    state.pageMetas.push(meta);
                }
            }
        }
    }
});