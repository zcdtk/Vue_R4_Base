/**
 * IBizSys平台工具类
 * 
 * @export
 * @class Util
 */
export class Util {

    /**
     * 错误提示信息
     * 
     * @static
     * @type {string}
     * @memberof Util
     */
    public static errorInfo: string = '';

    /**
     * 创建 UUID
     *
     * @static
     * @returns {string}
     * @memberof Util
     */
    public static createUUID(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /**
     * 判断是否为一个函数
     *
     * @static
     * @param {*} func
     * @returns {boolean}
     * @memberof Util
     */
    public static isFunction(func: any): boolean {
        return typeof (func) === 'function';
    }

    /**
     * 判断条件是否成立
     * 
     * @static
     * @param {*} value 
     * @param {*} op 
     * @param {*} value2 
     * @returns {boolean} 
     * @memberof Util
     */
    public static testCond(value: any, op: any, value2: any): boolean {
        // 等于操作
        if (Object.is(op, 'EQ')) {
            return value === value2;
        }
        // 大于操作
        if (Object.is(op, 'GT')) {
            const result: number = this.compare(value, value2);
            if (result !== undefined && result > 0) {
                return true;
            } else {
                return false;
            }
        }
        // 大于等于操作
        if (Object.is(op, 'GTANDEQ')) {
            const result: number = this.compare(value, value2);
            if (result !== undefined && result >= 0) {
                return true;
            } else {
                return false;
            }
        }
        // 值包含在给定的范围中
        if (Object.is(op, 'IN')) {
            return this.contains(value, value2);
        }
        // 不为空判断操作
        if (Object.is(op, 'ISNOTNULL')) {
            return (value != null && value !== '');
        }
        // 为空判断操作
        if (Object.is(op, 'ISNULL')) {
            return (value == null || value === '');
        }
        // 文本左包含
        if (Object.is(op, 'LEFTLIKE')) {
            return (value && value2 && (value.toUpperCase().indexOf(value2.toUpperCase()) === 0));
        }
        // 文本包含
        if (Object.is(op, 'LIKE')) {
            return (value && value2 && (value.toUpperCase().indexOf(value2.toUpperCase()) !== -1));
        }
        // 小于操作
        if (Object.is(op, 'LT')) {
            const result: number = this.compare(value, value2);
            if (result !== undefined && result < 0) {
                return true;
            } else {
                return false;
            }
        }
        // 小于等于操作
        if (Object.is(op, 'LTANDEQ')) {
            const result: number = this.compare(value, value2);
            if (result !== undefined && result <= 0) {
                return true;
            } else {
                return false;
            }
        }
        // 不等于操作
        if (Object.is(op, 'NOTEQ')) {
            return value !== value2;
        }
        // 值不包含在给定的范围中
        if (Object.is(op, 'NOTIN')) {
            return !this.contains(value, value2);
        }
        // 文本右包含
        if (Object.is(op, 'RIGHTLIKE')) {
            if (!(value && value2)) {
                return false;
            }
            const nPos = value.toUpperCase().indexOf(value2.toUpperCase());
            if (nPos === -1) {
                return false;
            }
            return nPos + value2.length === value.length;
        }
        // 空判断
        if (Object.is(op, 'TESTNULL')) {

        }
        // 自定义包含
        if (Object.is(op, 'USERLIKE')) {

        }
        return false;
    }

    /**
     * 文本包含
     * 
     * @static
     * @param {any} value 
     * @param {any} value2 
     * @returns {boolean} 
     * @memberof Util
     */
    public static contains(value: any, value2: any): boolean {
        if (value && value2) {
            // 定义一数组
            let arr = new Array();
            arr = value2.split(',');
            // 定义正则表达式的连接符
            const S = String.fromCharCode(2);
            const reg = new RegExp(S + value + S);
            return (reg.test(S + arr.join(S) + S));
        }
        return false;
    }

    /**
     * 值比较
     * 
     * @static
     * @param {*} value 
     * @param {*} value2 
     * @returns {number} 
     * @memberof Util
     */
    public static compare(value: any, value2: any): number {
        let result: any;
        if (!Object.is(value, '') && !Object.is(value2, '') && !isNaN(value) && !isNaN(value2)) {
            result = this.compareNumber(parseFloat(value), parseFloat(value2));
        } else if (this.isParseDate(value) && this.isParseDate(value2)) {
            result = this.compareDate((new Date(value)).getTime(), (new Date(value2)).getTime());
        } else if (value && (typeof (value) === 'boolean' || value instanceof Boolean)) {
            result = this.compareBoolean(value, value2);
        } else if (value && (typeof (value) === 'string' || value instanceof String)) {
            result = this.compareString(value, value2);
        }
        return result;
    }

    /**
     * 是否是时间
     *
     * @static
     * @param {string} value
     * @returns {boolean}
     * @memberof Util
     */
    public static isParseDate(value: string): boolean {
        const time = new Date(value);
        if (isNaN(time.getTime())) {
            return false;
        }
        return true;
    }

    /**
     * 时间值比较（毫秒数）
     *
     * @static
     * @param {number} value
     * @param {number} value2
     * @returns {number}
     * @memberof Util
     */
    public static compareDate(value: number, value2: number): number {
        if (value > value2) {
            return 1;
        } else if (value < value2) {
            return -1;
        } else {
            return 0;
        }
    }

    /**
     * 数值比较
     *
     * @static
     * @param {number} value
     * @param {number} value2
     * @returns {number}
     * @memberof Util
     */
    public static compareNumber(value: number, value2: number): number {
        if (value > value2) {
            return 1;
        } else if (value < value2) {
            return -1;
        } else {
            return 0;
        }
    }

    /**
     * 字符串比较
     *
     * @static
     * @param {*} value
     * @param {*} value2
     * @returns {number}
     * @memberof Util
     */
    public static compareString(value: any, value2: any): number {
        return value.localeCompare(value2);
    }

    /**
     * boolean 值比较
     *
     * @static
     * @param {*} value
     * @param {*} value2
     * @returns {number}
     * @memberof Util
     */
    public static compareBoolean(value: any, value2: any): number {
        if (value === value2) {
            return 0;
        } else {
            return -1;
        }
    }

    /**
     *
     *
     * @static
     * @param {*} [o={}]
     * @memberof Util
     */
    public static processResult(o: any = {}): void {
        if (o.url != null && o.url !== '') {
            window.location.href = o.url;
        }
        if (o.code != null && o.code !== '') {
            // tslint:disable-next-line:no-eval
            eval(o.code);
        }

        if (o.downloadurl != null && o.downloadurl !== '') {
            const downloadurl = this.parseURL2(o.downloadurl, '');
            this.download(downloadurl);
        }
    }

    /**
     * 下载文件
     * 
     * @static
     * @param {string} url 
     * @memberof Util
     */
    public static download(url: string): void {
        window.open(url, '_blank');
    }

    /**
     * 
     * 
     * @static
     * @param {any} url 
     * @param {any} params 
     * @returns {string} 
     * @memberof Util
     */
    public static parseURL2(url: string, params: any): string {
        let tmpURL;
        if (url.indexOf('../../') !== -1) {
            tmpURL = url.substring(url.indexOf('../../') + 6, url.length);
        } else if (url.indexOf('/') === 0) {
            tmpURL = url.substring(url.indexOf('/') + 1, url.length);
        } else {
            tmpURL = url;
        }

        if (params) {
            return tmpURL + (url.indexOf('?') === -1 ? '?' : '&');
        } else {
            return tmpURL;
        }
    }

    /**
     * 是否是数字
     * 
     * @param {*} num 
     * @returns {boolean} 
     * @memberof Util
     */
    public static isNumberNaN(num: any): boolean {
        return Number.isNaN(num) || num !== num;
    }

    /**
     * 是否未定义
     * 
     * @static
     * @param {*} value 
     * @returns {boolean} 
     * @memberof Util
     */
    public static isUndefined(value: any): boolean {
        return typeof value === 'undefined';
    }

    /**
     * 是否为空
     * 
     * @static
     * @param {*} value 
     * @returns {boolean} 
     * @memberof Util
     */
    public static isEmpty(value: any): boolean {
        return this.isUndefined(value) || Object.is(value, '') || value === null || value !== value;
    }

    /**
     * 检查属性常规条件
     *
     * @static
     * @param {*} value 属性值
     * @param {string} op 检测条件
     * @param {*} value2 预定义值
     * @param {string} errorInfo 错误信息
     * @param {string} paramType 参数类型
     * @param {*} form 表单对象
     * @param {boolean} primaryModel 是否必须条件
     * @returns {boolean}
     * @memberof Util
     */
    public static checkFieldSimpleRule(value: any, op: string, value2: any, errorInfo: string, paramType: string, form: any, primaryModel: boolean): boolean {
        if (Object.is(paramType, 'CURTIME')) {
            value2 = `${new Date()}`;
        }
        if (Object.is(paramType, 'ENTITYFIELD')) {
            value2 = value2 ? value2.toLowerCase() : '';
            const _value2Field = form.findFormItem(value2);
            if (!_value2Field) {
                this.errorInfo = `表单项${value2}未配置`;
                return true;
            }
            value2 = _value2Field.getValue();
        }
        if (this.isEmpty(errorInfo)) {
            errorInfo = '内容必须符合值规则';
        }
        this.errorInfo = errorInfo;
        const result = this.testCond(value, op, value2);
        if (!result) {
            if (primaryModel) {
                throw new Error(this.errorInfo);
            }
        }
        return !result;
    }

    /**
     * 检查属性字符长度规则
     * 
     * @static
     * @param {*} viewValue 
     * @param {number} minLength 
     * @param {boolean} indexOfMin 
     * @param {number} maxLength 
     * @param {boolean} indexOfMax 
     * @param {string} errorInfo 
     * @param {boolean} primaryModel 
     * @returns {boolean} 
     * @memberof Util
     */
    public static checkFieldStringLengthRule(viewValue: string, minLength: number, indexOfMin: boolean, maxLength: number, indexOfMax: boolean, errorInfo: string, primaryModel: boolean): boolean {
        if (this.isEmpty(errorInfo)) {
            this.errorInfo = '内容长度必须符合范围规则';
        } else {
            this.errorInfo = errorInfo;
        }

        const isEmpty = Util.isEmpty(viewValue);
        if (isEmpty) {
            if (primaryModel) {
                throw new Error('值为空');
            }
            this.errorInfo = '值为空';
            return true;
        }

        const viewValueLength: number = viewValue.length;

        // 小于等于
        if (minLength !== null) {
            if (indexOfMin) {
                if (viewValueLength < minLength) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            } else {
                if (viewValueLength <= minLength) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
        }

        //  大于等于
        if (maxLength !== null) {
            if (indexOfMax) {
                if (viewValueLength > maxLength) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            } else {
                if (viewValueLength >= maxLength) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
        }

        this.errorInfo = '';
        return false;
    }

    /**
     * 检查属性值正则式规则
     * 
     * @static
     * @param {string} viewValue 属性值
     * @param {*} strReg 验证正则
     * @param {string} errorInfo 错误信息
     * @param {boolean} primaryModel 是否关键条件
     * @returns {boolean} 
     * @memberof Util
     */
    public static checkFieldRegExRule(viewValue: string, strReg: any, errorInfo: string, primaryModel: boolean): boolean {
        if (this.isEmpty(errorInfo)) {
            this.errorInfo = '值必须符合正则规则';
        } else {
            this.errorInfo = errorInfo;
        }
        const isEmpty = Util.isEmpty(viewValue);
        if (isEmpty) {
            if (primaryModel) {
                throw new Error('值为空');
            }
            this.errorInfo = '值为空';
            return true;
        }
        const regExp = new RegExp(strReg);
        if (!regExp.test(viewValue)) {
            if (primaryModel) {
                throw new Error(this.errorInfo);
            }
            return true;
        }

        this.errorInfo = '';
        return false;
    }

    /**
     * 检查属性值范围规则
     * 
     * @static
     * @param {string} viewValue 属性值
     * @param {*} minNumber 最小数值
     * @param {boolean} indexOfMin 是否包含最小数值
     * @param {*} maxNumber 最大数值
     * @param {boolean} indexOfMax 是否包含最大数值
     * @param {string} errorInfo 错误信息
     * @param {boolean} primaryModel 是否关键条件
     * @returns {boolean} 
     * @memberof Util
     */
    public static checkFieldValueRangeRule(viewValue: string, minNumber: any, indexOfMin: boolean, maxNumber: any, indexOfMax: boolean, errorInfo: string, primaryModel: boolean): boolean {

        if (this.isEmpty(errorInfo)) {
            this.errorInfo = '值必须符合值范围规则';
        } else {
            this.errorInfo = errorInfo;
        }

        const isEmpty = Util.isEmpty(viewValue);
        if (isEmpty) {
            if (primaryModel) {
                throw new Error('值为空');
            }
            this.errorInfo = '值为空';
            return true;
        }

        const valueFormat = this.checkFieldRegExRule(viewValue, /^-?\d*\.?\d+$/, '', primaryModel);
        if (valueFormat) {
            return true;
        } else {
            this.errorInfo = errorInfo;
        }

        const data = Number.parseFloat(viewValue);

        // 小于等于
        if (minNumber !== null) {
            if (indexOfMin) {
                if (data < minNumber) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            } else {
                if (data <= minNumber) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
        }

        // //大于等于
        if (maxNumber != null) {
            if (indexOfMax) {
                if (data > maxNumber) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            } else {
                if (data >= maxNumber) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
        }

        this.errorInfo = '';
        return false;
    }

    /**
     * 检查属性值系统值范围规则  暂时支持正则表达式
     * 
     * @static
     * @param {string} viewValue 属性值
     * @param {*} strReg 正则
     * @param {string} errorInfo  错误信息
     * @param {boolean} primaryModel 是否关键条件
     * @returns {boolean} 
     * @memberof Util
     */
    public static checkFieldSysValueRule(viewValue: string, strReg: any, errorInfo: string, primaryModel: boolean): boolean {
        return this.checkFieldRegExRule(viewValue, strReg, errorInfo, primaryModel);
    }

    /**
     * 将文本格式的xml转换为dom模式
     * 
     * @static
     * @param {string} strXml 
     * @memberof Util
     */
    public static parseXML(strXml: string): Document | undefined {
        if (strXml) {
            return new DOMParser().parseFromString(strXml, 'text/xml');
        }
        return undefined;
    }

    /**
     * 将xml转换为object对象
     * 
     * @static
     * @param {*} node 
     * @param {*} [obj={}] 
     * @memberof Util
     */
    public static loadXMLNode(node: any, obj: any = {}): void {
        if (node && node.attributes) {
            const arr: any = node.attributes;
            for (let i = 0; i < arr.length; i++) {
                let A = arr.item(i).name;
                const B = arr.item(i).value;
                A = A.toLowerCase();
                obj[A] = B;
            }
        }
    }

    /**
     * 将object转换为xml对象
     * 
     * @static
     * @param {any} XML 
     * @param {any} obj 
     * @memberof Util
     */
    public static saveXMLNode(XML: any, obj: any) {
        const keys: string[] = Object.keys(obj);
        keys.forEach((key: string) => {
            const value = obj[key];
            if (!value || value instanceof Object || typeof (value) === 'function') {
                return;
            }
            const proValue = value.toString();
            if (proValue !== '') {
                XML.attrib(key, proValue);
            }
        });
    }

    /**
     * 格式化矩阵参数
     *
     * @static
     * @param {string} param
     * @returns {any}
     * @memberof Util
     */
    public static formatMatrixParse(param: string): any {
        const obj: any = {};
        if (obj && typeof (param) === 'string') {
            param = decodeURIComponent(param);
            const params: string[] = param.split(';');
            params.forEach((str: string) => {
                if (str.includes('=')) {
                    const arr: string[] = str.split('=');
                    if (arr.length >= 2) {
                        const key: string = arr[0];
                        if (!Object.is(key, '')) {
                            const val: string = arr[1];
                            obj[key] = val;
                        }
                    }
                }
            });
        }
        return obj;
    }

    /**
     * 转换为矩阵参数
     *
     * @static
     * @param {any} obj
     * @returns {string}
     * @memberof Util
     */
    public static formatMatrixStringify(obj: any): string {
        let str: string = '';
        if (obj && !(obj instanceof Array) && (obj instanceof Object)) {
            const keys: string[] = Object.keys(obj);
            keys.forEach((key: string) => {
                str += `${key}=${obj[key]};`;
            });
        }
        return encodeURIComponent(str);
    }

    /**
     * 格式化Url参数
     *
     * @static
     * @param {*} [params={}]
     * @returns {string}
     * @memberof Util
     */
    public static urlEncode(params: any = {}): string {
        let str: string = '';
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const val = params[key];
                str += `${key}=${encodeURIComponent(val)}&`;
            }
        }
        return str;
    }

    /**
     * 清除用户信息缓存
     *
     * @static
     * @memberof Util
     */
    public static clearUserInfo(): void {
        window.localStorage.removeItem('userinfo');
        window.localStorage.removeItem('srfloginkey');
    }

    /**
     * 检查返回数据
     *
     * @param {*} res
     * @returns {boolean}
     * @memberof Util
     */
    public static checkRes(res: any): boolean {
        return (res && res.ret === 0) ? true : false;
    } 

}
