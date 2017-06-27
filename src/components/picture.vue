<template>
    <img class="image">
</template>

<script>
import { deployConfig } from '../utils';

export default {
    props: {
        config: {
            default: function () {
                return { alt: '图片不存在' }
            }
        }
    },
    watch: {
        config: function () {
            deployConfig(this.$el, this.config);
        }
    },
    mounted() {
        deployConfig(this.$el, this.config);
    }
};
</script>

<style lang="less">
// .image {
//     display: block;
//     margin: 0 auto;
//     width: 100%;
// }
img {
    display: block;
    margin: 0 auto;
    width: 100%;
}
</style>
