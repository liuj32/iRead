<template>
  <transition name="slide-fade">
    <div class="view-list" >
       <div class="top">
          <div class="title">军事理论</div>
          <div class="directory">
              <span></span>
              <span class="sort">排序</span>
          </div>
       </div>
       <div class="list">
           <ul>
               <li v-for="(item,index) in chaptersList" @click="jumpTo(index)">{{index+1}}. {{item.title}}</li>
           </ul>
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
             "chapters","bar",
         ]),
         chaptersList(){
           if(this.chapters){
                 return this.chapters.chapters
           }
         }
     },
     components:{
        
     },
     methods:{
       goBack(){
           this.$router.go(-1)
       },
       jumpTo(id){
           this.$store.dispatch("toggleListPanel")
           this.$store.dispatch("curChapter",id)
           this.$store.dispatch("toggleBar")
       }
     }
}
</script>

<style lang="less" scoped>
   .view-list{
      width: 80vw;
      height: 100vh;
      //right: 50px;
      position: fixed;
      text-align: left;
      top: 0;
      left: 0;
      background:#fff;
      opacity: 1;
      z-index: 99;
      overflow: hidden;
     .top{
        border-bottom: 1px solid #eee;
        line-height: 4vh;
        font-size: 4vw;
         padding: 4vw 3vw 1vw 3vw;
     }
     .list{
         ul{
             height: 90vh;
             overflow: auto;
             li{
                 padding-left:3vw; 
                 font-size: 2vw;
                 list-style: none;
                 border-bottom: 1px solid #eee;
                color: #333;
                 line-height: 7vh;
             }
         }
     }
   }
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .1s ease
}
.slide-fade-enter, .slide-fade-leave-to {
  width: 0;
}
.slide-fade-enter-to,.slide-fade-leave{
  width:80vw !important;
}    
</style>

