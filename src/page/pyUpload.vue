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
                        <code id="output" class="language-javascript"></code>
                    </pre>
                </div>

                <div class="uploader">
                    <div class="upRight">配置文件</div>
                    <el-upload
                        class="upload-demo"
                        drag
                        ref="upload"
                        action="http://192.168.1.111:8089/up/upload.php"
                        :on-change="clearFiles"
                        :auto-upload="false"
                        :on-success="upSuccess"
                        accept=".py"
                        id="qwerqwer"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传.py文件</div>
                    </el-upload>
                </div>
                <el-button class="uploadBut"  @click="submitUpload">上传到服务器</el-button>
            </div>
        </div>
    </transition>
</template>

<script>
    import headTop from '../components/headTop'
    import { getPyList} from '@/api/getData'

    import prism from 'prismjs'
    import 'prismjs/themes/prism.css'
    var hightLight = (function () {
        return {
            init: function (inputId, status) {
                var code = '';
                if(status === 0){
                    code = `#上传你的代码吧`;
                    var html = prism.highlight("\n" + code, prism.languages.javascript);
                    document.getElementById('output').innerHTML = html;
                }else {
                    var file = document.getElementsByName(inputId)[0].files[0];
                    var reader = new FileReader();
                    //将文件以文本形式读入页面
                    reader.readAsText(file);
                    reader.onload=function(f){
                        var code = this.result;
                        console.log(code);
                        var html = prism.highlight("\n" + code, prism.languages.javascript);
                        console.log(html);
                        document.getElementById('output').innerHTML = html;
                    };
                }
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
            submitUpload() {
                this.$refs.upload.submit();
            },
            clearFiles(file, fileList){
                console.log(this.$refs.upload.name);
                this.upData = fileList.slice(-1);
                hightLight.init(this.$refs.upload.name, 1);
            },
            upSuccess(response, file, fileList){
                console.log(response);
                console.log(file);
                console.log(fileList);
            }
        },
        mounted(){
            hightLight.init('output', 0);
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
