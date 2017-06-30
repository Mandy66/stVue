<template>
    <transition name="slide-fade" appear>
        <div class="fillcontain">
            <head-top></head-top>
            <div class="table_container">
                <div class="importTitle">
                    上传脚本
                </div>
                <div class="displayer">
                    <div class="upRight" v-model="fileName">{{fileName}}</div>
                    <pre class="language-javascript" style="height: 100%;width: 100%;padding: 0;margin: 0">
                        <code id="output" class="language-javascript"></code>
                    </pre>
                    <!--<ul class="el-upload-list el-upload-list&#45;&#45;text">-->
                        <!--<li class="el-upload-list__item">-->
                            <!--<a class="el-upload-list__item-name">-->
                                <!--<i class="el-icon-document"></i>-->
                                <!--storage.py-->
                            <!--</a>-->
                        <!--</li>-->
                    <!--</ul>-->
                </div>

                <div class="uploader">
                    <!--<div class="upRight">配置文件</div>-->
                    <el-upload
                        class="upload-demo"
                        drag
                        ref="upload"
                        :show-file-list="false"
                        :on-change="clearFiles"
                        :auto-upload="false"
                        :on-success="upSuccess"
                        :on-progress="onProgre"
                        :on-error="upError"
                        :with-credentials="true"
                        accept=".py"
                        id="qwerqwer"
                        :action="pyUploadUrl"
                        :disabled="uploadDisabled"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传.py文件</div>
                    </el-upload>
                </div>
                <el-button class="uploadBut" v-loading.fullscreen.lock="fullscreenLoading"  @click="submitUpload">上传到服务器</el-button>
            </div>
        </div>
    </transition>
</template>

<script>
    import headTop from '../components/headTop'
    import { getPyList, pyUploadUrl } from '@/api/getData'

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
                    if(file !== undefined){
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
        }
    })();

    export default {
        data(){
            return {
            	fileName: '脚本文件',
                pyUploadUrl: '',
                posttypeUpload: {posttype: 'upload'},
                fullscreenLoading: false,
                uploadDisabled: false
            }
        },
        components: {
            headTop,
        },
        created(){

        },
        activated(){
            this.fileName = '脚本文件';
            this.uploadDisabled = false;
            hightLight.init('output', 0);
            this.pyUploadUrl = pyUploadUrl;
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            onProgre(){
                this.fullscreenLoading = true;
            },
            clearFiles(file, fileList){
                //console.log(this.$refs.upload.name);
                console.log(fileList);
                console.log(fileList);
                //console.log(file);
                this.fileName = file.name;
                hightLight.init(this.$refs.upload.name, 1);
                this.uploadDisabled = true;
            },
            upSuccess(response, file, fileList){
                console.log(response);
                console.log(file);
                console.log(fileList);
                this.fullscreenLoading = false;
                if(response.error === ''){
                    this.$notify({
                        title: '上传成功',
                        message: '完成' + file.name + '文件的上传',
                        type: 'success'
                    });
                }else{
                    this.$notify.error({
                        title: '上传失败',
                        message: '未完成' + file.name + '文件的上传',
                    });
                }

                this.$router.push('/importData');
            },
            upError(response, file, fileList){
                console.log(response);
                console.log(file);
                console.log(fileList);
                this.fullscreenLoading = false;
                this.$notify.error({
                    title: '上传失败',
                    message: '未完成' + file.name + '文件的上传',
                });
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
    .el-icon-upload{
       margin-top: 40%!important;
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

</style>
