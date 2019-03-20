import { Vue, Component, Prop } from 'vue-property-decorator';
import './form-gruop.less';

@Component({})
export default class AppFormGroup extends Vue {

    /**
     * 标题
     *
     * @type {string}
     * @memberof AppFormGroup
     */
    @Prop() public caption?: string;

    /**
     * 是否显示标题
     *
     * @type {boolean}
     * @memberof AppFormGroup
     */
    @Prop({ default: true }) public showCaption?: boolean;

    /**
     * 内容绘制
     *
     * @memberof AppFormGroup
     */
    public render() {
        return (
            <div>
                {this.showCaption ?
                    <card bordered={false} dis-hover={true}>
                        <p class='' slot='title'> {this.caption}</p>
                        <row gutter={10}>
                            {this.$slots.default}
                        </row>
                    </card> :
                    <row gutter={10}>
                        {this.$slots.default}
                    </row>}
            </div>
        );
    }
}