<template>
<div class="test_one">
  <div class="right">
    <label>游戏</label><input type="text" v-model="game">
  </div>
  <div class="left">
    <button @click="addi">add</button>
    <ul>
      内容
      <li v-for="(i,index) in l">
        <input type="text" v-model="i.name">
        <input type="text" v-model="i.id">
        <button @click="remove(index)">remove</button>
      </li>
    </ul>
  </div>
  <button @click="save">save</button>
</div>
</template>

<script>
export default {
  name: 'test-one',
  data(){
    return {
      game: '',
      l: [
        {
          name: '',
          id: ''
        }
      ]
    }
  },
  created(){
  },
  mounted(){

  },
  methods: {
    addi(){
      this.l.push({
        name:'',
        id: ''
      })
    },
    save(){
      console.log(this.game, this.l)
    },
    remove(i){
      this.l.splice(i, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.test_one{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
