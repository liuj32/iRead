<template>
   <transition name="slide-fade">
    <div class="top-nav" v-show="bar">
       <div class="back" @click="goBack">
           <i class="iconfont icon-back"></i>
       </div>
       <div class="title">hello</div>
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
       }

     }
}
</script>

<style lang="less" scoped>
   .top-nav{
      width: 100vw;
      height: 7vh;
      position: fixed;
      top: 0;
      left: 0;
      line-height: 7vh;
      background: #000;
      color: #fff;
      opacity: 1;
      z-index: 99;
      .back{
        position: absolute;
           top: 0;
           left: 2vh;

      }
      .title{
         
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

