<template>
    <transition name="slide-fade" appear>
        <!--右键执行后给系统菜单返回false-->
        <div class="fillcontain" @click="checkToHideMenu" oncontextmenu="return false">
            <head-top></head-top>
            <el-row  class="fullheightRow">
                <el-col class="fullheight" >
                    <div class="importTitle" >
                        数据集
                    </div>
                    <div class="buttonGroup">
                        <!--<div class="changeModel">-->
                            <!--<a class="changeIContainer" href="javascript:void(0)"></a>-->
                            <!--<a class="changeIContainer" href="javascript:void(0)"><i class="iconfont icon-xianshilie changeI"></i></a>-->
                            <!--<a class="changeIContainer" href="javascript:void(0)"><i class="iconfont icon-pingpu changeI"></i></a>-->
                        <!--</div>-->
                        <el-button-group >
                            <el-button @click="changeModel('list')"><i class="iconfont icon-liebiao changeI" ></i></el-button>
                            <el-button @click="changeModel('moreList')"><i class="iconfont icon-xianshilie changeI"></i></el-button>
                            <el-button @click="changeModel('detail')"><i class="iconfont icon-pingpu changeI"></i></el-button>
                        </el-button-group>
                        <el-input placeholder="搜索数据集／文件夹／图片名" style="width: 20em;">
                            <el-button slot="append" icon="search" ></el-button>
                        </el-input>
                    </div>

                    <!--父级元素, 声明viewBox监听无限加载滚动条状态-->
                    <div class="fatherTr" ref="viewBox" >
                        <transition name="slide-fade" appear>
                            <div v-if="whichModel === 'list'" >
                            <div class="sonTrHead headBar">
                                <transition :name="transition[thisLevel]" mode="in-out" appear>
                                    <div v-if="thisLevel === 1" class="headContent">全部数据</div>
                                </transition>
                                <transition :name="transition[thisLevel]" mode="in-out" appear>
                                    <div v-if="thisLevel !== 1" class="headContent">
                                        <a href="javascript:void(0)" @click="goFront">返回上一级</a>
                                        |
                                        <a href="javascript:void(0)" @click="goHead">返回主目录</a>
                                        |
                                        <a href="javascript:void(0)" @click="loadMore">加载更多</a>
                                    </div>
                                </transition>
                            </div>
                            <transition :name="transition[1]" appear>
                                <div v-if="thisLevel === 1" class="levelTr">
                                    <div class="sonTr" :key="'first'">
                                        <el-checkbox class="floatleft" :indeterminate="isIndeterminate" v-model="checkAll"
                                                     @change="handleCheckAllChange"></el-checkbox>
                                        <label class="floatleft leftpx" v-if="checkedNum > 0">已选中{{checkedNum}}个文件</label>
                                        <label class="floatleft leftpx" v-else>全选</label>
                                        <div class="sonTd">名称</div>
                                        <div class="sonTd">容量</div>
                                        <div class="sonTd">人数</div>
                                        <div class="sonTd">创建日期</div>
                                    </div>
                                    <el-checkbox-group v-model="checkedBox" @change="handleCheckedCitiesChange">
                                        <div v-for="piece in firstData" class="sonTr" :id="piece.id">
                                            <div class="sonTdFirst">
                                                <el-checkbox :label="piece.id" :key="piece.id">
                                                    <img class="smallPic" :src="piece.path" alt="">
                                                </el-checkbox>
                                            </div>
                                            <div @mousedown="mouseOption(thisLevel, piece)" class="sonsonTr">
                                                <div class="sonTd">{{piece.name}}</div>
                                                <div class="sonTd">{{piece.size}}</div>
                                                <div class="sonTd">{{piece.peoNum}}</div>
                                                <div class="sonTd">{{piece.date}}</div>
                                            </div>
                                        </div>
                                    </el-checkbox-group>
                                </div>
                            </transition>
                            <transition :name="transition[2]" appear>
                                <div v-if="thisLevel === 2" class="levelTr" ref="view2">
                                    <div class="sonTr" :key="'second'">
                                        <el-checkbox class="floatleft" :indeterminate="isIndeterminate" v-model="checkAll"
                                                     @change="handleCheckAllChange"></el-checkbox>
                                        <label class="floatleft leftpx" v-if="checkedNum > 0">已选中{{checkedNum}}个文件</label>
                                        <label class="floatleft leftpx" v-else>全选</label>
                                        <div class="sonTd">名称</div>
                                        <div class="sonTd">容量</div>
                                        <div class="sonTd">类型</div>
                                        <div class="sonTd">创建日期</div>
                                    </div>
                                    <el-checkbox-group v-model="checkedBox" @change="handleCheckedCitiesChange">
                                        <div v-for="piece in secondData" class="sonTr" :id="piece.id">
                                            <div class="sonTdFirst">
                                                <el-checkbox :label="piece.id" :key="piece.id">
                                                    <img class="smallPic" :src="piece.path" alt="">
                                                </el-checkbox>
                                            </div>
                                            <div @mousedown="mouseOption(thisLevel, piece)" class="sonsonTr">
                                                <div class="sonTd">{{piece.name}}</div>
                                                <div class="sonTd">{{piece.size}}</div>
                                                <div class="sonTd">{{piece.type}}</div>
                                                <div class="sonTd">{{piece.date}}</div>
                                            </div>
                                        </div>
                                    </el-checkbox-group>
                                </div>
                            </transition>

                            <transition :name="transition[3]" appear>
                                <div v-if="thisLevel === 3" class="levelTr" ref="view3">
                                    <div class="sonTr" :key="'third'">
                                        <el-checkbox class="floatleft" :indeterminate="isIndeterminate" v-model="checkAll"
                                                     @change="handleCheckAllChange"></el-checkbox>
                                        <label class="floatleft leftpx" v-if="checkedNum > 0">已选中{{checkedNum}}个文件</label>
                                        <label class="floatleft leftpx" v-else>全选</label>
                                        <div class="sonTd">图片名称</div>
                                        <div class="sonTd">容量</div>
                                        <div class="sonTd">类型</div>
                                        <div class="sonTd">创建日期</div>
                                    </div>
                                    <el-checkbox-group v-model="checkedBox" @change="handleCheckedCitiesChange">
                                        <div v-for="piece in thirdData" class="sonTr" :id="piece.id">
                                            <div class="sonTdFirst">
                                                <el-checkbox :label="piece.id" :key="piece.id">
                                                    <img class="smallPic" :src="piece.path" alt="">
                                                </el-checkbox>
                                            </div>
                                            <div @mousedown="mouseOption(thisLevel, piece)" class="sonsonTr">
                                                <div class="sonTd">{{piece.name}}</div>
                                                <div class="sonTd">{{piece.size}}</div>
                                                <div class="sonTd">{{piece.type}}</div>
                                                <div class="sonTd">{{piece.date}}</div>
                                            </div>
                                        </div>
                                    </el-checkbox-group>
                                </div>
                            </transition>
                        </div>
                        </transition>
                        <transition name="slide-fade" appear>
                            <div  v-if="whichModel === 'moreList'">
                            <div class="sonTrHead headBar">
                                <transition :name="transition[thisLevel]" mode="in-out" appear>
                                    <div v-if="thisLevel === 1" class="headContent">全部数据</div>
                                </transition>
                                <transition :name="transition[thisLevel]" mode="in-out" appear>
                                    <div v-if="thisLevel !== 1" class="headContent">
                                        <a href="javascript:void(0)" @click="goFront">返回上一级</a>
                                        |
                                        <a href="javascript:void(0)" @click="goHead">返回主目录</a>
                                        |
                                        <a href="javascript:void(0)" @click="loadMore">加载更多</a>
                                    </div>
                                </transition>
                            </div>
                            <transition :name="transition[1]" appear>
                                <div v-if="thisLevel === 1" class="levelTr">
                                    <div v-for="piece in firstData" class="moreListSonTr" @mousedown="mouseOption(thisLevel, piece)" :id="piece.id">
                                        <div class="sonTdFirst">
                                            <img class="smallPic" :src="piece.path" alt="">
                                        </div>
                                        <div  class="sonsonTr">
                                            <div class="sonTd">{{piece.name}}</div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <transition :name="transition[2]" appear>
                                <div v-if="thisLevel === 2" class="levelTr" >
                                    <div v-for="piece in secondData" class="moreListSonTr" @mousedown="mouseOption(thisLevel, piece)" :id="piece.id">
                                        <div class="sonTdFirst">
                                            <img class="smallPic" :src="piece.path" alt="">
                                        </div>
                                        <div  class="sonsonTr">
                                            <div class="sonTd">{{piece.name}}</div>
                                        </div>
                                    </div>
                                </div>
                            </transition>

                            <transition :name="transition[3]" appear>
                                <div v-if="thisLevel === 3" class="levelTr" >
                                    <div v-for="piece in thirdData" class="moreListSonTr" @mousedown="mouseOption(thisLevel, piece)" :id="piece.id">
                                        <div class="sonTdFirst">
                                            <img class="smallPic" :src="piece.path" alt="">
                                        </div>
                                        <div  class="sonsonTr">
                                            <div class="sonTd">{{piece.name}}</div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        </transition>
                        <transition name="slide-fade" appear>
                            <div  v-if="whichModel === 'detail'">
                                <div class="sonTrHead headBar">
                                    <transition :name="transition[thisLevel]" mode="in-out" appear>
                                        <div v-if="thisLevel === 1" class="headContent">全部数据</div>
                                    </transition>
                                    <transition :name="transition[thisLevel]" mode="in-out" appear>
                                        <div v-if="thisLevel !== 1" class="headContent">
                                            <a href="javascript:void(0)" @click="goFront">返回上一级</a>
                                            |
                                            <a href="javascript:void(0)" @click="goHead">返回主目录</a>
                                            |
                                            <a href="javascript:void(0)" @click="loadMore">加载更多</a>
                                        </div>
                                    </transition>
                                </div>
                                <transition :name="transition[1]" appear>
                                    <div v-if="thisLevel === 1" class="levelTr" :key="'detail1'">
                                        <div v-for="piece in firstData" class="moreListSonTrBr" @mousedown="mouseOption(thisLevel, piece)" :id="piece.id">
                                            <div class="sonTdBrFirst">
                                                <img class="smallPicDetail" :src="piece.path" alt="">
                                            </div>
                                            <div class="sonsonTrDetail">
                                                {{piece.name}}
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                                <transition :name="transition[2]" appear>
                                    <div v-if="thisLevel === 2" class="levelTr" :key="'detail2'">
                                        <div v-for="piece in secondData" class="moreListSonTrBr" @mousedown="mouseOption(thisLevel, piece)" :id="piece.id">
                                            <div class="sonTdBrFirst">
                                                <img class="smallPicDetail" :src="piece.path" alt="">
                                            </div>
                                            <div  class="sonsonTrDetail">
                                                {{piece.name}}
                                            </div>
                                        </div>
                                    </div>
                                </transition>

                                <transition :name="transition[3]" appear>
                                    <div v-if="thisLevel === 3" class="levelTr" :key="'detail3'">
                                        <div v-for="piece in thirdData" class="moreListSonTrBr" @mousedown="mouseOption(thisLevel, piece)" :id="piece.id">
                                            <div class="sonTdBrFirst">
                                                <img class="smallPicDetail" :src="piece.path" alt="">
                                            </div>
                                            <div  class="sonsonTrDetail">
                                                {{piece.name}}
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </transition>
                    </div>

                    <transition name="fade" appear>
                        <menuRight v-if="showMenu" class="menu" :style="menuStyle" :data.sync="menuContent.data"
                                   :file="menuContent.file">
                        </menuRight>
                    </transition>
                </el-col>
            </el-row>
        </div>
    </transition>
</template>

<script>
    import headTop from '../components/headTop'
    import menuRight from '../components/context-menu'
    import { getFileInfo } from '@/api/getData'

    export default {
        data(){
            return {
                //当前所处资源管理的层级
                thisLevel: 1,
                //第一层数据
                firstData: [],
                //第二层数据
                secondData: [],
                //第三层数据
                thirdData: [],
                //当前层所有管理项的id集合，用于提供给复选框
                box: [],
                //当前层内容的页码
                page: [0, 1, 1, 1],
                // 当前层每一页的容量
                pageSize: [0, 100, 300, 300],
                //当前层父级id
                levelFather: [],
                //是否进行了全选操作
                checkAll: true,
                //被选中的目标个数
                checkedNum: 0,
                //被选中的目标id集合
                checkedBox: [],
                //全选按钮的状态
                isIndeterminate: true,
                //展示mode的状态
                whichModel: 'list',
                //一行展示几项
                oneLineNum: 1,
                //一行的高度
                oneLineHeight: 44,
                //不同显示类型单一元素宽度
                simWidth: [-1, 290, 218],
                //屏幕宽度
                clientWidth: 0,
                //层级过渡动画的class
                transition: {
                    0: "",
                    1: "out-in-translate-fade",
                    2: "out-in-translate-fade",
                    3: "out-in-translate-fade",
                },
                //是否显示menu
                showMenu: false,
                //menu属性
                menuStyle: {
                    top: 0,
                    left: 0
                },
                //右键菜单列表
                menuContent: {
                    position: {},
                    data: [
                        {
                            text: "属性",
                            type: "prop",
                            callback: function () {
                                console.log('prop')
                            }
                        },
                        {
                            text: "复制",
                            type: "copy",
                            disabled: false,
                            callback: function () {
                                console.log('copy')
                            }
                        },
                        {
                            type: "divide"
                        },
                        {
                            text: "删除",
                            type: "delete",
                            disabled: false,
                            callback: function () {
                                console.log('delete')
                            }
                        },
                        {
                            text: "标注",
                            type: "open",
                            disabled: true,
                            callback: function () {
                                console.log('open')
                            }
                        }
                    ],
                    file: {},
                    scrolled: '',
                    //是否阻塞无限滚动，防止获取多次数据
                    isCrowd: false
                }
            }
        },
        components: {
            headTop, menuRight
        },
        created(){

        },
        activated(){
            this.fileName = '脚本文件';

        },
        methods: {
            //全选操作 依赖this.box
            handleCheckAllChange(event) {
                //console.log(this.box[this.thisLevel]);
                this.checkedBox = event.target.checked ? this.box[this.thisLevel] : [];
                console.log(this.checkedBox);
                this.isIndeterminate = false;
            },
            //多选框单独的操作
            handleCheckedCitiesChange(value) {
                console.log(this.checkedBox);
                this.checkedNum = value.length;
                this.checkAll = this.checkedNum === this.box.length;
                this.isIndeterminate = this.checkedNum > 0 && this.checkedNum < this.box.length;
            },
            //同步执行的初始化 level1 操作与部分数据的初始化工作
            async initLevel(){
                const result = await getFileInfo({
                    type: "getFileManage",
                    "level": this.thisLevel,
                    "pageStrat": (this.page[this.thisLevel] - 1) * this.pageSize[this.thisLevel],
                    "pageEnd": this.page[this.thisLevel] * this.pageSize[this.thisLevel]
                });
                //console.log(result);
                this.levelFather[0] = null;
                this.levelFather[1] = null;
                this.levelFather[2] = '';
                this.levelFather[3] = '';
                this.box[0] = null;
                this.box[1] = [];
                this.box[2] = [];
                this.box[3] = [];
                //性能优化点，渲染dom时便利了一遍数组，此处第二次遍历数组
                for (var keyx in result) {
                    this.box[1].push(result[keyx].id);
                }
                this.firstData = result;
            },
            changeModel(model){
            	console.log('change model : ' + model);
            	this.whichModel  = model;
            	this.thisLevel = 1;
                if(model === 'list'){
                    this.oneLineNum = 1;
                    this.oneLineHeight = 44;
                }else if(model === 'moreList'){
                    if(this.clientWidth > 0){
                        this.oneLineNum = (this.clientWidth * (5 / 6) - 120) / this.simWidth[1];
                    }else {
                        this.oneLineNum = 5;
                    }
                    this.oneLineHeight = 44;
                }else if(model === 'detail'){
                    if(this.clientWidth > 0){
                        this.oneLineNum = (this.clientWidth * (5 / 6) - 120) / this.simWidth[2];
                    }else {
                        this.oneLineNum = 6;
                    }
                    this.oneLineHeight = 188;
                }
            }
            ,
            //向高level步进， 传递所需参数并获取数据项列表，遍历列表获得id集合用于全选操作
            async changeLevel(thisLevel, thisType, thisId){
                this.page[this.thisLevel + 1] = 1;
                //console.log(event);
                if (this.thisLevel === 3) {
                    return false;
                }
                const result = await getFileInfo({
                    type: "getFileManage",
                    "level": this.thisLevel + 1,
                    "thisId": thisId,
                    "pageStrat": (this.page[this.thisLevel + 1] - 1) * this.pageSize[this.thisLevel + 1],
                    "pageEnd": this.page[this.thisLevel + 1] * this.pageSize[this.thisLevel + 1]
                });
                //console.log(result);
                //性能优化点，渲染dom时便利了一遍数组，此处第二次遍历数组
                if(this.whichModel === 'list'){
                    for (var keyxz in result) {
                        this.box[this.thisLevel + 1].push(result[keyxz].id);
                    }
                }
                this.$refs.viewBox.scrollTop = 0;

//        console.log(this.transition);
//        console.log(thisLevel);
//        console.log(event.target.parentNode.id);
                this.checkedNum = 0;
                this.checkedBox = [];
                console.log(this.transition);
                //从第一层进入第二层，获取分类过的数据
                if (this.thisLevel === 1) {
                    this.thisLevel = 2;
                    this.secondData = result;
                }else if(this.thisLevel === 2){
                    this.thisLevel = 3;
                    this.thirdData = result;
                }
                this.levelFather[this.thisLevel] = thisId;
            },
            //返回上一层， 不需要重新获取数据
            goFront(){
                this.page[this.thisLevel - 1] = 1;
                //console.log(this.transition);
                this.checkedNum = 0;
                this.checkedBox = [];
                this.thisLevel -= 1;
                //console.log(this.transition);
            },
            //返回顶层， 不需要重新获取数据
            goHead(){
                this.page[1] = 1;
                this.checkedNum = 0;
                this.checkedBox = [];
                this.thisLevel = 1;
                console.log(this.transition);
            },
            //捕捉鼠标操作， 对左键进行层级跃迁， 对右键进行菜单调用
            mouseOption(thisLevel, piece){
                if (event.button === 0) {
                	console.log(piece.id);
                    this.changeLevel(thisLevel, piece.type, piece.id);
                } else {
                    this.showMenu = true;
                    console.log("right enter");
                    console.log(piece);
                    this.menuContent.file = piece;
                    this.menuStyle = {
                        top: event.layerY + 'px',
                        left: event.layerX + 'px'
                    }
                }
            },
            //返回false
            returnFalse: function () {
                return false;
            },
            //发生左键点击时间后， 检测是否存在菜单， 如果有就隐藏掉
            checkToHideMenu: function () {
                //console.log(event);
                if (this.showMenu) {
                    //console.log('menu exist');
                    this.showMenu = false
                } else {
                    //console.log('do nothing')
                }
            },
            //无限扩展之执行篇
            async loadMore(){
                if(!this.isCrowd){
                    this.isCrowd = true;
                    this.page[this.thisLevel] += 1;
                    const result = await getFileInfo({
                        type: "getFileManage",
                        "level": this.thisLevel,
                        "thisId": this.levelFather[this.thisLevel],
                        "pageStrat": (this.page[this.thisLevel] - 1) * this.pageSize[this.thisLevel] + 1,
                        "pageEnd": this.page[this.thisLevel] * this.pageSize[this.thisLevel]
                    });
                    console.log(this.thisLevel);
                    //console.log(result);
                    if (this.thisLevel === 1) {
                        this.firstData.push.apply(this.firstData, result);
                    } else if (this.thisLevel === 2) {
                        this.secondData.push.apply(this.secondData, result);
                        console.log(this.secondData);
                    } else if (this.thisLevel === 3) {
                        this.thirdData.push.apply(this.thirdData, result);
                    }
                    this.isCrowd = false;
                }
            }
        },
        mounted(){
            //无限加载之检测篇
            // 首先通过$refs获取dom元素
            this.scrolled = this.$refs.viewBox;
            console.log("屏幕宽度: " + document.body.clientWidth);
            this.clientWidth = document.body.clientWidth;
            // 监听这个dom的scroll事件
            this.scrolled.addEventListener('scroll', () => {
                //console.log("滚动条: " + this.$refs.viewBox.scrollTop);
                //console.log("屏幕高度: " + document.body.clientHeight);
                //console.log("屏幕宽度: " + document.body.clientWidth);
                //console.log(this.$refs.viewBox.scrollTop + document.body.clientHeight + ">=" + 44  * this.secondData.length / this.oneLineNum);
                if (this.thisLevel === 1) {
                    //滚动条滚动过的距离 + 屏幕高度 >= 内容高度（检测不到，所以用 元素高度 * 元素数量 替代）,0.7 表示滚动到到70%就开始请求更多数据
                    if(this.$refs.viewBox.scrollTop + document.body.clientHeight >= 0.7 * this.oneLineHeight * this.firstData.length / this.oneLineNum){
                        //console.log("load new data");
                        this.loadMore();
                    }
                } else if (this.thisLevel === 2) {
                    if(this.$refs.viewBox.scrollTop + document.body.clientHeight >= 0.7 * this.oneLineHeight * this.secondData.length / this.oneLineNum){
                        //console.log("load new data");
                        this.loadMore();
                    }
                } else if (this.thisLevel === 3) {
                    if(this.$refs.viewBox.scrollTop + document.body.clientHeight >= 0.7 * this.oneLineHeight * this.thirdData.length / this.oneLineNum){
                        //console.log("load new data");
                        this.loadMore();
                    }
                }

            }, false);

            //执行初始化
            this.initLevel();
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import "../style/iconfont.css";
    .table_container{
        padding-left: 6%;
        padding-right: 6%;
        padding-top: 20px;
        text-align: center;
        height: 100%;
    }
    .importTitle{
        width: 100%;
        font-size: large;
        text-align: left;
        padding-bottom: 20px;
    }
    .uploader{
        width: 48%;
        height: 50%;
        margin-left: 4%;
        float: left;
        background-color: white;
        display: block;
        position: relative;
    }
    .displayer{
        width: 48%;
        float: left;
        height: 50%;
        overflow-y: scroll;
        overflow-x: scroll;
        background-color: white;
        display: block;
        position: relative;
    }
    .upload-demo, .el-upload, .el-upload-dragger{
        width: 100%;
        height: 100%;
    }
    .uploadBut{
        margin-top: 100px;
    }
    .upRight{
        position: absolute;
        top:0;
        right:0;
        min-width: 6em;
        height: 2em;
        color: #20a0ff;
        z-index: 100;
        line-height: 2em;
        background-color: #afddff;
    }


    .fullheight {
        height: 100%;
        border: solid greenyellow 1px;
        width: 100%;
        position: relative;
    }

    .fullheightRow {
        padding:60px 60px 0 60px;
        height: 100%;
    }

    .fatherTr {
        width: 100%;
        position: relative;
        height: 90%;
        //border-top: rgb(242, 246, 253) solid 1px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .levelTr {
        position: absolute;
        top: 44px;
        width: 100%;
        cursor: pointer;
        /*height: ;*/
    }

    .headBar {
        position: relative;
    }

    .headContent {
        position: absolute;
        top: 0;
    }

    .floatleft {
        line-height: 44px;
        float: left;
        display: inline;
    }

    .leftpx {
        margin-left: 10px;
        padding-right: 15px;
        color: #78909c;
    }

    .sonTr {
        height: 44px;
        line-height: 44px;
        float: left;
        width: 100%;
        border-bottom: rgb(242, 246, 253) solid 1px
    }
    .moreListSonTr {
        height: 44px;
        line-height: 44px;
        float: left;
        width: 290px;
        /*border-bottom: rgb(242, 246, 253) solid 1px*/
    }
    .moreListSonTrBr {
        /*border: solid 1px blue;*/
        height: 188px;
        float: left;
        width: 150px;
        padding: 0 49px 0 19px;
        /*border-bottom: rgb(242, 246, 253) solid 1px*/
    }
    .sonTrHead{
        height: 44px;
        line-height: 44px;
        float: left;
        width: 100%;
        border-bottom: rgb(242, 246, 253) solid 1px
    }

    .sonsonTr {
        height: 44px;
        line-height: 44px;
        width: 100%;
    }
    .sonsonTrDetail {
        text-align: center;
        height: 38px;
        line-height: 38px;
        width: 100%;
    }

    .buttonGroup{
        position: absolute;
        right: 0;
        z-index: 101;
    }

    .changeModel{
        width: 10em;
        display: inline-block;
        vertical-align:middle;
    }
    .changeI{
        font-size: 21px!important;
        /*padding-right: 0.5em;*/
    }
    .changeIContainer{
        height: 34px;
        border: solid 1px #d1dbe5;
    }
    div.sonTr:hover {
        background-color: rgb(246, 250, 255);
    }
    div.moreListSonTr:hover{
        background-color: rgb(246, 250, 255);
    }

    .sonTdFirst {
        cursor: pointer;
        /*width: 20%;*/
        padding-right: 15px;
        display: inline;
        float: left
    }
    .sonTd {
        cursor: pointer;
        width: 20%;
        display: inline;
        float: left
    }
    .sonTdBrFirst {
        cursor: pointer;
        /*width: 20%;*/
        height: 150px;
        width: 150px;
    }
    .sonTdBr {
        cursor: pointer;
        width: 20%;
        display: inline;
        text-align: center;
    }

    .smallPic {
        width:26px;
        height: 26px;
        margin-left: 10px;
        margin-top: -1px;
        line-height: 1;
        vertical-align: middle;
    }
    .smallPic {
        width:26px;
        height: 26px;
        margin-left: 10px;
        margin-top: -1px;
        line-height: 1;
        vertical-align: middle;
    }
    .smallPicDetail {
        padding: 10px 10px 10px 10px;
        width:130px;
        height: 130px;
        vertical-align: middle;
        /*border: solid 1px red;*/
    }
    .menu {
        position: absolute;
    }

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-active {
        padding-left: 10px;
        opacity: 0;
    }

    .in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {
        transition: all .6s;
    }

    .in-out-translate-fade-enter, .in-out-translate-fade-leave-active {
        opacity: 0;
    }

    .in-out-translate-fade-enter {
        transform: translateX(-50px);
    }

    .in-out-translate-fade-leave-active {
        transform: translateX(50px);
    }

    .out-in-translate-fade-enter-active, .out-in-translate-fade-leave-active {
        transition: all .5s;
    }

    .out-in-translate-fade-enter, .out-in-translate-fade-leave-active {
        opacity: 0;
    }

    .out-in-translate-fade-enter {
        transform: translateX(25px);
    }

    .out-in-translate-fade-leave-active {
        transform: translateX(-200px);
    }

</style>
