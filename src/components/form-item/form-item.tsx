import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class AppFormItem extends Vue {

    @Prop() public name?: string;
    @Prop() public caption?: string;
    @Prop({ default: '' }) public value?: string;
    @Prop() public showCaption?: boolean;
    @Prop() public allowEmpty?: boolean;
    @Prop() public emptyCaption?: boolean;

    public render() {
        return (
            <div>
                <form-item label={this.caption}>
                    {this.$slots.default}
                </form-item>
            </div>
        );
    }
}