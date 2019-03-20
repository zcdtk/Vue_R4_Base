import { Vue, Component, Provide, Prop, Watch } from 'vue-property-decorator';
import './tab-page-exp.less';

@Component({})
export default class TabPageExp extends Vue {

    @Provide()
    public styleLeft: number = 0;

    @Provide()
    public actions: any[] = [{ text: '关闭所有', value: 'closeAll' }, { text: '关闭其他', value: 'closeOther' }];

    @Watch("$route")
    public onRouteChange(newVal: any) {
        this.moveToView(newVal);
        this.$emit('change', newVal);
    }

    /**
     * 向左移动
     *
     * @memberof TabPageExp
     */
    public leftMove() {
        const scrollBody: any = this.$refs.scrollBody;
        const scrollChild: any = this.$refs.scrollChild;
        if (scrollBody && scrollChild && scrollChild.offsetWidth > scrollBody.offsetWidth) {
            if ((scrollChild.offsetWidth - scrollBody.offsetWidth + this.styleLeft) > 100) {
                this.styleLeft -= 100;
            } else {
                this.styleLeft = scrollBody.offsetWidth - scrollChild.offsetWidth;
            }
        }
    }

    /**
     * 向右移动
     *
     * @memberof TabPageExp
     */
    public rightMove() {
        if (this.styleLeft < 0) {
            if (this.styleLeft + 100 > 0) {
                this.styleLeft = 0;
            } else {
                this.styleLeft += 100;
            }
        }
    }

    /**
     * 是否选中
     *
     * @param {(string | number)} index
     * @returns
     * @memberof TabPageExp
     */
    public isActive(index: string | number) {
        const page = this.$store.state.pageTagList[index];
        if (Object.is(page.fullPath, this.$route.fullPath)) {
            return true;
        }
        return false;
    }

    /**
     * 关闭
     *
     * @param {*} event
     * @param {*} name
     * @memberof TabPageExp
     */
    public onClose(name: any) {
        this.$store.commit("deletePage", name);
        this.gotoPage();
    }

    /**
     * 是否显示关闭
     *
     * @returns
     * @memberof TabPageExp
     */
    public isClose() {
        const pageTagList = this.$store.state.pageTagList;
        if (pageTagList.length > 1) {
            return true;
        }
        return false;
    }

    /**
     * 切换分页
     *
     * @param {*} index
     * @memberof TabPageExp
     */
    public changePage(index: any) {
        this.$store.commit("setCurPage", index);
        this.gotoPage();
    }

    /**
     * 跳转页面
     *
     * @returns
     * @memberof TabPageExp
     */
    public gotoPage() {
        const length = this.$store.state.historyPathList.length;
        if (length > 0) {
            const path = this.$store.state.historyPathList[length - 1];
            if (Object.is(path, this.$route.fullPath)) {
                return;
            }
            const index = this.$store.state.pageTagList.findIndex((page: any) => Object.is(page.fullPath, path));
            if (index >= 0) {
                const page = this.$store.state.pageTagList[index];
                this.$router.push({ path: page.path, params: page.params, query: page.query });
            }
        } else {
            this.$router.push('/');
        }
    }

    /**
     * 设置当前页标题
     *
     * @param {*} caption
     * @memberof TabPageExp
     */
    public setCurPageCaption(caption: any) {
        this.$store.commit("setCurPageCaption", { caption, route: this.$route })
        setTimeout(() => {
            this.moveToView(this.$route);
        }, 1);
    }

    /**
     * 移动至指定页面标签
     *
     * @param {*} to
     * @memberof TabPageExp
     */
    public moveToView(to: any) {
        const pages: any[] = this.$store.state.pageTagList;
        let leftWidth: number = 0;
        this.$nextTick(() => {
            pages.forEach((page, index) => {
                let el = this.$refs.tagElement[index].$el;
                if (Object.is(page.fullPath, to.fullPath)) {
                    this.setLeft(el, leftWidth);
                } else {
                    leftWidth += el.offsetWidth;
                }
            });
        });
    }

    /**
     * 设置左侧边距
     *
     * @param {{ offsetWidth: number; }} tag
     * @param {number} leftWidth
     * @memberof TabPageExp
     */
    public setLeft(tag: { offsetWidth: number; }, leftWidth: number) {
        if (tag) {
            if (leftWidth < -this.styleLeft) {
                this.styleLeft = -leftWidth;
            } else if ((leftWidth + tag.offsetWidth) > (this.$refs.scrollBody.offsetWidth - this.styleLeft)) {
                this.styleLeft -= (leftWidth + tag.offsetWidth) - (this.$refs.scrollBody.offsetWidth - this.styleLeft);
            }
        }
    }

    /**
     * 执行行为操作
     *
     * @param {string} name
     * @memberof TabPageExp
     */
    public doTagAction(name: string) {
        if (Object.is(name, 'closeAll')) {
            this.$store.commit("removeAllPage");
            this.gotoPage();
        } else if (Object.is(name, 'closeOther')) {
            this.$store.commit("removeOtherPage");
            this.moveToView(this.$route);
        }
    }

    public render() {
        if (this.$store.state.pageMetas.length > 0) {
            return (
                <div class="ibiz-page-tag">
                    <div class="move-btn move-left" on-click={() => this.leftMove()}>
                        <icon type="ios-arrow-back" />
                    </div>
                    <div ref="scrollBody" class="tags-body">
                        <div ref="scrollChild" class="tags-container" style={"left: " + this.styleLeft + "px"}>
                            <transition-group name="tags-transition">
                                {this.renderTag()}
                            </transition-group>
                        </div>
                    </div>
                    <div class="move-btn move-right" on-click={() => this.rightMove()}>
                        <icon type="ios-arrow-forward" />
                    </div>
                    <dropdown on-click={(name: string) => this.doTagAction(name)} placement="bottom-end">
                        <div class="move-btn">
                            <icon type="ios-close-circle-outline" />
                        </div>
                        <dropdown-menu slot="list">
                            {this.renderDropdowItems()}
                        </dropdown-menu>
                    </dropdown >
                </div >
            );
        }
        return;
    }
    public renderDropdowItems() {
        return this.actions.map((action: any) => {
            // tslint:disable-next-line:no-unused-expression
            return <dropdown-item name={action.value}>{action.text}</dropdown-item>;
        });
    }
    public renderTag() {
        return this.$store.state.pageMetas.map((meta: any, index: number) => {
            let content;
            if (meta.imgPath && !Object.is(meta.imgPath, '')) {
                content = <img src={meta.imgPath} class="text-icon" />;
            } else {
                content = <i class={meta.iconCls}></i>;
            }
            return (
                <tag ref="tagElement" key={index} class={this.isActive(index) ? 'tag-is-active' : ''} name={index} closable on-change={() => this.changePage(index)} on-close={() => this.onClose(index)}>
                    {content}&nbsp;{meta.caption}
                </tag>
            )
        });
    }
}