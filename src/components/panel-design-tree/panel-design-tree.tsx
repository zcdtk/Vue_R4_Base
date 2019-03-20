import { PanelDesignControl } from './PanelDesignControl';
import { Component, Prop, Provide, Vue } from 'vue-property-decorator';
import './panel-design-tree.less';

@Component({})
export default class PanelDesignTree extends Vue {
    /**
     * 树组件ref实例
     *
     * @private
     * @type {*}
     * @memberof PanelDesignTree
     */
    private get tree(): any {
        return this.$refs.tree;
    }
    /**
     * 树节点信息
     *
     * @type {any[]}
     * @memberof PanelDesignTree
     */
    @Provide()
    private panelDesignControl: PanelDesignControl = new PanelDesignControl();

    /**
     * 绘制树内容
     *
     * @param {*} h
     * @param {*} context
     * @returns
     * @memberof PanelDesignTree
     */
    public renderContent(h: any, context: any) {
        const { node, data } = context;
        return (
            <context-menu contextMenuStyle={{ width: '100%' }} data={node} renderContent={this.renderContextMenu}>
                <div class='ibiz-tree-node'>
                    <label><i class={data.iconcls}></i> {data.text}</label>
                    <div class='ibiz-tree-node-buttons'>
                        <div class='button-item'>
                            {
                                data.leaf ? null : <el-popover placement='right' popper-class="panel-design-popover">
                                    {this.renderPopoverContent(node, data)}
                                    <span slot='reference'><i class='el-icon-plus'></i></span>
                                </el-popover>
                            }
                        </div>
                    </div>
                </div>
            </context-menu>
        );
    }

    /**
     * 绘制右击菜单
     *
     * @param {*} data
     * @returns
     * @memberof PanelDesignTree
     */
    public renderContextMenu(data: any) {
        return <ul class='popover-menus'>
            <li class='popover-menus-item' on-click={() => this.removeNode(data)}>
                <div class="icon">
                    <i class="fa fa-trash-o"></i>
                </div>
                <div class="text">
                    删除
                </div>
            </li>
        </ul>;
    }

    /**
     * 悬浮窗按钮点击
     *
     * @private
     * @param {*} node
     * @param {*} menu
     * @memberof PanelDesignTree
     */
    private popoverMenuClick(node: any, menu: any): void {
        this.addChildNode(node, menu);
    }

    /**
     * 绘制悬浮窗内容
     *
     * @param {*} node
     * @param {*} data
     * @returns {*}
     * @memberof PanelDesignTree
     */
    public renderPopoverContent(node: any, data: any): any {
        const menus: any[] = this.panelDesignControl.filterPanelItems(data.tag.itemtype) || [];
        return <el-card class='popover-card'>
            <div slot='header' class='popover-card-header'>
                <span>新建</span>
            </div>
            <div class='popover-card-content'>
                <ul class='popover-menus'>{menus.map((menu) => {
                    return <li class='popover-menus-item' on-click={() => this.popoverMenuClick(node, menu)}>
                        <div class="icon">
                            <i class={menu.iconcls}></i>
                        </div>
                        <div class="text">
                            {menu.text}
                        </div>
                    </li>;
                })}
                </ul>
            </div>
        </el-card>;
    }

    /**
     * 删除节点
     *
     * @param {*} data
     * @memberof PanelDesignTree
     */
    public removeNode(data: any): void {
        if (this.tree) {
            this.tree.remove(data);
        }
    }

    /**
     * 手动项树添加子数据
     *
     * @param {*} node
     * @param {*} data
     * @memberof PanelDesignTree
     */
    public addChildNode(node: any, data: any): void {
        if (this.tree) {
            this.tree.append(data, node);
        }
    }

    /**
     * 绘制
     *
     * @returns
     * @memberof PanelDesignTree
     */
    public render() {
        return (
            <context-menu-container class='panel-design-tree'>
                <el-tree
                    ref='tree'
                    class='ibiz-tree'
                    data={this.panelDesignControl.treeNodes}
                    node-key='srfkey'
                    default-expand-all={true}
                    expand-on-click-node={false}
                    render-content={this.renderContent}>
                </el-tree>
            </context-menu-container>
        );
    }
}