<template>
  <div class="book_store">
    <div class="header">
      <h2>iRead</h2>
      <div class="right">
        <i class="iconfont icon-selected" @click="goHistory"></i>
        <i class="iconfont icon-more1" ></i>
      </div>
    </div>
    <div class="body">
       <div class="content">
         <ul class="subscribe">
            <li v-for="item in subscribe">
               <router-link :to="{path: '/read/'+item._id}">
                  <div class="item">
                      <div class="img"><img :src="item.img" alt=""></div>
                      <div class="info">
                          <p class="title">{{item.title}}</p>
                          <p class="readTitle">最近更新时间:{{$currentTime(item.updated)}}</p>
                          <p class="readTime">最后修改章节{{item.lastChapter}}</p>
                      </div>
                  </div>
                </router-link>
            </li>
        </ul>
         
         <div class="addBook">
            <div class="img"><i class="iconfont icon-add"></i></div>
            <div class="info">添加你喜欢的小说</div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import ls from '@/utils/localStorage'

export default {
  name: "bookStore",
  data() {
    return {
       subscribe:{},
    };
  },
  created(){
      console.log("crated")
       this.subscribe = ls.getItem("subscribeJson")
  },
  components: {
   
  },
  methods: {
    goHistory(){
      this.$router.push({path:'/history'})
    }
  },
};
</script>

<style lang="less" scoped>
.book_store {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  .header {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    background: rgb(218, 38, 38);
    display: flex;
    padding-left: 5vw;
    padding-right: 3vw;
    h2 {
      color: #fff;
      flex: 30%;
      text-align: left;
    }
    .right {
      margin-right: 30rw;
      text-align: right;
      flex: 50%;
      .iconfont {
        font-size: 33px;
        color: #fff;
      }
      .my-search{
      }
    }
  }
  .body {
    flex: 1;
    border: 1px solid yellow;
    .content {
      word-wrap: break-word;
      word-break: break-all;
      overflow: auto;
      height: 87vh;
       padding: 3vh 2vw;
      .subscribe{
          //margin-top: vh;
          a{text-decoration: none;}
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
     .addBook{
        display: flex;
        padding-top: 2vh;
        padding-left: 2vw;
       .img{
          width:15vw;
          height:10vh;
          line-height: 10vh;
          background: rgb(239, 239, 239);
       }
       .iconfont{
         font-size: 7vw;
         color: rgb(193, 193, 193);
       }
       .info{
          font-size: 4vw;
          color: rgb(193, 193, 193);
          padding-left: 6vw;
          line-height:10vh;
       }
     }
    }
  }
}
</style>

