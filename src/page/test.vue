<template>
    <div>
        <el-button type="text" @click="switchSrc">点击打开 Dialog</el-button>
        <img src='../assets/img/avator.jpg' class="hidden">
        <img src='../assets/img/1-1.jpg' class="hidden">
        <div class="login_page fillcontain">
            <modal :config="{type: '', name: 'test', title: 'test'}">
                <picture :config="{src: src, width: 200, height: 100}"></picture>
            </modal>
        </div>
    </div>
</template>

<script>
import modal from '../components/modal'
import picture from '../components/picture'

export default {
    data() {
        return {
            src: '/static/img/1-1.a92218b.jpg'
        }
    },
    components: {
        modal,
        picture
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
