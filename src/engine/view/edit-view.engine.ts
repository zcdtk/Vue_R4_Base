import ViewEngine from './view.engine';

/**
 *
 *
 * @export
 * @class EditViewEngine
 * @extends {ViewEngine}
 */
export default class EditViewEngine extends ViewEngine {
    /**
     * 表单部件
     *
     * @protected
     * @type {*}
     * @memberof EditViewEngine
     */
    protected form: any;

    /**
     * 
     *
     * @param {*} options
     * @memberof EditViewEngine
     */
    public init(options: any): void {
        this.form = options.form;
    }

    /**
     * 处理实体界面行为
     *
     * @param {string} tag
     * @param {string} [actionmode]
     * @returns {void}
     * @memberof EditViewEngine
     */
    public doSysUIAction(tag: string, actionmode?: string): void {
        // if (Object.is(tag, 'Help')) {
        //     this.doHelp();
        //     return;
        // }
        // if (Object.is(tag, 'SaveAndStart')) {
        //     this.doSaveAndStart();
        //     return;
        // }
        // if (Object.is(tag, 'SaveAndExit')) {
        //     this.doSaveAndExit();
        //     return;
        // }
        // if (Object.is(tag, 'SaveAndNew')) {
        //     this.doSaveAndNew();
        //     return;
        // }
        if (Object.is(tag, 'Save')) {
            this.doSave();
            return;
        }
        // if (Object.is(tag, 'Print')) {
        //     this.doPrint();
        //     return;
        // }
        // if (Object.is(tag, 'Copy')) {
        //     this.doCopy();
        //     return;
        // }
        // if (Object.is(tag, 'RemoveAndExit')) {
        //     this.doRemoveAndExit();
        //     return;
        // }
        // if (Object.is(tag, 'Refresh')) {
        //     this.doRefresh();
        //     return;
        // }
        // if (Object.is(tag, 'New')) {
        //     this.doNew();
        //     return;
        // }
        // if (Object.is(tag, 'FirstRecord')) {
        //     this.doMoveToRecord('first');
        //     return;
        // }
        // if (Object.is(tag, 'PrevRecord')) {
        //     this.doMoveToRecord('prev');
        //     return;
        // }
        // if (Object.is(tag, 'NextRecord')) {
        //     this.doMoveToRecord('next');
        //     return;
        // }
        // if (Object.is(tag, 'LastRecord')) {
        //     this.doMoveToRecord('last');
        //     return;
        // }
        // if (Object.is(tag, 'Exit') || Object.is(tag, 'Close')) {
        //     this.doExit();
        //     return;
        // }
        super.doSysUIAction(tag, actionmode);
    }

    /**
     * 编辑界面_保存操作
     * 
     * @memberof IBizEditViewController
     */
    public doSave(): void {
        // this.afterformsaveaction = '';
        this.saveData({});
    }

    /**
     * 保存视图数据
     *
     * @param {*} [arg={}]
     * @memberof EditViewEngine
     */
    public saveData(arg: any = {}): void {
        if (this.isFunc(this.getForm().save)) {
            this.getForm().save(arg);
        }
    }

    /**
     * 
     *
     * @returns {*}
     * @memberof EditViewEngine
     */
    public getForm(): any {
        if (!this.form) {
            throw new Error('form控件不存在');
        }
        return this.form;
    }

}