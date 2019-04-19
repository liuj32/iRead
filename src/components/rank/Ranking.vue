<template>
    <div class="container">
        <CommHeader>
            <div class="header" slot="commHeader">
                <div class="back" @click="goBack">
                    <i class="iconfont icon-back"></i>
                </div>
                <div class="text">&nbsp;&nbsp;{{rank.title}}</div>
            </div>
        </CommHeader>
         <Loading v-show="isLoading"></Loading>
         <div>
           <ul class="cells" v-if="rank.monthRank">
              <li v-for="(value,key) in list"  :class="{active: key == current}" @click="current = key">{{value}}</li>
           </ul>
           <ul class="cells" v-else>
             <li class="active">周榜</li>
           </ul>           
            <ul class="content" v-if="!isLoading">
                <li v-for="item in books">
                    <router-link :to="{path:`/detail/${item._id}`}">
                        <div class="item">
                            <div class="img">
                                <img :src="item.cover| parseImg" alt="">
                            </div>
                            <div class="info">
                                <p class="title">{{item.title}}</p>
                                <p class="author">{{item.author}} | {{item.majorCate}}</p>
                                <p class="shortIntro">{{item.shortIntro}}</p>
                                <p class="popularity">留存率:
                                    <span class="red">{{item.retentionRatio}}</span>%
                                </p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul> 
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import CommHeader from "../comm/Header";
import ls from "@/utils/localStorage";

export default {
  name: "Category",
  data() {
    return {
      isLoading: false,
      rank:{},
      list:{_id:"周榜",monthRank:"月榜",totalRank:"总榜"},
      current: "_id",
      books:[]
    };
  },
  created() {
    this.rank = ls.getItem("rank")
    this.getBook()
  },

  filters: {
    parseImg(img) {
      let url = img.split("/agent/")[1];
      return unescape(url);
    }
  },
  components: {
    CommHeader,
  },
  watch:{
    current(val){
      if(val){
        this.getBook()
      }
    }
  },
  methods: {
    getBook() {
      this.isLoading = true;


      this.$axios(`/api/ranking/${this.rank[this.current]}` ).then(res => {
        console.log(res);
         this.isLoading = false
         this.books = res.data.ranking.books
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
   .pad{
       padding-top: 5.5vh;
   }
  .back{
    position: absolute;
    left: 2vw;
  }
 .text{
    margin:  0 auto;
 }
   .cells{
     padding-top: 6vh;
     display: flex;
     li{
       padding-bottom: 1vh;
       padding-top: 1vh;
       list-style: none;
       flex:0 0 33.3%;
     }
     .active{
       border-bottom: 2px solid #26a2ff;
     }
   }
  .content {
    overflow-y: scroll;
    height: 85vh;
    padding: 1vh 2vw;
    a {
      text-decoration: none;
    }
    .item {
      display: flex;
      padding-top: 2vh;
      padding-bottom: 1vh;
      border-bottom: 1px solid rgb(204, 204, 204);

      .img {
        width: 20vw;
        height: 30vw;
        img {
          max-width: 20vw;
          max-height: 30vw;
        }
      }
      .info {
        line-height: 3vh;
        padding-left: 2vw;
        text-align: left;
        padding-top: 1vh;
        .title {
          font-size: 15px;
          color: #333!important;
        }
        .author {
          font-size: 12px;
          color: #999;
        }
        .shortIntro {
          font-size: 13px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
        /* ! autoprefixer: off */  
        -webkit-box-orient: vertical; 
        /* autoprefixer: on */
        }
        .popularity {
          font-size: 7px;
          color: rgb(191, 192, 200);
          .red {
            color: red;
          }
        }
      }
    }
  }
}
</style>

