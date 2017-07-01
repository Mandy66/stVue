<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
            <el-col :span="24" style="height: 80px;top: 0;position: relative">
                <a href="javascript:void(0)" style="position: absolute;left: 30px;top: 28px;"> <i class="iconfont headIcon icon-caidan"></i></a>
                <img src="../assets/img/biglogo.png" alt="" style="position: absolute;left: 50%;margin-left: -162px;height: 80px;bottom:0">
                <el-menu class="el-menu-demo" mode="horizontal" style="background-color: white;position: absolute;right: 60px;top: 10px;" @select="handleSelect">
                    <i class="el-icon-message" style="font-size: 24px;line-height: 60px;float: left;color: #90a4ae;padding-right: 80px;"></i>
                    <el-dropdown @command="handleCommand" menu-align='start' style="float: left">
                        <img :src="user.user_img" class="avator" >
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="home">首页</el-dropdown-item>
                            <el-dropdown-item command="singout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-submenu index="2" style="font-size: 24px">
                        <template slot="title">hello,{{user.user_name}}</template>
                        <el-menu-item index="2-1" command="singout">退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
	  		<el-col :span="4"  class="holeSiteColor" style="height: 100%">
				<el-menu :default-active="defaultActive" class="ManageSlideBar holeSiteColor" router>
					<el-menu-item style="padding: 0 30px 0 30px!important;" index="manage"><i class="iconfont icon-jiqixuexi iconCss"></i>首页</el-menu-item>
                    <el-menu-item style="padding: 0 30px 0 30px!important;" index="importData"><i class="iconfont icon-daoru iconCss" style="font-size: 17px!important;"></i>导入数据</el-menu-item>
                    <el-menu-item style="padding: 0 30px 0 30px!important;" index="dataSet"><i class="iconfont icon-wenjianjiafolder85 iconCss" ></i>数据集</el-menu-item>
                </el-menu>
			</el-col>
			<el-col :span="20" class="bodyContainer">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    import {signout} from '@/api/getData'
    import {baseImgPath} from '@/config/env'
    import {mapActions, mapState} from 'vuex'

    export default {
        data(){
            return {
                baseImgPath,
                firstPage : ['导入数据'],
            }
        },
        created(){

        },
        computed: {
            ...mapState(['user']),
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            }
        },
        activated(){

        },
        methods: {
            ...mapActions(['getAdminData']),
            async handleCommand(command) {
                if (command == 'home') {
                    this.$router.push('/manage');
                }else if(command == 'singout'){
                    const res = await signout()
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '退出成功'
                        });
                        this.$router.push('/');
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        },
        mounted(){
        }
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
    @import "../style/iconfont.css";
	.manage_page{
        background-color: white;
	}
    .el-menu-item{
        text-indent: 5px;
    }
    .el-menu-item.is-active {
        color: black;
        text-indent: 0;
        border-left: 5px #20a0ff solid;
    }
    .avator{
        .wh(60px, 60px);
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .headIcon{
        color: #78909c;
        font-size: 24px!important;
    }
    .iconCss{
        font-size: 21px!important;
        padding-right: 30px;
    }
    .el-menu-item{
        color:#90a4ae;
    }
    .el-menu-item.is-active{
        color:white
    }
</style>
