<template>
  <div class="home-container">
    <div class="hot-wrapper">
     
       <div class="top">
          <div class="tip">追书最热榜</div>
          <router-link to="wholeLabel" class="more">
             更多<i class="iconfont icon-more"></i>
          </router-link>
       </div>
      <div class="label-wraper" v-show="!isLoading">
          <div class="label-wraper" >
            <router-link class="label" v-for="(item,index) in showLabel"  :key="index" :to="{path:'/detail/'+item._id}">{{item.title}}</router-link>
          </div>
      </div>
        <Loading v-show="isLoading"/>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/comm/Loading'
import ls from '@/utils/localStorage'

export default {
  name: "hotSearch",
  components: {},
  data() {
    return {
        hotLabel:[],
        isLoading: true,
    }
  },
  components:{
     Loading,
  },
  created(){
    if(!ls.getItem("hot_label")){
      this.$axios(`/api/ranking/54d43437d47d13ff21cad58b`).then((res) =>{
          if(res.status == 200){
            this.hotLabel =  res.data.ranking.books
            this.isLoading = false
            this.$store.dispatch("setHotLabel", this.hotLabel)
          }
          console.log(res)
      })
    }else{
      this.isLoading = false;
      this.hotLabel = ls.getItem("hot_label")
    }

  },
  computed:{
     showLabel(){
       return this.hotLabel.slice(0,7)
     }
  },
  mounted() {},
  methods: {
     onSearch(e){
        console.log(e.target.innerText)
        let txt =  e.target.innerText
        this.$store.dispatch("search",txt)
    },
    onChange(value) {}
  }
};
</script>

<style lang="less">
.home-container {
  width: 100%;
   a{
     text-decoration: none;
   }
  .hot-wrapper {
    text-align: left;
    .top{
       display: flex;
       padding: 4vw;
       font-size: 3vw;
        color: #999999;
        .iconfont{
          font-size: 3vw;
        }
      .tip{
          
          text-align: left;
          
         
        }
        .more{
          text-align: right;
           flex: 1;
        }
    }

    .label-wraper {
      display: flex;
      flex-wrap: wrap;
      padding: 0 4vw;
      border-bottom: 1px solid #e4e4e4;
      .label {
        padding: 0.8vw 2vw;
        border-radius: 1vw;
        background-color: #efefef;
        font-size: 3.4vw;
        margin-bottom: 4vw;
        margin-right: 2vw;
        color: #666;
      }
      a{
        text-decoration: none;
      }
    }
    .search-list {
      color: #555;
      .list-item {
        display: flex;
        align-items: center;
        padding: 4vw;
        border-bottom: 1px solid #e4e4e4;
        font-size: 3.6vw;
        &:active {
          background-color: #efeff4;
        }
        .list-item {
          display: flex;
          align-items: center;
        }
      }
    }
  }

}
</style>