<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; ">
                <div class="bigTitle"><i style="text-indent: 10%" class="el-icon-minus"></i><i class="bigText">中科视拓</i></div>
				<el-menu :default-active="defaultActive" style="min-height: 100%;background-color: white;color: black" router>
					<el-menu-item index="manage">首页</el-menu-item>
                    <el-menu-item index="importData">导入数据</el-menu-item>
					<!--<el-submenu index="2">-->
						<!--<template slot="title"><i class="el-icon-document"></i>数据管理</template>-->
						<!--<el-menu-item index="userList">用户列表</el-menu-item>-->
						<!--<el-menu-item index="shopList">商家列表</el-menu-item>-->
						<!--<el-menu-item index="foodList">食品列表</el-menu-item>-->
						<!--<el-menu-item index="orderList">订单列表</el-menu-item>-->
						<!--<el-menu-item index="adminList">管理员列表</el-menu-item>-->
					<!--</el-submenu>-->
					<!--<el-submenu index="3">-->
						<!--<template slot="title"><i class="el-icon-plus"></i>添加数据</template>-->
						<!--<el-menu-item index="addShop">添加商铺</el-menu-item>-->
						<!--<el-menu-item index="addGoods">添加商品</el-menu-item>-->
					<!--</el-submenu>-->
					<!--<el-submenu index="4">-->
						<!--<template slot="title"><i class="el-icon-star-on"></i>图表</template>-->
						<!--<el-menu-item index="visitor">用户分布</el-menu-item>-->
						<!--&lt;!&ndash; <el-menu-item index="newMember">用户数据</el-menu-item> &ndash;&gt;-->
					<!--</el-submenu>-->
					<!--<el-submenu index="5">-->
						<!--<template slot="title"><i class="el-icon-edit"></i>编辑</template>-->
						<!--&lt;!&ndash; <el-menu-item index="uploadImg">上传图片</el-menu-item> &ndash;&gt;-->
						<!--<el-menu-item index="vueEdit">文本编辑</el-menu-item>-->
					<!--</el-submenu>-->
					<!--<el-submenu index="6">-->
						<!--<template slot="title"><i class="el-icon-setting"></i>设置</template>-->
						<!--<el-menu-item index="adminSet">管理员设置</el-menu-item>-->
						<!--&lt;!&ndash; <el-menu-item index="sendMessage">发送通知</el-menu-item> &ndash;&gt;-->
					<!--</el-submenu>-->
					<!--<el-submenu index="7">-->
						<!--<template slot="title"><i class="el-icon-warning"></i>说明</template>-->
						<!--<el-menu-item index="explain">说明</el-menu-item>-->
					<!--</el-submenu>-->
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
    .el-menu-item{
        text-indent: 5px;
    }
    .el-menu-item.is-active {
        color: black;
        text-indent: 0;
        border-left: 5px #20a0ff solid;
    }
    .bigTitle{
        height: 60px;
        width: 100%;
        font-size: large;
        background-color: #20a0ff;
        color: white;
    }
    .bigText{
        line-height: 60px;
        text-align: center;
        font-size: larger;
        font-weight: 500;
        margin-left: 15%;
    }
</style>
