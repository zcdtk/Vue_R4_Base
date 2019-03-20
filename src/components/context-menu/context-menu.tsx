class ContextMenuService {
    /**
     * 容器Dom对象
     *
     * @private
     * @memberof ContextMenuService
     */
    private container: Element | undefined;

    constructor() {
        document.addEventListener('click', () => {
            this.clearContainer();
        });
    }

    public setContainer(container: Element) {
        if (container) {
            this.clearContainer();
            this.container = container;
        } else {
            console.error('容器Dom节点不存在');
        }
    }

    public clearContainer() {
        if (this.container) {
            this.container.remove();
        }
    }
}

const service = new ContextMenuService();

import { Vue, Component, Provide, Prop } from 'vue-property-decorator';
import './context-menu.less';

// tslint:disable-next-line:max-classes-per-file
@Component({})
export default class ContextMenu extends Vue {
    /**
     * 设置右键菜单Class
     *
     * @type {string}
     * @memberof ContextMenu
     */
    @Prop()
    public contextMenuClass?: string;
    /**
     * 设置右键菜单Style
     *
     * @type {*}
     * @memberof ContextMenu
     */
    @Prop()
    public contextMenuStyle?: any;
    /**
     * 右键菜单数据，在调用renderContent时会传回去。
     *
     * @type {*}
     * @memberof ContextMenu
     */
    @Prop()
    public data?: any;
    /**
     * 用于绘制右键菜单内容
     *
     * @type {any}
     * @memberof ContextMenu
     */
    @Prop()
    public renderContent?: any;

    /**
     * 显示右键菜单
     *
     * @param {*} x x轴坐标
     * @param {*} y y轴坐标
     */
    public showContextMenu(x: number, y: number) {
        const hTMLCollection = document.getElementsByTagName('body');
        if (hTMLCollection.length > 0) {
            const body = hTMLCollection.item(0);
            if (body) {
                // 创建全屏覆盖容器
                const container = document.createElement('div');
                service.setContainer(container);
                container.oncontextmenu = (event) => {
                    container.remove();
                };
                body.appendChild(container);
                // 创建Vue实例挂载
                const mount = document.createElement('div');
                container.appendChild(mount);
                this.renderContextMenu({
                    top: y + 'px',
                    left: x + 'px'
                }, mount, container);
            }
        }
    }
    /**
     * 绘制菜单
     *
     * @param {*} position 菜单显示位置
     * @param {*} mount Vue实例挂载
     * @param {*} container 容器
     * @returns
     */
    public renderContextMenu(position: any, mount: any, container: any) {
        const self = this;
        new Vue({
            methods: {
                destroy($event: Event) {
                    container.remove();
                    this.$destroy();
                    $event.stopPropagation();
                }
            },
            render() {
                return (
                    <div class='context-menu-container' on-click={($event: Event) => this.destroy($event)}>
                        <div class='context-menu-content' style={position}>
                            {self.renderContent ? self.renderContent(self.data) : self.$slots.content}
                        </div>
                    </div>
                );
            }
        }).$mount(mount);
    }

    public mounted() {
        const contextRef: any = this.$refs.context;
        if (contextRef) {
            contextRef.oncontextmenu = (event: any) => {
                this.showContextMenu(event.clientX, event.clientY);
            };
        }
    }

    public render() {
        return (
            <div class={'context-menu-component ' + this.contextMenuClass} style={this.contextMenuStyle} ref='context'>
                {this.$slots.default}
            </div>
        );
    }
}