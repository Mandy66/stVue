<template>
    <div>
        <el-button :type="config.type" @click="dialogVisible = true">{{config.name}}</el-button>
        <el-dialog :title="config.title" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <slot></slot>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
export default {
    props: {
        'config': {
            default: function () {
                return {
                    type: 'text',
                    name: '点击打开',
                    title: '提示'
                }
            }
        }
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
