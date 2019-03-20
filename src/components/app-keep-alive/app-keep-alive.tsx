import { Vue, Component, Provide, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class AppKeepAlive extends Vue {

    @Provide()
    public _toString = Object.prototype.toString;

    @Provide()
    public cache: any;

    @Provide()
    public keys: string[] = [];

    @Provide()
    public _vnode: any;

    @Prop()
    public include: any;

    @Prop()
    public exclude: any;

    @Prop()
    public max: any;

    @Prop()
    public routes?: any[];

    @Watch("include")
    public onIncludeChange(newVal: any) {
        this.pruneCache((name: string) => {
            return this.matches(newVal, name);
        });
    }

    @Watch("exclude")
    public onExcludeChange(newVal: any) {
        this.pruneCache((name: string) => {
            return !this.matches(newVal, name);
        });
    }

    @Watch("routes")
    public onRoutesChange(newVal: any) {
        this.pruneCache2((name: string) => {
            return !this.matches(newVal, name);
        });
    }

    public created() {
        this.cache = Object.create(null);
        this.keys = [];
    }

    public destroyed() {
        // tslint:disable-next-line:forin
        for (const key in this.cache) {
            this.pruneCacheEntry(this.cache, key, this.keys, null);
        }
    }

    public pruneCacheEntry(cache: any, key: string, keys: string[], current: any) {
        const cached = cache[key];
        if (cached && (!current || cached.tag !== current.tag)) {
            cached.componentInstance.$destroy();
        }
        cache[key] = null;
        this.remove(keys, key);
    }

    // tslint:disable-next-line:ban-types
    public pruneCache(filter: Function) {
        // tslint:disable-next-line:forin
        for (const key in this.cache) {
            const cachedNode = this.cache[key];
            if (cachedNode) {
                let name = this.getComponentName(cachedNode.componentOptions);
                if (name && !filter(name)) {
                    this.pruneCacheEntry(this.cache, key, this.keys, this._vnode);
                }
            }
        }
    }

    public matches(pattern: any, name: string) {
        if (Array.isArray(pattern)) {
            return pattern.indexOf(name) > -1
        } else if (typeof pattern === 'string') {
            return pattern.split(',').indexOf(name) > -1
        } else if (this.isRegExp(pattern)) {
            return pattern.test(name);
        }
        /* istanbul ignore next */
        return false;
    }

    public getComponentName(opts: any) {
        return opts && (opts.Ctor.options.name || opts.tag)
    }

    public getFirstComponentChild(children: any) {
        if (Array.isArray(children)) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < children.length; i++) {
                let c = children[i];
                if (this.isDef(c) && (this.isDef(c.componentOptions) || this.isAsyncPlaceholder(c))) {
                    return c;
                }
            }
        }
    }

    public isAsyncPlaceholder(node: any) {
        return node.isComment && node.asyncFactory
    }

    public isDef(v: any) {
        return v !== undefined && v !== null
    }

    public isRegExp(v: any) {
        return this._toString.call(v) === '[object RegExp]'
    }

    public remove(arr: any[], item: any) {
        if (arr.length) {
            let index = arr.indexOf(item);
            if (index > -1) {
                return arr.splice(index, 1);
            }
        }
    }

    // tslint:disable-next-line:ban-types
    public pruneCache2(filter: Function) {
        const cache = this.cache;
        const keys = this.keys;
        const _vnode = this._vnode;
        // tslint:disable-next-line:forin
        for (const key in cache) {
            const cachedNode = cache[key];
            if (cachedNode) {
                let name = cachedNode.data.curPath;
                if (name && filter(name)) {
                    this.pruneCacheEntry(cache, key, keys, _vnode);
                }
            }
        }
    }

    public render() {
        const _this = this;
        const slot = _this.$slots.default;
        const vnode = _this.getFirstComponentChild(slot);
        const componentOptions = vnode && vnode.componentOptions;
        if (componentOptions) {
            // check pattern
            const name = _this.getComponentName(componentOptions);
            const ref: any = _this;
            const include = ref.include;
            const exclude = ref.exclude;
            const routerList = ref.routerList;
            const route = ref.$route;
            if (
                // not included
                (include && (!name || !_this.matches(include, name))) ||
                // excluded
                (exclude && name && _this.matches(exclude, name)) ||
                (routerList && (!route.fullPath && !_this.matches(routerList, route.fullPath)))
            ) {
                return vnode;
            }

            const ref$1 = _this;
            const cache = ref$1.cache;
            const keys = ref$1.keys;
            const key = vnode.key == null
                // same constructor may get registered as different local components
                // so cid alone is not enough (#3269)
                ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
                : vnode.key;
            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance;
                // make current key freshest
                _this.remove(keys, key);
                keys.push(key);
            } else {
                cache[key] = vnode;
                keys.push(key);
                // prune oldest entry
                if (_this.max && keys.length > parseInt(_this.max)) {
                    _this.pruneCacheEntry(cache, keys[0], keys, _this._vnode);
                }
            }

            vnode.data.keepAlive = true;
            vnode.data.curPath = route.fullPath;
        }
        return vnode || (slot && slot[0]);
    }
}