<template>
    <div id="app">
        <ToDoList></ToDoList>
    </div>
</template>

<script>
import ToDoList from './components/ToDoList'

export default {
    components: {
        ToDoList
    }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    body {
        margin: 0;
        background-color: #f8f8f8;
    }
</style>
