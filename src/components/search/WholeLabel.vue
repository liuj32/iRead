<template>
    <div class="container">
       <div class="header" @click="goBack">
          <i class="iconfont icon-back" ></i>
          <span>&nbsp;热门推荐</span>
       </div>
        <div class="labelBox">
            <ul>
                <li v-for="(item,index) in labels" >
                   <router-link :to="{path:'/detail/'+item._id}">
                        <span class="number">{{index+1}}</span>
                        <span class="text" >{{item.title}}</span>
                   </router-link>

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ls from '@/utils/localStorage'

export default {
     name:'wholeLabel',
     data(){
         return{
            labels:[],
         }
     },
     created(){
         this.labels = ls.getItem("hot_label");
     },
     components:{
        
     },
     methods:{
       goBack(){
           this.$router.go(-1)
       },
        onSearch(e){
            console.log(e.target.innerText)
            let txt =  e.target.innerText
            this.$store.dispatch("search",txt)
            this.goBack()
          
        },
     }
}
</script>

<style lang="less" >
   
   .container{
       display: flex;
       flex-direction: column;
       width:100%;
       height: 100%;
      .header{
          padding-left: 2vw;
          text-align: left;
          display: flex;
          height: 10vw;
          line-height: 10vw;
          font-size: 4vw;
          color:red;
         .iconfont{
             font-size: 7vw;
             font-weight: bold;
         }
         span{
            vertical-align: middle;    
         }
      }
      .labelBox{
          
           flex: 1;
           text-align: left;
           padding:2px;
           overflow: auto;
          ul{
             
              li{
                  padding: 4vw 8vw 4vw 2vw;
                  list-style: none;
                  border-bottom: 1px solid #eee;
              }
              a{
                  text-decoration: none;
              }
          }
      }
   }
</style>

