<template>
   <transition name="slide-fade">
    <div class="bottom-nav" v-show="bar">
       <div class="item" @click="toggleListPanel">
           <i class="iconfont icon-viewlist" ></i>
           <span>目录</span>
       </div>
       <div class="item" @click="toggleSettingPanel">
           <i class="iconfont icon-set"></i>
           <span>设置</span>
       </div>
       <div class="item" @click="toggleModelPanel">
           <i class="iconfont icon-cascades"></i>
           <span>模式</span>
       </div>             
    </div>       
   </transition>
</template>

<script>
import {mapState} from 'vuex'

export default {
     name:'TopNav',
     data(){
         return{
           
         }
     },
     created(){
        
     },
     computed:{
         ...mapState([
             "bar"
         ])
     },
     components:{
        
     },
     methods:{
       goBack(){
           this.$router.go(-1)
       },
       toggleListPanel(){
            this.$store.dispatch("toggleListPanel")
           this.$store.dispatch("toggleBar")
       },
       toggleSettingPanel(){
         this.$store.dispatch("toggleBar")
           this.$store.dispatch("toggleSettingPanel")
       },
       toggleModelPanel(){
           this.$store.dispatch("toggleModel")
       },

     }
}
</script>

<style lang="less" scoped>
   .bottom-nav{
      width: 100vw;
      height: 7vh;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #000;
      color: #fff;
      opacity: 1;
      display: flex;
      z-index: 99;
        .item{
          padding-top: 2vw;
          font-size:2vw;
          display: flex;
          flex-direction: column;
          width: 33%;
      
        }
   }
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .1s ease
}
.slide-fade-enter, .slide-fade-leave-to {
  height: 0vh;
}
.slide-fade-enter-to,.slide-fade-leave{
  height:7vh !important;
}   
</style>

