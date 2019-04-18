<template>
    <div class="page_container">
        <Loading v-show="isLoading"><div slot="text">加载中...</div></Loading>
        <div  v-if="!isLoading">
            <div class="head" @click="back">
               <i class="back iconfont icon-back"></i>
               <span class="title">{{bookDetail.title}}</span>
            </div>
            <div class="body">
                <div class="content" >
                   <div class="info">
                       <div class="img">
                           <img style="width:100%;" :src="bookDetail.cover |decodeUrl" alt="">
                       </div>
                        <div class="right">
                            <p>{{bookDetail.title}}</p>
                            <p>{{bookDetail.author}}</p>
                            <p><span>{{bookDetail.updated | conversionTime}}</span>
                             <span>| {{bookDetail.wordCount}}</span>  
                             <span>| {{bookDetail.minorCate}}</span>
                             </p>
                        </div>
                   </div>
                   <div class="btn-box">
                       <span v-if="isSubscribe" class="btn addUpdated" @click="cancelSubscribe">
                           不追了
                        </span> 
                       <span v-else class="btn addUpdated" @click="subscribe">
                           追更新
                        </span>                         
                       <router-link :to="{path:'/read/'+bookDetail._id}" class="btn start">开始阅读</router-link>
                   </div>
                   <div class="rating">
                       <div>
                           <p>追书人气</p>
                           <p>23423</p>
                       </div>
                       <div>
                           <p>都是对</p>
                           <p>23423</p>
                       </div>
                       <div>
                           <p>追书人气</p>
                           <p>23423</p>
                       </div>                                              
                   </div>
                   <div class="tag">
                      <span v-for="(tag,index) in bookDetail.tags" :class="'tag'+(index+1)">{{tag}}</span>
                      <span class="tag2">{{bookDetail.majorCate}}</span><span class="tag4">{{bookDetail.minorCateV2}}</span>
                   </div>
                   <div class="intro">
                       {{bookDetail.longIntro}}
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ls from '@/utils/localStorage'

export default {
  name: "",
  data() {
    return {
      id: "",
      isLoading:false,
      bookDetail:{},
      subscribeJson:{},          //追更新
      isSubscribe:false,
    };
  },
  created() {
      this.id  = this.$route.params.id;
      this.subscribeJson = ls.getItem("subscribeJson")
      this.isSubscribe = this.subscribeJson && this.subscribeJson[this.id] 
      if(this.book_detail && this.id == this.book_detail._id){
          this.bookDetail = this.book_detail
          console.log(this.book_detail)
      }else{
          console.log("第一次")
          this.getData(this.id)
      }
    
    console.log(this.$route.params.id);
    //
  },
  filters: {
    decodeUrl(url) {
      return unescape(url.split("/agent/")[1]);
    },
    conversionTime(time){
        var d = new Date(time)
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();

        var hh = d.getHours();
        var mm = d.getMinutes();
        var ss = d.getSeconds();
        if(month<10) month = "0"+month
        if(day<10) month = "0"+day
        if(hh<10) month = "0"+hh
        if(mm<10) month = "0"+mm
        if(ss<10) month = "0"+ss
        return  year+"-"+month+"-"+day+" "+hh+":"+mm+":"+ss
    }
  },  
  computed:{
      ...mapState([
          'book_detail'
      ])
  }
  ,
  components: {},
  methods: {
    getData(id){
       this.isLoading = true
        this.$axios(`/api/book/${id}`).then(res=>{
            
            this.bookDetail = res.data
            this.$store.dispatch("bookDetail",res.data)
            this.isLoading = false
        })
    },
    back(){
        this.$router.go(-1)
    },
    subscribe(){
        let url = unescape(this.book_detail.cover.split("/agent/")[1])
        let info = {
            _id:this.book_detail._id,
            img:url,
            updated:this.book_detail.updated,
            lastChapter:this.book_detail.lastChapter,
            title:this.book_detail.title
        }
        if(this.subscribeJson){
            console.log(1)
            this.subscribeJson[this.id] = info
        }else{
            console.log(2)
           this.subscribeJson = {}
           this.subscribeJson[this.id] = info
        }
        this.isSubscribe = true
        ls.setItem("subscribeJson",this.subscribeJson)
    },
    cancelSubscribe(){
        delete this.subscribeJson[this.id]
        this.isSubscribe = false
        ls.setItem("subscribeJson",this.subscribeJson)
    }
  }
};
</script>

<style lang="less" scoped>   
.page_container {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  a{
      text-decoration: none;
  }
  .head {

    height: 40px;
    line-height: 40px;
    background:linear-gradient(90deg, rgb(231, 86, 142), #ff696b);
    color: #fff;
    .back{
       position: absolute;
       left: 1vw;
       top: 0.1vw;
       font-size: 5vw;
       text-align: left;
    }

  }
  .body {
    flex: 1;
    .content {
      word-wrap: break-word;
      word-break: break-all;
      overflow: auto;
      height: 87vh;
      padding: 2vw;
      .info{

          display: flex;
          .img{
              width: 25vw;
              height: 25vw;
              img{
               max-width: 25vw;
                max-height:  25vw;
              }
          }
          .right{
              padding-top: 2vw;
              display:flex;
              flex-direction: column;
              height:  25vw;
              align-content:center;
              vertical-align: middle;
              font-size: 3.5vw;
              margin-left: 2vw;
              text-align: left;
              p{
                  margin-top: 1.5vw;
              }
          }
      }
      .btn-box{
          .btn{
              border-radius: 1vw;
              display: inline-block;
              width: 30vw;
              height: 7vw;
              background:linear-gradient(90deg, rgb(231, 86, 142), #ff696b);
          }
          .addUpdated{margin-right: 8vw;}
      }
      .rating{
          display: flex;
          flex: 1;
          padding: 5vw 10vw;
          div{
              flex: 33.33%;
          }
      }
      .tag{
          padding:0 2vw;
          display: flex;
          flex-wrap: wrap;
          span{padding: 0.3vw 2vw; height: 6vw;border: 1px solid red;display: inline-block;
            margin-left: 3vw;margin-bottom: 3vw;
          }
          .tag1{background: rgb(222, 185, 135)}
          .tag2{background: rgb(95, 158, 150)}
          .tag3{background: rgb(130, 110, 15)}
          .tag4{background: rgb(225, 120, 85)}
          .tag5{background: rgb(100, 150, 240)}
      }
      .intro{
          padding: 2vw;
          text-align: left;

      }
    }
  }
}
</style>

