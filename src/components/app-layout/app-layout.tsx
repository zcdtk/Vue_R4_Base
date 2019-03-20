import { Vue, Component, Provide } from 'vue-property-decorator';
import './app-layout.less';

@Component({})
export default class AppLayout extends Vue {
    @Provide()
    public isShowLeft: boolean = true;
    @Provide()
    public isShowRight: boolean = true;
    
    private leftShowChange() {
        this.isShowLeft = !this.isShowLeft;
    }

    private rightShowChange() {
        this.isShowRight = !this.isShowRight;
    }

    public render() {
        return (
            <el-container class='layout-container'>
                <el-header class='layout-header' style='height: 56px;'>
                    {this.$slots.header}
                </el-header>
                <el-container class='layout-content'>
                    <div class='layout-container-left'>
                        <div class='layout-aside-left-little'>
                            <div class='top'>
                                {this.$slots.leftLittle}
                            </div>
                            <div class='bottom'>
                                <a class={this.isShowLeft ? 'shrink-button' : 'shrink-button is-toggle'} on-click={() => this.leftShowChange()}>
                                    <i class='el-icon-d-arrow-left'></i>
                                </a>
                            </div>
                        </div>
                        <div class='layout-aside-left' style={this.isShowLeft ? 'margin-left: 0px;' : 'margin-left: -208px;'}>
                            {this.$slots.left}
                        </div>
                    </div>
                    <el-container class='layout-container-center'>
                        <el-main class='layout-main'>
                            {this.$slots.main}
                        </el-main>
                        <el-footer class='layout-footer' style='height: 25px;'>
                            {this.$slots.footer}
                        </el-footer>
                    </el-container>
                </el-container >
            </el-container >
        );
    }

}