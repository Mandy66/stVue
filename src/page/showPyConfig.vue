<template>
    <transition name="slide-fade" appear>
        <div class="fillcontain">
            <head-top></head-top>
            <div class="table_container">
                <div class="importTitle">
                    上传脚本
                </div>
                <div class="displayer">
                    <div class="upRight">脚本文件</div>
                    <pre class="language-javascript" style="height: 100%;width: 100%;padding: 0;margin: 0">
                        <code id="output1" class="language-javascript"></code>
                    </pre>
                </div>

                <div class="uploader">
                    <div class="upRight">配置文件</div>
                    <pre class="language-javascript" style="height: 100%;width: 100%;padding: 0;margin: 0">
                        <code id="output2" class="language-javascript"></code>
                    </pre>
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
                console.log(html);
                document.getElementById(inputId).innerHTML = html;
            }
        }
    })();

    export default {
        data(){
            return {

            }
        },
        components: {
            headTop,
        },
        created(){

        },
        methods: {
            async getAndShowPy(status, ID){
                let data = {};
                if(status === "demo"){
                    data = {posttype: 'demo'}
                }else if(status !== null && ID !== null){
                    data = {posttype: 'check', ID: ID}
                }else {
                    alert("无效的.py文件参数");
                }
                var list = await getInfo({posttype: 'demo'});
                //console.log(list);
                hightLight.init('output1', 1, list.DATA.src);
                hightLight.init('output2', 1, list.DATA.cfg);
            }
        },
        mounted(){
            this.getAndShowPy('demo');

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
        padding-bottom: 20px;
    }
    .uploader{
        width: 48%;
        height: 500px;
        margin-left: 4%;
        float: left;
        background-color: white;
        display: block;
        position: relative;
    }
    .displayer{
        width: 48%;
        float: left;
        height: 500px;
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
    .el-icon-upload{
        margin-top: 40%!important;
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
