<template>
   <div style="width: 100%">
       <transition name="slide-fade" appear>
           <div class="fillcontain" v-if="!showConfig">
               <head-top></head-top>
               <div class="table_container">
                   <div class="importTitle">
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
                               <a href="javascript:void(0)" @click="deletePy(scope.row)"><i class="el-icon-delete colorStyle optionButton"></i></a>
                               <a href="javascript:void(0)" @click="watchPy(scope.row)"><i class="el-icon-search colorStyle optionButton"></i></a>
                           </template>
                       </el-table-column>
                   </el-table>
               </div>
           </div>
       </transition>
       <transition name="slide-fade" appear>
           <showPyConfig v-if="showConfig" :data.sync="pyContent">

           </showPyConfig>
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
                tableData: [],
                showConfig: false,
                pyContent: {},
            }
        },
        components: {
            headTop
        },
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const list = await getInfo({posttype: "getScriptList"});
                    this.tableData = [];
                    if(list.error === ""){
                        list.DATA.forEach(item => {
                            const tableData = {};
                            tableData.ID = item.ID;
                            tableData.name = item.name;
                            tableData.daName = item.dsName;
                            tableData.owner = item.owner;
                            tableData.date = item.date;
                            this.tableData.push(tableData);
                        })
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            deletePy(row){
            	console.log("delete");
            	console.log(row);
            },
            watchPy(row){
                console.log("watch");
                console.log(row);
            },
            watchPyDemo(){
                this.$router.push('/showPyConfig');
            }
        },
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
</style>
