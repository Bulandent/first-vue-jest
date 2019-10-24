<template>
    <div class="todolist">
        <header>
            <div>
                <h5>ToDoList</h5>
                <input class="to-do-text" 
                    v-model="toDoText" 
                    @keyup.enter="enterText" 
                    placeholder="输入计划要做的事情"/>
            </div>
        </header>
        <div class="todolist-con">
            <h4 v-show="toDoList.length > 0">待完成</h4>
            <ul class="wait-to-do">
                <li v-for="(item, index) in toDoList" :keys="item">
                    <p>
                        <i>{{index + 1}}</i>
                        <input :value="item" @blur="setValue(index, $event)" type="text" />
                    </p>
                    <p>
                        <span class="move" @click="removeToComplete(item, index)">√</span>
                        <span class="del" @click="deleteWait(index)">-</span>
                    </p>
                </li>
            </ul>
            <h4 v-show="completedList.length > 0">已完成</h4>
            <ul class="has-completed">
                <li v-for="(item, index) in completedList" :keys="item">
                    <p>
                        <i>{{index + 1}}</i>
                        <input :value="item" disabled="true" type="text" />
                    </p>
                    <p>
                        <span class="move" @click="removeToWait(item, index)">x</span>
                        <span class="del" @click="deleteComplete(index)">-</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import * as axios from '../../__mocks__/axios'
export default {
    data() {
        return {
            toDoText: '',
            toDoList: [],
            completedList: []
        }
    },
    mounted () {
        axios.get('toToList.json').then(res => {
            this.toDoList = res.data
        }).catch(err => {
            
        })
    },
    methods: {
        setValue(index, e) {
            this.toDoList.splice(index, 1, e.target.value)
        },
        removeToComplete(item, index) {
            this.completedList.splice(this.completedList.length, 0, item)
            this.toDoList.splice(index, 1)
        },
        removeToWait(item, index) {
            this.toDoList.splice(this.toDoList.length, 0, item)
            this.completedList.splice(index, 1)
        },
        enterText() {
            if (this.toDoText.trim().length > 0) {
                this.toDoList.splice(this.toDoList.length, 0, this.toDoText)
                this.toDoText = ''
            }
        },
        deleteWait(index) {
            this.toDoList.splice(index, 1)
        },
        deleteComplete(index) {
            this.completedList.splice(index, 1)
        }
    }
};
</script>

<style lang="scss">
    .todolist {
        h4 {
            text-align: left;
            margin: 15px 0;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            h5 {
                margin: 0;
                font-size: 18px;
            }
            input {
                width: 400px;
                outline: none;
                border: none;
                padding: 0 5px;
            }
            div {
                width: 600px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
            }
        }
        .todolist-con {
            width: 600px;
            margin: 0 auto;
            ul {
                margin: 0;
                padding: 0;
                li {
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    background-color: #fff;
                    border-radius: 3px;
                    line-height: 2em;
                    & + li {
                        margin-top: 15px;
                    }
                    p {
                        margin: 0;
                        padding-right: 5px;
                        input {
                            border: none;
                            width: 450px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            outline: none;
                        }
                        i {
                            width: 20px;
                            display: inline-block;
                            color: #fff;
                            margin-right: 10px;
                            font-style: normal;
                            font-size: 14px;
                            background-color: #ea6969;
                            border-bottom-left-radius: 3px;
                            border-top-left-radius: 3px;
                        }
                    }
                    span {
                        display: inline-block;
                        cursor: pointer;
                        color: #999;
                        width: 30px;
                    }
                }
                &.has-completed {
                    li {
                        p {
                            i {
                                background-color: #42b142;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
