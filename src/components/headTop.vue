<template>
    <div>
        <div class="header_container">
            <div style="margin: 0 auto;">{{$route.meta[0]}}</div>
            <i style="float: right;line-height: 60px;font-size: larger;padding-right: 10%;color: darkgray;" class="el-icon-message"></i>
            <el-dropdown @command="handleCommand" menu-align='start'>
                <img :src="baseImgPath + adminInfo.avatar" class="avator">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="home">首页</el-dropdown-item>
                    <el-dropdown-item command="singout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-menu class="el-menu-demo" mode="horizontal" style="background-color: white" @select="handleSelect">
                <el-submenu index="2">
                    <template slot="title">hi,张三</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="bread_container" >
            <el-breadcrumb  separator="/">
                <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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
                firstPage : ['导入数据']
    		}
    	},
    	created(){
    		if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
    	},
    	computed: {
    		...mapState(['adminInfo']),
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

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color:white;
        text-align: center;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
    .bread_container{
        background-color:#f5f5f5;
        text-align: center;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 6%;
    }
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
