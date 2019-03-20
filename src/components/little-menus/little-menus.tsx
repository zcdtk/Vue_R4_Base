import { Vue, Component, Prop } from 'vue-property-decorator';
import './little-menus.less';

@Component({})
export default class LittleMenus extends Vue {
    /**
     * 菜单数据
     *
     * @type {[]}
     * @memberof LittleMenus
     */
    @Prop()
    public menus?: [];
    /**
     * 悬浮框显示位置
     *
     * @type {string}
     * @memberof LittleMenus
     */
    @Prop()
    public placement?: string;

    public menuClick(item: any) {
        this.$emit('menuClick', item);
    }

    public renderIcon(icon: string, iconcls: string) {
        if (icon && !Object.is(icon, '')) {
            return <img src={'./assets/icon/' + icon} />;
        } else if (iconcls && !Object.is(iconcls, '')) {
            return <i class={iconcls}></i>;
        }
    }

    public render() {
        let menus;
        if (this.menus) {
            menus = this.menus.map((menu: any) => {
                if (menu.hidden) {
                    return;
                }
                if (menu.type && Object.is(menu.type, 'seperator')) {
                    return <div class='line'></div>;
                }
                return (
                    <el-tooltip slot='reference' class='item' effect='dark' content={menu.tooltip} placement={this.placement}>
                        <div class='item' on-click={() => this.menuClick(menu)}>
                            {this.renderIcon(menu.icon, menu.iconcls)}
                        </div>
                    </el-tooltip>
                );
            });
        }
        return (
            <div class='little-menus'>
                {menus}
            </div>
        );
    }
}