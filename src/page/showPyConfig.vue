<template>
    <transition name="slide-fade" appear>
        <div class="fillcontain">
            <head-top></head-top>
            <div class="table_container" >
                <div class="importTitle" v-model="thisPath" >
                    <div style="display: inline;float: left;width: 50%;margin: 0">{{thisPath}}</div>
                    <div style="display: inline;float: left;width: 50%;text-align: right;margin: 0" v-if="thisPath !== '显示DEMO'" v-model="thisTime">{{thisTime}}</div>

                </div>
                <div class="codeContainer">
                    <div class="displayerShow">
                        <div class="upRight">脚本文件</div>
                        <pre class="language-javascript" style="height: 100%;width: 100%;padding: 0;margin: 0">
                            <code id="output1" class="language-javascript"></code>
                        </pre>
                    </div>

                    <div class="uploaderShow">
                        <div class="upRight">配置文件</div>
                        <pre class="language-javascript" style="height: 100%;width: 100%;padding: 0;margin: 0">
                            <code id="output2" class="language-javascript"></code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import headTop from '../components/headTop'
    import { getInfo} from '@/api/getData'

    import prism from 'prismjs'
    import 'prismjs/themes/prism.css'
    var hightLight = (function () {
        return {
            init: function (inputId, status, code) {
                var html = prism.highlight("\n" + code, prism.languages.javascript);
                //console.log(html);
                document.getElementById(inputId).innerHTML = html;
            }
        }
    })();

    export default {
        data(){
            return {
                thisPath: '',
                thisTime: '',
            }
        },
        components: {
            headTop,
        },
        activated(){
            console.log(this.$store.state.status.path + this.$store.state.status.tempJson.ID);
            if(this.$store.state.status.path === '/showPyConfig'){
            	this.thisPath = "显示DEMO";
                this.getAndShowPy('demo');
            }
            else {
            	this.thisPath = this.$store.state.status.tempJson.name;
                this.thisTime = this.$store.state.status.tempJson.date;
                this.getAndShowPy('watch', this.$store.state.status.tempJson.ID);
            }
        },
        methods: {
            async getAndShowPy(status, ID){
                var data = {};
                if(status === "demo"){
                    data = {posttype: 'demo'};
                }else if(status !== null && ID !== null){
                    data = {posttype: 'check', ID: ID};
                }else {
                    console.log("无效的.py文件参数");
                }
                //console.log(data);
                let list = await getInfo(data);
                console.log(list);
                hightLight.init('output1', 1, list.DATA.src);
                hightLight.init('output2', 1, list.DATA.cfg);
            }
        },
        mounted(){

        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .table_container{
        padding-left: 6%;
        padding-right: 6%;
        padding-top: 20px;
        text-align: center;
    }
    .importTitle{
        width: 100%;
        font-size: large;
        text-align: left;
        padding-bottom: 40px;
    }
    .codeContainer{
        height:500px;
    }
    .uploaderShow{
        width: 47%;
        height: 500px;
        background-color: white;
        display: inline-block;
        position: relative;
    }
    .displayerShow{
        width: 47%;
        height: 500px;
        margin-right: 5%;
        background-color: white;
        display: inline-block;
        position: relative;
    }
    .upload-demo, .el-upload, .el-upload-dragger{
        width: 100%;
        height: 100%;
    }
    .uploadBut{
        margin-top: 60px;
    }
    .upRight{
        position: absolute;
        top:0;
        right:0;
        width: 6em;
        height: 2em;
        color: #20a0ff;
        z-index: 100;
        line-height: 2em;
        background-color: #afddff;
    }
    
</style>
