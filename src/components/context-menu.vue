<template>
    <div class="_context-menu">
        <ul class="menuul">
            <li
                    v-for="item in data"
                    :class="{disabled:item.disabled,abled:!item.disabled,divide:item.type=='divide','list-item':item.type!=='divide'}"
                    @click="click(item)"
            >
                {{item.text}}
            </li>
        </ul>
    </div>
</template>

<script>
    module.exports = {
        props:{
            data:Array,
            file:Object
        },
        data: function () {
            return {}
        },
        methods: {
            click:function (item) {
                console.log(item);
            	console.log("This content: ");
            	console.log(this.file);
                const h = this.$createElement;
                if(item.type === 'prop'){
                    this.$msgbox({
                        title: this.file.name + '属性',
                        message: h('div', null, [
                        	h('table', {"class" : 'propTable'}, [
                        		h('tr', {"class" : 'propTr'}, [
                        			h('td', {"class" : 'propTdLeft'}, '类型'),
                                    h('td', null, this.file.type),
                                ]),
                                h('tr', {"class" : 'propTr'}, [
                                    h('td', {"class" : 'propTdLeft'}, '类数量'),
                                    h('td', null, this.file.size),
                                ]),
                                h('tr', {"class" : 'propTr'}, [
                                    h('td', {"class" : 'propTdLeft'}, '所属组别'),
                                    h('td', null, this.file.peoNum),
                                ]),
                                h('tr', {"class" : 'propTr'}, [
                                    h('td', {"class" : 'propTdLeft'}, '可见权限'),
                                    h('td', null, this.file.id),
                                ]),
                                h('tr', {"class" : 'propTr'}, [
                                    h('td', {"class" : 'propTdLeft'}, '创建日期'),
                                    h('td', null, this.file.date),
                                ]),
                            ]),
                        ]),
                        showConfirmButton: false,
                    }).then(action => {

                    });
                }
            }
        },
        components: {},
        ready: function () {

        }
    }
</script>
<style>
    ._context-menu {
        background: rgba(234, 234, 234, 0.7);
        border-radius: 4px;
        text-indent: 0.5em;
    }
    .divide{
        border-top:1px solid #ccc;
        margin:5px;
    }
    .menuul {
        width:100px;
        padding:5px 0;
        list-style: none;
    }
    .list-item {
        cursor: pointer;
        color: #333;
        padding: 0 10px;
    }
    li.abled:hover{
        background:#20a0ff;
        color:#fff;
    }
    .disabled{
        color:#999;
    }
    .propTable{
        width: 100%;
    }
    .propTr{
        width: 100%;
    }
    .propTd{
        width: 50%;
    }
    .propTdLeft{
        color: gray;
    }
</style>
