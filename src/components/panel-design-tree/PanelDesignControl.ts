import { Util } from '../../util/Util';

/**
 * 面板设计工具
 *
 * @export
 * @class PanelDesignControl
 */
export class PanelDesignControl {
    /**
     * 系统面板id
     *
     * @private
     * @type {string}
     * @memberof PanelDesignControl
     */
    private psSysViewPanelId?: string;
    /**
     * 开发系统id
     *
     * @private
     * @type {string}
     * @memberof PanelDesignControl
     */
    private psDevSlnSysId?: string;
    /**
     * 系统模板id
     *
     * @private
     * @type {string}
     * @memberof PanelDesignControl
     */
    private psSysTemId?: string;
    /**
     * 实体id
     *
     * @private
     * @type {string}
     * @memberof PanelDesignControl
     */
    private psDeId?: string;
    /**
     * 可选的面板项
     *
     * @private
     * @type {Map<string, any>}
     * @memberof PanelDesignControl
     */
    private panelItems: Map<string, any> = new Map();
    /**
     * 树节点信息
     *
     * @type {any[]}
     * @memberof PanelDesignControl
     */
    public treeNodes: any[] = [{ pssysviewpanelitemid: 'root', text: '系统面板', leaf: false, tag: { itemtype: 'SYSVIEWPANEL' } }];
    /**
     * 新加载的节点信息
     *
     * @type {any[]}
     * @memberof PanelDesignControl
     */
    public newItems: any[] = [];
    /**
     * 跟Xml信息
     *
     * @type {*}
     * @memberof PanelDesignControl
     */
    public rootXml: any;
    /**
     * iframeDom实例
     *
     * @private
     * @type {*}
     * @memberof PanelDesignControl
     */
    private iframeEl: any;

    /**
     * Creates an instance of PanelDesignControl.
     * @memberof PanelDesignControl
     */
    constructor() {
        this.initPanelControls();
        this.loadFromXML(this.testXml());
    }

    /**
     * 测试xml数据
     *
     * @private
     * @returns
     * @memberof PanelDesignControl
     */
    private testXml() {
        return '<?xml version="1.0" encoding="utf-8" ?><SYSVIEWPANEL PSSYSTEMID="2C40DFCD-0DF5-47BF-91A5-C45F810B0001" TASKSERVERURL="http://172.16.180.197:8080/SAPAAS/" PSDEVSLNSYSID="52BB5DB0-4F3F-464E-8741-D74AD9DC694C" PSSYSVIEWPANELID="SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25" ITEMTYPE="SYSVIEWPANEL"><CONTAINER SRFORIKEY="A90EB500-013C-450E-ADAB-1EC8A0A8E0A3" SRFDRAFTFLAG="0" BLANKLOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54&quot;/&gt;&#xD;&#xA;" UPDATEDATE="2019-03-06 19:26:57" PSSYSVIEWPANELID="SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25" PSSYSVIEWPANELITEMID="SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54" CAPTION="容器面板" ORDERVALUE="1" PSSYSVIEWPANELITEMNAME="container1" VISIBLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54&quot;/&gt;&#xD;&#xA;" PSSYSVIEWPANELNAME="应用面板视图" UPDATEMAN="0EECC0A9-8C38-452B-A895-8A2EEE0C2394" ENABLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54&quot;/&gt;&#xD;&#xA;" ITEMTYPE="CONTAINER"><BUTTON SRFORIKEY="8F57F26B-7559-4C51-90BC-27DD4D7E817A" SRFDRAFTFLAG="0" BLANKLOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:DDEDCE16-BABC-4F6F-BA25-B692A20539A1&quot;/&gt;&#xD;&#xA;" PPSSYSVIEWPANELITEMNAME="container1" UPDATEDATE="2019-03-06 19:26:57" PSSYSVIEWPANELID="SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25" PSSYSVIEWPANELITEMID="SRFTEMPKEY:DDEDCE16-BABC-4F6F-BA25-B692A20539A1" PPSSYSVIEWPANELITEMID="SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54" CAPTION="按钮" VISIBLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:DDEDCE16-BABC-4F6F-BA25-B692A20539A1&quot;/&gt;&#xD;&#xA;" ORDERVALUE="1" PSSYSVIEWPANELITEMNAME="button1" PSSYSVIEWPANELNAME="应用面板视图" UPDATEMAN="0EECC0A9-8C38-452B-A895-8A2EEE0C2394" ENABLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:DDEDCE16-BABC-4F6F-BA25-B692A20539A1&quot;/&gt;&#xD;&#xA;" ITEMTYPE="BUTTON"/><RAWITEM SRFORIKEY="FCBE2212-8FB9-4E5D-8AF7-809C5265B8EE" SRFDRAFTFLAG="0" BLANKLOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:050FFA60-CDB1-464B-9DC0-CFB96DC4C485&quot;/&gt;&#xD;&#xA;" CONTENTTYPE="HTML" PPSSYSVIEWPANELITEMNAME="container1" UPDATEDATE="2019-03-06 19:26:57" PSSYSVIEWPANELID="SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25" PSSYSVIEWPANELITEMID="SRFTEMPKEY:050FFA60-CDB1-464B-9DC0-CFB96DC4C485" PPSSYSVIEWPANELITEMID="SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54" CAPTION="直接内容" VISIBLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:050FFA60-CDB1-464B-9DC0-CFB96DC4C485&quot;/&gt;&#xD;&#xA;" ORDERVALUE="2" PSSYSVIEWPANELITEMNAME="rawitem1" PSSYSVIEWPANELNAME="应用面板视图" UPDATEMAN="0EECC0A9-8C38-452B-A895-8A2EEE0C2394" ENABLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:050FFA60-CDB1-464B-9DC0-CFB96DC4C485&quot;/&gt;&#xD;&#xA;" ITEMTYPE="RAWITEM"/><CTRLPOS SRFORIKEY="C7AB6479-D87A-4C11-814D-43E67524237C" SRFDRAFTFLAG="0" BLANKLOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:4E6EBA7D-B9E8-4B06-BC41-3719F61C1718&quot;/&gt;&#xD;&#xA;" PPSSYSVIEWPANELITEMNAME="container1" UPDATEDATE="2019-03-06 19:26:57" PSSYSVIEWPANELID="SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25" PSSYSVIEWPANELITEMID="SRFTEMPKEY:4E6EBA7D-B9E8-4B06-BC41-3719F61C1718" PPSSYSVIEWPANELITEMID="SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54" CAPTION="控件占位" VISIBLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:4E6EBA7D-B9E8-4B06-BC41-3719F61C1718&quot;/&gt;&#xD;&#xA;" ORDERVALUE="3" PSSYSVIEWPANELITEMNAME="ctrlpos1" PSSYSVIEWPANELNAME="应用面板视图" UPDATEMAN="0EECC0A9-8C38-452B-A895-8A2EEE0C2394" ENABLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:4E6EBA7D-B9E8-4B06-BC41-3719F61C1718&quot;/&gt;&#xD;&#xA;" ITEMTYPE="CTRLPOS"/><CONTROL PSDEID="fa1370490e24654b68f76899ff0a5688" SRFDRAFTFLAG="0" BLANKLOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:04B1EC23-A686-404F-8E3E-4DB5F3DC81DE&quot;/&gt;&#xD;&#xA;" PPSSYSVIEWPANELITEMNAME="container1" CTRLTYPE="GRID" UPDATEDATE="2019-03-06 19:26:57" PSDEGRIDNAME="主表格" PPSSYSVIEWPANELITEMID="SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54" PSDENAME="BOOK" CAPTION="控件" PSDEGRIDID="fa1370490e24654b68f76899ff0a5688" PSSYSVIEWPANELITEMNAME="control1" ENABLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:04B1EC23-A686-404F-8E3E-4DB5F3DC81DE&quot;/&gt;&#xD;&#xA;" SRFORIKEY="CB136F87-FB4F-4A13-A6EF-B630751EAED4" PSSYSVIEWPANELID="SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25" PSSYSVIEWPANELITEMID="SRFTEMPKEY:04B1EC23-A686-404F-8E3E-4DB5F3DC81DE" PSACHANDLERID="ca0dbf7d5db4a5a9f76030655d6d7335" PSDEDATASETNAME="DEFAULT" ORDERVALUE="4" VISIBLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:04B1EC23-A686-404F-8E3E-4DB5F3DC81DE&quot;/&gt;&#xD;&#xA;" PSDEDATASETID="fa1370490e24654b68f76899ff0a5688" PSSYSVIEWPANELNAME="应用面板视图" PSACHANDLERNAME="数据表格处理器" UPDATEMAN="0EECC0A9-8C38-452B-A895-8A2EEE0C2394" ITEMTYPE="CONTROL"/><USERCONTROL SRFORIKEY="4D5C1E92-F108-440A-A384-63E0001DE421" SRFDRAFTFLAG="0" BLANKLOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:549D40FF-AE5C-4283-BF31-2031E187D0AF&quot;/&gt;&#xD;&#xA;" CONTENTTYPE="HTML" PPSSYSVIEWPANELITEMNAME="container1" UPDATEDATE="2019-03-06 19:26:57" PSSYSVIEWPANELID="SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25" PSSYSVIEWPANELITEMID="SRFTEMPKEY:549D40FF-AE5C-4283-BF31-2031E187D0AF" PSSYSPFPLUGINNAME="（移动端预置）锚点列表" PSSYSPFPLUGINID="49C0DD4B-BCBC-4FEB-9861-C4B8AEFE7F29" PPSSYSVIEWPANELITEMID="SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54" CAPTION="自定义部件" VISIBLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:549D40FF-AE5C-4283-BF31-2031E187D0AF&quot;/&gt;&#xD;&#xA;" PSSYSVIEWPANELITEMNAME="usercontrol1" ORDERVALUE="5" PSSYSVIEWPANELNAME="应用面板视图" UPDATEMAN="0EECC0A9-8C38-452B-A895-8A2EEE0C2394" ENABLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:549D40FF-AE5C-4283-BF31-2031E187D0AF&quot;/&gt;&#xD;&#xA;" ITEMTYPE="USERCONTROL"/><FIELD SRFORIKEY="B376551F-951C-4479-B0CF-67A749A7349B" SRFDRAFTFLAG="0" BLANKLOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:E441E75F-672A-4B70-981E-E48C729EF858&quot;/&gt;&#xD;&#xA;" PPSSYSVIEWPANELITEMNAME="container1" UPDATEDATE="2019-03-06 19:26:57" FIELDNAME="srftitle" PSSYSVIEWPANELID="SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25" PSSYSVIEWPANELITEMID="SRFTEMPKEY:E441E75F-672A-4B70-981E-E48C729EF858" PPSSYSVIEWPANELITEMID="SRFTEMPKEY:7484973C-4320-431E-B4D5-CEB2590BEA54" CAPTION="面板属性" VISIBLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:E441E75F-672A-4B70-981E-E48C729EF858&quot;/&gt;&#xD;&#xA;" ORDERVALUE="6" PSSYSVIEWPANELITEMNAME="field1" PSSYSVIEWPANELNAME="应用面板视图" UPDATEMAN="0EECC0A9-8C38-452B-A895-8A2EEE0C2394" ENABLELOGIC="&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;&#xD;&#xA;&lt;PANELITEMLOGIC PSSYSVIEWPANELID=&quot;SRFTEMPKEY:D3263FD9-A5D1-41AB-B891-6815533CAF25&quot; PSSYSVIEWPANELITEMID=&quot;SRFTEMPKEY:E441E75F-672A-4B70-981E-E48C729EF858&quot;/&gt;&#xD;&#xA;" ITEMTYPE="FIELD"/></CONTAINER></SYSVIEWPANEL>';
    }

    /**
     * 加载设计XML数据
     *
     * @param {*} strXML
     * @returns {boolean}
     * @memberof PanelDesignControl
     */
    public loadFromXML(strXML: any): boolean {
        const xmlDoc: Document | undefined = Util.parseXML(strXML);
        if (xmlDoc == null) {
            alert('面板逻辑不正确');
            return false;
        }
        this.newItems = [];
        const childNodes: NodeListOf<ChildNode> = xmlDoc.childNodes;
        if (childNodes && childNodes.length > 0) {
            const node = childNodes.item(0);
            if (Object.is(node.nodeName, 'SYSVIEWPANEL')) {
                this.loadSysPanel(node);
                return true;
            }
        }
        return false;
    }
    /**
     * 加载系统面板
     *
     * @param {ChildNode} xmlNode
     * @memberof PanelDesignControl
     */
    public loadSysPanel(xmlNode: ChildNode) {
        const data: any = { itemtype: 'SYSVIEWPANEL' };
        Util.loadXMLNode(xmlNode, data);
        // if (!xml.pssysviewpanelid) {
        //     xml.pssysviewpanelid = Ext.id();
        // }
        this.psSysViewPanelId = data.pssysviewpanelid;
        this.psDevSlnSysId = data.pssystemid;
        this.psDevSlnSysId = data.psdevslnsysid;
        this.psDeId = data.psdeid;
        // 设置跟节点参数信息
        const record: any = this.treeNodes[0];
        Object.assign(record, { tag: data });

        this.rootXml = { srfparenttype: 'DER1N', srfder1nid: 'DER1N_PSSYSVIEWPANELITEM_PSSYSVIEWPANEL_PSSYSVIEWPANELID', srfparentkey: data.pssysviewpanelid };
        Object.assign(this.rootXml, data);
        // 第一个节点
        const node = this.treeNodes[0];
        const childNodes: any = xmlNode.childNodes;
        childNodes.forEach((item: any) => {
            const childNodeData = this.loadContainerItem(item);
            this.addChildren(node, childNodeData);
        });

        // 进行预览
        const urlParam: any = {};
        urlParam.pssysviewpanelid = this.psSysViewPanelId;
        urlParam.pssystemid = this.psSysTemId;
        urlParam.psdevslnsysid = this.psDevSlnSysId;
        urlParam.psdeid = this.psDeId;
        // 预览地址
        const src: string = `../saps/pf/syspanelpreview.jsp?${Util.urlEncode(urlParam)}`;
        if (this.iframeEl) {
            this.iframeEl.src = src;
        }
    }

    /**
     * 加载面板项
     *
     * @param {*} childXmlNode
     * @returns
     * @memberof PanelDesignControl
     */
    public loadContainerItem(childXmlNode: any): any {
        // 节点名称
        let strNodeName = childXmlNode.nodeName;
        strNodeName = strNodeName.toUpperCase();
        switch (strNodeName) {
            case 'CONTAINER':
                return this.loadContainer(childXmlNode);
            case 'TABPANEL':
                return this.loadTabGroup(childXmlNode);
            case 'CTRLPOS':
                return this.loadCtrlPos(childXmlNode);
            case 'CONTROL':
                return this.loadControl(childXmlNode);
            case 'FIELD':
                return this.loadField(childXmlNode);
            case 'BUTTON':
                return this.loadButton(childXmlNode);
            case 'RAWITEM':
                return this.loadRawItem(childXmlNode);
            case 'USERCONTROL':
                return this.loadUserControl(childXmlNode);
        }
        return undefined;
    }

    /**
     * 加载面板
     *
     * @param {*} xmlNode
     * @memberof PanelDesignControl
     */
    public loadContainer(xmlNode: any) {
        const data: any = { caption: '' };
        Util.loadXMLNode(xmlNode, data);
        const nodeData = {
            text: this.getNodeText(data),
            nodetype: 'CONTAINER',
            icon: '',
            iconcls: 'fa fa-address-book',
            leaf: false,
            tag: data
        };
        // 加载子节点
        const childNodes: any[] = xmlNode.childNodes;
        if (childNodes) {
            childNodes.forEach((item) => {
                const childNodeData = this.loadContainerItem(item);
                this.addChildren(nodeData, childNodeData);
            });
        }
        return nodeData;
    }

    /**
     * 加载分页部件
     *
     * @param {*} xmlNode
     * @memberof PanelDesignControl
     */
    public loadTabGroup(xmlNode: any) {
        const data: any = { caption: '' };
        Util.loadXMLNode(xmlNode, data);
        const nodeData = {
            text: this.getNodeText(data),
            nodetype: 'TABPANEL',
            icon: '',
            iconcls: 'fa fa-balance-scale',
            leaf: false,
            tag: data
        };
        // 加载子节点
        const childNodes: any[] = xmlNode.childNodes;
        if (childNodes) {
            childNodes.forEach((item) => {
                let strNodeName = item.nodeName;
                strNodeName = strNodeName.toUpperCase();
                if (Object.is(strNodeName, 'TABPAGE')) {
                    const childNodeData = this.loadTabPage(item);
                    this.addChildren(nodeData, childNodeData);
                }
            });
        }
        return nodeData;
    }

    /**
     * 加载分页面板
     *
     * @param {*} xmlNode
     * @memberof PanelDesignControl
     */
    public loadTabPage(xmlNode: any) {
        const data: any = { caption: '' };
        Util.loadXMLNode(xmlNode, data);
        const nodeData = {
            text: this.getNodeText(data),
            nodetype: 'TABPAGE',
            icon: '',
            iconcls: 'fa fa-bed',
            leaf: false,
            tag: data
        };
        // 加载子节点
        const childNodes: any[] = xmlNode.childNodes;
        if (childNodes) {
            childNodes.forEach((item) => {
                const childNodeData = this.loadContainerItem(item);
                this.addChildren(nodeData, childNodeData);
            });
        }
        return nodeData;
    }

    /**
     * 加载控件占位
     *
     * @param {*} xmlNode
     * @memberof PanelDesignControl
     */
    public loadCtrlPos(xmlNode: any) {
        const data: any = { caption: '' };
        Util.loadXMLNode(xmlNode, data);
        const nodeData = {
            text: this.getNodeText(data),
            nodetype: 'CTRLPOS',
            icon: '',
            iconcls: 'fa fa-code',
            leaf: true,
            tag: data
        };
        return nodeData;
    }

    /**
     * 加载控件
     *
     * @param {*} xmlNode
     * @memberof PanelDesignControl
     */
    public loadControl(xmlNode: any) {
        const xml: any = { caption: '' };
        Util.loadXMLNode(xmlNode, xml);
        const nodeData = {
            text: this.getNodeText(xml),
            nodetype: 'CONTROL',
            icon: '',
            iconcls: 'fa fa-diamond',
            leaf: true,
            tag: xml
        };
        return nodeData;
    }

    /**
     * 加载面板属性
     *
     * @param {*} xmlNode
     * @memberof PanelDesignControl
     */
    public loadField(xmlNode: any) {
        const data: any = { caption: '' };
        Util.loadXMLNode(xmlNode, data);
        const nodeData = {
            text: this.getNodeText(data),
            nodetype: 'FIELD',
            icon: '',
            iconcls: 'fa fa-fax',
            leaf: true,
            tag: data
        };
        return nodeData;
    }

    /**
     * 加载按钮
     *
     * @param {*} xmlNode
     * @memberof PanelDesignControl
     */
    public loadButton(xmlNode: any) {
        const data: any = { caption: '' };
        Util.loadXMLNode(xmlNode, data);
        const nodeData = {
            text: this.getNodeText(data),
            nodetype: 'BUTTON',
            icon: '',
            iconcls: 'fa fa-clone',
            leaf: true,
            tag: data
        };
        return nodeData;
    }

    /**
     * 加载直接内容
     *
     * @param {*} xmlNode
     * @returns
     * @memberof PanelDesignControl
     */
    public loadRawItem(xmlNode: any) {
        const xml: any = { caption: '' };
        Util.loadXMLNode(xmlNode, xml);
        const nodeData = {
            text: this.getNodeText(xml),
            nodetype: 'RAWITEM',
            icon: '',
            iconcls: 'fa fa-cog',
            leaf: true,
            tag: xml
        };
        return nodeData;
    }

    /**
     * 加载自定义部件
     *
     * @param {*} xmlNode
     * @memberof PanelDesignControl
     */
    public loadUserControl(xmlNode: any) {
        const xml: any = { caption: '' };
        Util.loadXMLNode(xmlNode, xml);
        const nodeData = {
            text: this.getNodeText(xml),
            nodetype: 'USERCONTROL',
            icon: '',
            iconcls: 'fa fa-eye',
            leaf: true,
            tag: xml
        };
        return nodeData;
    }

    /**
     * 添加子节点
     *
     * @private
     * @param {*} parentNode
     * @param {*} nodeData
     * @memberof PanelDesignControl
     */
    private addChildren(parentNode: any, nodeData: any): void {
        if (parentNode && nodeData) {
            if (!parentNode.children) {
                parentNode.children = [];
            }
            parentNode.children.push(nodeData);
        }
    }

    /**
     * 获取节点文本信息
     *
     * @param {*} data
     * @memberof PanelDesignControl
     */
    private getNodeText(data: any) {
        let caption = data.caption;
        if (caption === undefined) {
            caption = '';
        }
        let psdefformitemname = data.psdefformitemname;
        if (psdefformitemname === undefined) {
            psdefformitemname = data.psdefuimodename;
        }
        if (psdefformitemname === undefined) {
            psdefformitemname = '';
        }
        let itemname = data.pssysviewpanelitemname;
        if (itemname === undefined || itemname === '') {
            itemname = data.psdefname;
        }
        if (itemname === undefined) {
            itemname = '';
        }
        if (data.itemtype === 'FIELD') {
            const logicname = data.logicname;
            if (caption === '' && logicname !== undefined) {
                if (psdefformitemname === '') {
                    caption = logicname;
                }
            }
            if (caption !== '') {
                if (psdefformitemname !== '') {
                    return `${caption}(${itemname})[${psdefformitemname}]`;
                } else {
                    return `${caption}(${itemname})`;
                }
            }
            if (psdefformitemname !== '') {
                return `${itemname}[${psdefformitemname}]`;
            } else {
                return itemname;
            }
        } else {
            if (caption !== '') {
                return `${caption}(${itemname})`;
            }
            return itemname;
        }
    }

    /**
     * 设置面板id
     *
     * @param {string} id
     * @memberof PanelDesignControl
     */
    public setPanelId(id: string) {
        this.psSysViewPanelId = id;
    }

    /**
     * 过滤可新建节点
     *
     * @param {string} type
     * @returns {*}
     * @memberof PanelDesignControl
     */
    public filterPanelItems(type: string): any[] {
        return this.panelItems.get(type);
    }

    /**
     * 初始化可新建面板项
     *
     * @memberof PanelDesignControl
     */
    public initPanelControls(): void {
        const nodes: any[] = [];
        nodes.push({
            text: '面板',
            nodetype: 'CONTAINER',
            icon: '',
            iconcls: 'fa fa-address-book',
            leaf: false,
            tag: { itemtype: 'CONTAINER', pssysviewpanelid: this.psSysViewPanelId }
        });
        nodes.push({
            text: '分页部件',
            nodetype: 'TABPANEL',
            icon: '',
            iconcls: 'fa fa-balance-scale',
            leaf: false,
            tag: { itemtype: 'TABPANEL', pssysviewpanelid: this.psSysViewPanelId }
        });
        nodes.push({
            text: '分页面板',
            nodetype: 'TABPAGE',
            icon: '',
            iconcls: 'fa fa-bed',
            leaf: false,
            tag: { itemtype: 'TABPAGE', pssysviewpanelid: this.psSysViewPanelId }
        });
        nodes.push({
            text: '按钮',
            nodetype: 'BUTTON',
            icon: '',
            iconcls: 'fa fa-clone',
            leaf: true,
            tag: { itemtype: 'BUTTON', pssysviewpanelid: this.psSysViewPanelId }
        });
        nodes.push({
            text: '直接内容',
            nodetype: 'RAWITEM',
            icon: '',
            iconcls: 'fa fa-cog',
            leaf: true,
            tag: { itemtype: 'RAWITEM', pssysviewpanelid: this.psSysViewPanelId }
        });
        nodes.push({
            text: '控件占位',
            nodetype: 'CTRLPOS',
            icon: '',
            iconcls: 'fa fa-code',
            leaf: true,
            tag: { itemtype: 'CTRLPOS', pssysviewpanelid: this.psSysViewPanelId }
        });
        nodes.push({
            text: '控件',
            nodetype: 'CONTROL',
            icon: '',
            iconcls: 'fa fa-diamond',
            leaf: true,
            tag: { itemtype: 'CONTROL', pssysviewpanelid: this.psSysViewPanelId }
        });
        nodes.push({
            text: '自定义部件',
            nodetype: 'USERCONTROL',
            icon: '',
            iconcls: 'fa fa-eye',
            leaf: true,
            tag: { itemtype: 'USERCONTROL', pssysviewpanelid: this.psSysViewPanelId }
        });
        nodes.push({
            text: '面板属性',
            nodetype: 'FIELD',
            icon: '',
            iconcls: 'fa fa-fax',
            leaf: true,
            tag: { itemtype: 'FIELD', pssysviewpanelid: this.psSysViewPanelId }
        });

        const arr: any[] = nodes.filter((item: any) => {
            const { tag } = item;
            return !Object.is(tag.itemtype, 'TABPAGE');
        });

        // 根节点
        this.panelItems.set('SYSVIEWPANEL', arr);
        // 面板
        this.panelItems.set('CONTAINER', arr);
        // 分页部件
        this.panelItems.set('TABPANEL', nodes.filter((item: any) => {
            const { tag } = item;
            return Object.is(tag.itemtype, 'TABPAGE');
        }));
        // 分页面板
        this.panelItems.set('TABPAGE', arr);
    }
}