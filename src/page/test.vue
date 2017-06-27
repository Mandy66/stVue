<template>
    <div>
        <el-button type="text" @click="switchSrc">点击打开 Dialog</el-button>
        <img src='../assets/img/avator.jpg' class="hidden">
        <img src='../assets/img/1-1.jpg' class="hidden">
        <div class="login_page fillcontain">
            <modal :config="{name: 'test', title: 'test', picture: {src: src, width: 200, height: 100}}"></modal>
        </div>
    </div>
</template>

<script>
import modal from '../components/modal'

export default {
    data() {
        return {
            src: '/static/img/1-1.a92218b.jpg'
        }
    },
    components: {
        modal
    },
    methods: {
        switchSrc() {
            this.src ='/static/img/avator.abbfb12.jpg';
        }
    }
}
</script>

<style>
.hidden {
    display: none;
}
</style>
