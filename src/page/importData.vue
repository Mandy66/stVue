<template>
   <div style="height: 100%">
       <transition name="slide-fade" appear>
           <div class="fillcontain" >
               <head-top></head-top>
               <div class="table_container" >
                   <div class="importTitle" >
                       历史脚本展示
                       <div><el-button @click="watchPyDemo">查看DEMO</el-button></div>
                       <div><router-link to="/pyUpload"><el-button>上传脚本</el-button></router-link></div>
                   </div>
                   <el-table
                       :data="tableData"
                       highlight-current-row
                       stripe
                       style="width: 100%;border: none">
                       <!--<el-table-column-->
                       <!--type="index"-->
                       <!--width="100">-->
                       <!--</el-table-column>-->
                       <el-table-column
                           property="name"
                           label="名称"
                           width="220">
                       </el-table-column>
                       <el-table-column
                           property="daName"
                           label="用于生成数据集"
                           width="220">
                       </el-table-column>
                       <el-table-column
                           property="owner"
                           label="创建人">
                       </el-table-column>
                       <el-table-column
                           property="date"
                           label="创建时间">
                       </el-table-column>
                       <el-table-column
                           label="操作"
                       >
                           <template scope="scope" >
                               <a href="javascript:void(0)" @click="deletePy(scope.$index, scope.row)"><i class="el-icon-delete colorStyle optionButton"></i></a>
                               <a href="javascript:void(0)" @click="watchPy( scope.row)"><i class="el-icon-search colorStyle optionButton"></i></a>
                           </template>
                       </el-table-column>
                   </el-table>
               </div>
           </div>
       </transition>
   </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getInfo} from '@/api/getData'
    import { mapActions, mapState } from 'vuex'

    export default {
        data(){
            return {
            	//列表内容
                tableData: [],
                //是否删除成功
                deleteFlag: null
            }
        },
        components: {
            headTop
        },
        activated(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const list = await getInfo({posttype: "getScriptList", hello: "world"});
                    this.tableData = [];
                    if(list.error === ""){
                        this.$store.state.user.user_name = list.user;
                        this.$store.state.user.user_img = list.user_img;
                        list.DATA.forEach(item => {
                            const tableData = {};
                            tableData.ID = item.ID;
                            tableData.name = item.name;
                            tableData.daName = item.dsName;
                            tableData.owner = item.owner;
                            tableData.date = item.date;
                            this.tableData.push(tableData);
                        })
                    }else {
                    	console.log("Error: " + list.error)
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            deletePy(index, row){
            	console.log("delete");
            	console.log(index);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '删除中...';
                            this.doDelete(index, row, instance, done);
                        } else {
                            done();
                        }
                    }
                }).then(() => {

                }).catch(() => {
                });
            },
            async doDelete(index, row, instance, done){
                console.log(row);
                const result = await getInfo({posttype: "dele", ID: row.ID});
                console.log(this.tableData);
                this.deleteFlag = result;
                instance.confirmButtonLoading = false;
                done();
                if(this.deleteFlag.error === ''){
                    this.tableData.splice(index, 1);
                    this.$notify({
                        title: '删除成功!',
                        message: '完成' + row.name + '脚本的删除',
                        type: 'success'
                    });
                }else{
                    this.$notify.error({
                        title: '未完成' + row.name + '脚本的删除',
                        message: '原因：' + this.deleteFlag.error,
                        duration: 0
                    });
                }
            },
            watchPy(row){
            	this.$store.state.status.path = '/watchPy';
                this.$store.state.status.tempJson = row;
                //console.log(row);
                this.$router.push('/showPyConfig');
            },
            watchPyDemo(){
                this.$store.state.status.path = '/showPyConfig';
                this.$router.push('/showPyConfig');
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .importTitle{
        width: 100%;
        font-size: large;
        text-align: left;
        padding-bottom: 20px;
    }
    .importTitle > div{
        float: right;
        margin-right: 10px;
    }
    a:visited{
        color: black;
    }
    a:hover{
        color: #20a0ff;
    }
    a{
        color: black;
    }
    .el-table td,th.is-leaf {
        border: none!important;
    }
    .colorStyle{
        color: #20a0ff;
    }
    .optionButton{
        font-size: large;
    }
    .cell{
        text-align: center;
    }
    .bodyContainer{
        height: 100%;
    }
</style>
