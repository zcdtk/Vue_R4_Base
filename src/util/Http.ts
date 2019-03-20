import axios from 'axios';

/**
 * Http net 对象
 * 调用 getInstance() 获取实例
 *
 * @class Http
 */
export class Http {

    /**
     * 获取 Http 单例对象
     *
     * @static
     * @returns {Http}
     * @memberof Http
     */
    public static getInstance(): Http {
        if (!Http.Http) {
            Http.Http = new Http();
        }
        return this.Http;
    }

    /**
     * 单例变量声明
     *
     * @private
     * @static
     * @type {Http}
     * @memberof Http
     */
    private static Http: Http;

    /**
     * 是否正在加载中
     *
     * @type {boolean}
     * @memberof Http
     */
    public isLoading: boolean = false;

    /**
     * 统计加载
     *
     * @type {number}
     * @memberof Http
     */
    private loadingCount: number = 0;

    /**
     * Creates an instance of Http.
     * 私有构造，拒绝通过 new 创建对象
     * 
     * @memberof Http
     */
    private constructor() { }

    /**
     * post请求
     *
     * @param {string} url url 请求路径
     * @param {*} [params={}] 请求参数
     * @returns {Promise<any>} 请求相响应对象
     * @memberof Http
     */
    public post(url: string, params: any = {}): Promise<any> {
        const _strParams: string = this.transformationOpt(params);
        const _url = url;
        this.beginLoading();

        return new Promise((resolve: any, reject: any) => {
            axios({
                method: 'post',
                url: _url,
                data: _strParams,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Accept': 'application/json' },
                transformResponse: [(data: any) => {
                    let _data: any = null;
                    try {
                        _data = JSON.parse(JSON.parse(JSON.stringify(data)));
                    } catch (error) {
                    }
                    return _data;
                }],
            }).then((response: any) => {
                this.endLoading();
                const data = response.data;
                if (data && data.notlogin) {
                    return;
                }
                if (data.ret !== 0) {
                    data.failureType = 'CLIENT_INVALID';
                    data.info = data.info ? data.info : '本地网络异常，请重试';
                    data.info = data.errorMessage ? data.errorMessage : '本地网络异常，请重试';
                }
                resolve(data);
            }).catch((error: any) => {
                this.endLoading();
                reject(error);
            });
        });
    }

    /**
     * post请求,不处理loading加载
     *
     * @param {string} url
     * @param {*} [params={}]
     * @returns {Subject<any>}
     * @memberof Http
     */
    public post2(url: string, params: any = {}): Promise<any> {
        const _strParams: string = this.transformationOpt(params);
        const _url = url;

        return new Promise((resolve: any, reject: any) => {
            axios({
                method: 'post',
                url: _url,
                data: _strParams,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Accept': 'application/json' },
                transformResponse: [(data: any) => {
                    let _data: any = null;
                    try {
                        _data = JSON.parse(JSON.parse(JSON.stringify(data)));
                    } catch (error) {
                    }
                    return _data;
                }],
            }).then((response: any) => {
                const data = response.data;
                if (data && data.notlogin) {
                    return;
                }
                if (data.ret !== 0) {
                    data.failureType = 'CLIENT_INVALID';
                    data.info = data.info ? data.info : '本地网络异常，请重试';
                    data.info = data.errorMessage ? data.errorMessage : '本地网络异常，请重试';
                }
                resolve(data);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    /**
     * get请求
     *
     * @param {string} url 请求路径
     * @param {*} [params={}] 请求参数
     * @returns {Subject<any>} 可订阅请求对象
     * @memberof Http
     */
    public get(url: string, params: any = {}): Promise<any> {
        if (Object.keys(params).length > 0) {
            const _strParams: string = this.transformationOpt(params);
            url = url.indexOf('?') ? `${url}&${_strParams}` : `${url}?&${_strParams}`;
        }

        const _url = url;
        this.beginLoading();
        return new Promise((resolve: any, reject: any) => {
            axios.get(_url).then((response: any) => {
                this.endLoading();
                resolve(response);
            }).catch((error: any) => {
                this.endLoading();
                reject(error);
            });
        });
    }

    /**
     * 请求参数转义处理
     *
     * @private
     * @param {*} [opt={}]
     * @returns {string}
     * @memberof Http
     */
    private transformationOpt(opt: any = {}): string {
        const params: any = {};
        const postData: string[] = [];

        const srfLoginKey = window.localStorage.getItem('srfloginkey');
        if (srfLoginKey) {
            Object.assign(params, { 'srfloginkey': srfLoginKey });
        }

        Object.assign(params, opt);
        const keys: string[] = Object.keys(params);
        keys.forEach((key: string) => {
            const val: any = params[key];
            if (val instanceof Array || val instanceof Object) {
                postData.push(`${key}=${encodeURIComponent(JSON.stringify(val))}`);
            } else {
                postData.push(`${key}=${encodeURIComponent(val)}`);
            }
        });
        return postData.join('&');
    }

    /**
     * 开始加载
     *
     * @private
     * @memberof Http
     */
    private beginLoading(): void {
        if (this.loadingCount === 0) {
            setTimeout(() => {
                this.isLoading = true;
            });
        }
        this.loadingCount++;
    }

    /**
     * 加载结束
     *
     * @private
     * @memberof Http
     */
    private endLoading(): void {
        if (this.loadingCount > 0) {
            this.loadingCount--;
        }
        if (this.loadingCount === 0) {
            setTimeout(() => {
                this.isLoading = false;
            });
        }
    }
}
// http插件
export default {
    install(v: any) {
        v.prototype.$http = Http.getInstance();
    }
};