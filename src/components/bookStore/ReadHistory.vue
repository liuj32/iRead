<template>
    <div class="container">
        <CommHeader>
            <div class="header" slot="commHeader">
                <div class="back" @click="goBack"><i class="iconfont  icon-back"></i></div>
                <div class="text">&nbsp;&nbsp;阅读历史</div>
                <div class="clear">清除</div>
            </div>
        </CommHeader>
         <ul class="content">
            <li v-for="item in historyBooks">
                <div class="item">
                    <div class="img"><img :src="item.cover| parseImg" alt=""></div>
                    <div class="info">
                        <p class="title">{{item.title}}</p>
                        <p class="readTitle">阅读到:{{item.chapterTitle}}</p>
                        <p class="readTime">上次阅读时间{{item.time}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <!-- <SearchedList class="box" :listBook="historyBooks"></SearchedList> -->
    </div>
</template>

<script>
import {mapState} from 'vuex'
import CommHeader from '../comm/Header'
import ls from '@/utils/localStorage'

export default {
     name:'ReadHistory',
     data(){
         return{
            historyBooks:[],
            time:''
         }
     },
     created(){
        this.time = this.$currentTime()
        let oRead = ls.getItem("read_info")
            for(let item in oRead ){
                this.historyBooks.push(oRead[item])
            }
     },
     filters:{
        parseImg(img){
            let url = img.split("/agent/")[1]
            return unescape(url)
        }
     },

     components:{
        CommHeader,
     },
     methods:{
       goBack(){
           this.$router.go(-1)
       }

     }
}
</script>

<style lang="less" scoped>
   .container{
      width: 100%;
      height: 100%;
      .header{
          display: flex;
          .clear{
              position: absolute;
              right: 1vw;
              text-align: right;
          }
      }
      .content{
          margin-top: 7vh;
          padding: 3vh 2vw;
         .item{
             display: flex;
             padding-top: 2vh;
             padding-bottom: 1vh;
             border-bottom: 1px solid rgb(204, 204, 204);
             .img{
                 width:20vw;
                 height:20vw;
                 img{
                 max-width:20vw;
                 max-height:20vw;                     
                 }
             }
             .info{
                 line-height: 3vh;
                 padding-left: 2vw;
                 text-align: left;
                 padding-top: 1vh;
                 .title{font-size: 17px;}
                 .readTitle{font-size:13px;color:rgb(204, 204, 204);}
                 .readTime{font-size:7px;color:rgb(191, 192,200);}
             }


         }
      }
    
   }
</style>

