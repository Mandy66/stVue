<template>
    <div>

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
                firstPage : ['导入数据'],
    		}
    	},
    	created(){

    	},
    	computed: {
    		...mapState(['user']),
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

</style>
