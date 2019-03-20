import { Vue, Component, Provide } from 'vue-property-decorator';
import './design-view-container.less';

/**
 * 设计页面视图布局容器
 *
 * @export
 * @class DesignViewContainer
 * @extends {Vue}
 */
@Component({})
export default class DesignViewContainer extends Vue {
    @Provide()
    private isShowDesignArea: boolean = true;

    public showChange() {
        this.isShowDesignArea = !this.isShowDesignArea;
    }

    public render() {
        return (
            <div class="design-view-container">
                <div class="design-preview-container">
                    {this.$slots.designPreview}
                </div>
                <div class="design-area-container" style={this.isShowDesignArea ? 'margin-right: 0px' : 'margin-right: -500px;'}>
                    <div class="toolbar-container">
                        <div class="toolbar">
                            {this.$slots.toolbar}
                        </div>
                        <div class={this.isShowDesignArea ? 'buttons active' : 'buttons'}>
                            <i class="el-icon-d-arrow-left" on-click={() => this.showChange()}></i>
                        </div>
                    </div>
                    <div class="tree-container">
                        {this.$slots.tree}
                    </div>
                    <div class="form-container">
                        {this.$slots.form}
                    </div>
                </div>
            </div>
        );
    }
}