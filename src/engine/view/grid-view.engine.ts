import ViewEngine from './view.engine';

/**
 * 视图引擎基础
 *
 * @export
 * @class GridViewEngine
 */
export default class GridViewEngine extends ViewEngine {
    /**
     * 表格部件
     *
     * @type {*}
     * @memberof GridViewEngine
     */
    protected grid: any;
    /**
     * 表单部件
     *
     * @type {*}
     * @memberof GridViewEngine
     */
    protected searchForm: any;
    /**
     * 打开数据
     *
     * @type {*}
     * @memberof GridViewEngine
     */
    protected openData?: (params: any) => void;
    /**
     * 新建数据
     *
     * @protected
     * @memberof GridViewEngine
     */
    protected newData?: (params: any) => void;

    /**
     * Creates an instance of GridViewEngine.
     * @memberof GridViewEngine
     */
    constructor() {
        super();
    }

    /**
     * 引擎初始化
     *
     * @param {*} [options={}]
     * @memberof GridViewEngine
     */
    public init(options: any = {}): void {
        this.grid = options.grid;
        this.searchForm = options.searchform;
        this.openData = options.opendata;
        this.newData = options.newdata;
        super.init(options);
    }

    /**
     * 
     *
     * @param {string} ctrlName
     * @param {string} eventName
     * @param {*} [args={}]
     * @memberof ViewEngineBase
     */
    public onCtrlEvent(ctrlName: string, eventName: string, args: any = {}): void {
        if (Object.is(ctrlName, 'grid')) {
            this.gridEvent(eventName, args);
        }
        super.onCtrlEvent(ctrlName, eventName, args);
    }

    /**
     * 
     *
     * @param {string} eventName
     * @param {*} [args={}]
     * @memberof GridViewEngine
     */
    public gridEvent(eventName: string, args: any = {}): void {
        if (Object.is(eventName, 'rowClick')) {
            // this.***()
        }
        if (Object.is(eventName, 'rowdblclick')) {
            this.doEdit(args);
        }
        if (Object.is(eventName, 'selectionChange')) {
            // this.***()
        }
    }

    /**
     * 处理实体界面行为
     *
     * @param {string} tag
     * @param {string} [actionmode]
     * @returns {void}
     * @memberof GridViewEngine
     */
    public doSysUIAction(tag: string, actionmode?: string): void {
        // if (Object.is(tag, 'Help')) {
        //     this.doHelp(params);
        //     return;
        // }
        if (Object.is(tag, 'Edit')) {
            this.doEdit();
            return;
        }
        // if (Object.is(tag, 'View')) {
        //     this.doView(params);
        //     return;
        // }
        // if (Object.is(tag, 'Print')) {
        //     this.doPrint(params);
        //     return;
        // }
        // if (Object.is(tag, 'ExportExcel')) {
        //     this.doExportExcel(params);
        //     return;
        // }
        // if (Object.is(tag, 'ExportModel')) {
        //     this.doExportModel(params);
        //     return;
        // }
        // if (Object.is(tag, 'Copy')) {
        //     this.doCopy(params);
        //     return;
        // }
        // if (Object.is(tag, 'Remove')) {
        //     this.doRemove(params);
        //     return;
        // }
        // if (Object.is(tag, 'Import')) {
        //     this.doImport(params);
        //     return;
        // }
        // if (Object.is(tag, 'Refresh')) {
        //     this.doRefresh(params);
        //     return;
        // }
        // if (Object.is(tag, 'NewRow')) {
        //     this.doCheck(params);
        //     return;
        // }
        // if (Object.is(tag, 'SaveAllEditRow')) {
        //     this.doSaveAllEditRow(params);
        //     return;
        // }
        if (Object.is(tag, 'New')) {
            this.doNew();
            return;
        }
        // if (Object.is(tag, 'OpenRowEdit')) {
        //     this.doOpenRowEdit(params);
        //     return;
        // }
        // if (Object.is(tag, 'CloseRowEdit')) {
        //     this.doCloseRowEdit(params);
        //     return;
        // }
        // if (Object.is(tag, 'ToggleRowEdit')) {
        //     this.doToggleRowEdit(params);
        //     return;
        // }
        // if (Object.is(tag, 'ToggleFilter')) {
        //     this.doToggleFilter(params);
        //     return;
        // }
        super.doSysUIAction(tag, actionmode);
    }

    /**
     * 多数据项界面_编辑操作
     *
     * @param {*} [params={}]
     * @returns {void}
     * @memberof GridViewEngine
     */
    public doEdit(params: any = {}): void {
        // 获取要编辑的数据集合
        if (params && params.srfkey) {
            if (this.isFunc(this.getGrid().findItem)) {
                params = this.getGrid().findItem('srfkey', params.srfkey);
            }
            const arg = { data: params };
            this.onEditData(arg);
            return;
        }
        if (this.isFunc(this.getGrid().getSelection)) {
            const selectedData = this.getGrid().getSelection();
            if (selectedData == null || selectedData.length === 0) {
                return;
            }
            this.onEditData({ data: selectedData[0] });
        }
    }

    /**
     * 编辑数据
     *
     * @param {*} arg
     * @memberof GridViewEngine
     */
    public onEditData(arg: any): void {
        const loadParam: any = {};
        // if (this.getViewParam()) {
        //     Object.assign(loadParam, this.getViewParam());
        // }
        // if (this.getParentMode()) {
        //     Object.assign(loadParam, this.getParentMode());
        // }
        // if (this.getParentData()) {
        //     Object.assign(loadParam, this.getParentData());
        // }

        if (arg.srfcopymode) {
            Object.assign(loadParam, {
                srfsourcekey: arg.data.srfkey
            });
        } else {
            Object.assign(loadParam, { srfkey: arg.data.srfkey, srfdeid: arg.data.srfdeid });
        }
        if (this.openData && this.isFunc(this.openData)) {
            this.openData(loadParam);
        }
    }

    /**
     * 多数据项界面_新建操作
     *
     * @param {*} [params={}]
     * @memberof GridViewEngine
     */
    public doNew(params: any = {}): void {
        this.onNewData();
    }

    /**
     * 新建数据
     *
     * @returns {void}
     * @memberof GridViewEngine
     */
    public onNewData(): void {

        let loadParam: any = {};
        // if (this.getViewParam()) {
        //     Object.assign(loadParam, this.getViewParam());
        // }
        // if (this.getParentMode()) {
        //     Object.assign(loadParam, this.getParentMode());
        // }
        // if (this.getParentData()) {
        //     Object.assign(loadParam, this.getParentData());
        // }
        // if (this.isEnableRowEdit() && (this.getMDCtrl() && this.getMDCtrl().getOpenEdit())) {
        //     this.doNewRow(loadParam);
        //     return;
        // }
        // if (this.isEnableBatchAdd()) {
        //     this.doNewDataBatch(loadParam);
        //     return;
        // }
        // if (this.doNewDataWizard(loadParam)) {
        //     return;
        // }

        this.doNewDataNormal(loadParam);
    }

    /**
     * 常规新建数据
     *
     * @param {*} arg
     * @returns {*}
     * @memberof GridViewEngine
     */
    public doNewDataNormal(arg: any): any {

        // let view = this.getNewDataView(arg);
        // if (view == null) {
        //     return false;
        // }
        // const openMode = view.openMode;
        // if (!openMode || Object.is(openMode, '')) {
        //     view.openMode = 'INDEXVIEWTAB';
        // }
        // if (!view.state) {
        //     view.state = 'new';
        //     let viewParam: any = {};
        //     Object.assign(viewParam, view.viewParam);

        //     if (viewParam && viewParam.srfnewmode && !Object.is(viewParam.srfnewmode, '')) {
        //         const srfnewmode: string = viewParam.srfnewmode.split('@').join('__');
        //         view.state = view.state + '_' + srfnewmode.toLowerCase();
        //     }
        // }
        return this.openDataView(arg);
    }


    public openDataView(view: any = {}): boolean {

        const openMode = view.openMode;

        // if (view.redirect) {
        //     this.redirectOpenView(view);
        //     return false;
        // }

        if (openMode != undefined) {
            if (openMode == 'POPUPMODAL') {
                view.modal = true;
            } else if (openMode == 'POPUP') {
                view.modal = true;
            } else if (openMode == '' || openMode == 'INDEXVIEWTAB') {
                view.modal = false;
            }
        }

        // if (view.modal) {
        //     let modalview = this.openModal(view);
        //     modalview.subscribe((result: any) => {
        //         if (result && Object.is(result.ret, 'OK')) {
        //             this.onRefresh();
        //         }
        //     });
        //     return true;
        // } 
        // else {
        //     this.openWindow(view.viewurl, view.viewparam);
        // }

        if (this.newData && this.isFunc(this.newData)) {
            this.newData({});
        }

        return true;
    }

    /**
     * 表格部件
     *
     * @returns {any}
     * @memberof GridViewEngine
     */
    public getGrid(): any {
        if (!this.grid) {
            throw new Error('grid部件不存在');
        }
        return this.grid;
    }

}