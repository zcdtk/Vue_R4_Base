import { Vue, Component, Prop } from 'vue-property-decorator';
import './header-menus.less';

@Component({})
export default class HeaderMenus extends Vue {
    @Prop()
    public menus?: [];

    public menuClick(item: any) {
        this.$emit('menuClick', item);
    }
    
    public renderIcon(icon: string, iconcls: string) {
        if (icon && !Object.is(icon, '')) {
            return <img src={'./assets/icon/' + icon}/>;
        } else if (iconcls && !Object.is(iconcls, '')) {
            return <i class={iconcls}></i>;
        }
    }

    public render() {
        let content;
        if (this.menus) {
            content = this.menus.map((item: any[]) => {
                let menus;
                if (item instanceof Array) {
                    menus = item.map((menu: any) => {
                        return (
                            <div class='menu' on-click={() => this.menuClick(menu)}>
                                <div class='icon'>
                                    {this.renderIcon(menu.icon, menu.iconcls)}
                                </div>
                                <div class='title'>{menu.text}</div>
                            </div>
                        );
                    });
                } else {
                    console.error('数据类型错误，必须是Array。');
                }
                return (<div class='menus'>{menus}</div>);
            });
        }
        return (<div class='header-menus'>{content}</div>);
    }
}