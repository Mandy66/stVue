<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">{{config.name}}</el-button>
        <el-dialog :title="config.title" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <picture :config="config.picture"></picture>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
import Picture from './picture'
export default {
    props: {
        'config': {
            default: function () {
                return {
                    name: '点击打开 Dialog',
                    title: '提示',
                    visible: false
                }
            }
        }
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    components: {
        Picture
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
