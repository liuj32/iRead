<template>
    <div class="container">
         <Loading v-show="isLoading"></Loading>
         <div class="page-ranking" >
            <ul class="navbar">
               <li class="item" v-for="(value,key,index) in category" @click="current = key" :class="{active: key==current}">{{value}}</li>
            </ul>
            <ul class="ranking" v-if="!isLoading">
                 <li v-for="(item,index) in ranked" @click="goRank(item)">
                    <div class="rankItem">
                       <div class="img" v-if="!item.collapse"><img :src="$staticPath+item.cover" alt=""></div>
                       <div class="num" v-else>{{index+1}}</div>
                      <span>  {{item.title}}</span>
                    </div>
                 </li>
            </ul>           
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ls from "@/utils/localStorage";

export default {
  name: "Rank",
  data(){
       return{
            isLoading:false,
            ranking:{},
            category:{male:"男生",female:"女生",epub:"出版",picture:"漫画"},
            current:"male",
            
       }
  },
  created() {
      if(ls.getItem("ranking")){
           this.ranking = ls.getItem("ranking")
      }else{
          this.getRanking()
      }
  },
  computed:{
     ranked(){
          let nowRank = this.ranking[this.current]
          console.log(nowRank)
          let arr1 = []
          let arr2 = []
          arr1 =  nowRank.filter(item=> item.title.indexOf("Top100") != -1)
          arr2 = nowRank.filter(item => item.title.indexOf("Top100") == -1)
          return [...arr1,...arr2]
     }
  },
  filters: {
    parseImg(img) {
      let url = img.split("/agent/")[1];
      return unescape(url);
    }
  },
  components: {

  },
  methods: {
   
    getRanking() {
        this.isLoading = true
      this.$axios(`/api/ranking/gender`).then(res => {
           console.log(res)
         this.ranking = res.data;
         this.isLoading = false
         this.saveRanking()
      });
    },
    goRank(item){
        ls.setItem("rank",item)
        this.$router.push({path:`/ranking/`})
    },
    saveRanking(){
       ls.setItem("ranking",this.ranking)
    }
  }
};
</script>

<style lang="less" scoped>
li{
     list-style: none;
}
.container {
  width: 100vw;
  height: 100vh;
  .page-ranking{
      padding-top: 6.5vh;
      .navbar{
          display: flex;
          box-sizing: border-box;
          .item{
            padding-bottom: 1vh;
            flex: 0 0 25%;
          }
          .active{
               border-bottom: 2px solid #26a2ff;
          }
     }
     .ranking{
       height: 80vh;
       overflow-y: scroll;
        .rankItem{
           padding: 2vw;
           border-bottom: 1px solid #eee;
           text-align: left;
           display: flex;
           height: 3vh;
           .num{width: 7vw;padding-left: 1vw;}
           .img{
                     width: 5vw;
                     height: 5vw;
                     padding-right: 3vw;
                img{
                     max-width: 6vw;
                     max-height: 6vw;
                }
           }
          }
     }      
  }
 
}
</style>

