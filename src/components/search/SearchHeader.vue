<template>
  <div class="home-container">
    <div class="Header">
        <div class="form">
          <div class="textBox">
              <input type="text" v-model="search_input" class="searchText" @input="onInput">
          </div>
          
          <div class="btnBox" @click="onSearch">
            <span class="searchBtn">
              搜索
            </span>
          </div>
        </div>
    </div>
      
  </div>
</template>

<script>
import ls from "@/utils/localStorage"
import {mapState} from 'vuex'

export default {        
  name: 'searchHeader',
  components:{
   
  },
  data(){
    return{
       search_input:''
    }
  },
  computed:{
      ...mapState([
        "search_value",
      ])
  },
  created(){
     this.search_input = this.search_value;
  
  },
  watch:{
       search_value(val){
         this.search_input = val;
       }
  },
  mounted(){
  },
  methods:{
     onSearch(e){
        this.$store.dispatch("search",this.search_input)
    },
    onInput(e){
        this.$store.dispatch("searchComplement",e.target.value)
       
    }
  }
};
</script>

<style lang="less">
  .home-container{
    width: 100%;
    
    .Header{
      background:linear-gradient(90deg, rgb(231, 86, 142), #ff696b);
     
      color: #fff;
      text-align: center;
      .form{
        padding: 10px 0px ;
        display: flex;
        .redirect{
          width:75px;
          height: 40px;
           
          
        }
        .textBox{
           flex:1;
            position: relative;
            border-left: 1px solid #e4e4e4;
             border-right: 1px solid #e4e4e4;
             text-align: left;
        }
        .searchText{
          flex:1;
          position:absolute;
          bottom: 0;
          color:#fff;
          font-size: 20px;
         background: transparent;
             height: 30px;
             outline: none;
              border: 1px solid transparent;
        }
        .btnBox{
          
          width:75px;
          border-radius: 0;
          line-height: 35px;
          border: none;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }
      }
    }

  }

 
</style>