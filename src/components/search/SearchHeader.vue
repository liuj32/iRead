<template>
    <div class="search">
        <div class="searchBar">
            <div class="searchBar-inner">
               <i class="iconfont icon-search icon"></i>
                <input class="searchBar-input" v-model="search_input"  @click="cancel = false" @input="onInput" type="text">
            </div>
            <a class="searchBar-cancel" :class="{cancel:cancel}" @click="cancel = !cancel">取消</a>
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
       search_input:'',
       cancel:false,
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
        this.cancel = false
        console.log(e.target.value)
        this.$store.dispatch("searchComplement",e.target.value)
       
    }
  }
};
</script>

<style lang="less">
.icon{
   line-height: 28px;
}
  .search{
    width: 100%;
    .searchBar{
        background-color: #26a2ff;
        padding: 8px 10px;
        display: flex;
        box-sizing: border-box;
       .searchBar-inner{
         flex: 1;
         background: #fff;
         padding: 4px 6px;
         display: flex;
         height: 28px;
          i{

          }
          .searchBar-input{
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            outline: none;
            border: 0;
          }
       }
       .searchBar-cancel{
         padding-left: 3px;
         padding-right: 3px;
        line-height: 36px;
          color: #fff;
       }
       .cancel{
         display:none;
       }
    }
    
    // .Header{
    //   background-color: #26a2ff;
    //   color: #fff;
    //   text-align: center;
    //   .form{
    //     padding: 10px 0px ;
    //     display: flex;
    //     .redirect{
    //       width:75px;
    //       height: 40px;
           
          
    //     }
    //     .textBox{
    //        flex:1;
    //         position: relative;
    //         border-left: 1px solid #e4e4e4;
    //          border-right: 1px solid #e4e4e4;
    //          text-align: left;
    //     }
    //     .searchText{
    //       flex:1;
    //       position:absolute;
    //       bottom: 0;
    //       color:#fff;
    //       font-size: 20px;
    //      background: transparent;
    //          height: 30px;
    //          outline: none;
    //           border: 1px solid transparent;
    //     }
    //     .btnBox{
          
    //       width:75px;
    //       border-radius: 0;
    //       line-height: 35px;
    //       border: none;
    //       font-size: 20px;
    //       font-weight: 700;
    //       color: #fff;
    //     }
    //   }
    // }

  }

 
</style>