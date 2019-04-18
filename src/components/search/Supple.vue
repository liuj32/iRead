<template>
    <div class="container">
        <div class="labelBox">
            <ul>
                <li v-for="(item,index) in complement" @click="search(item)">
                    <span class="text">{{item}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>


export default {
     name:'supple',
     data(){
         return{
 
         }
     },
     created(){

     },
     props:{
        complement:{
             type: Array,
             default: []
        },
     },
     components:{
        
     },
     methods:{
       search(value){
           console.log(value)
           this.$store.dispatch("search",value)
          // this.getData(value)
       },
    //    getData(query){
    //         this.$axios(`/api/book/fuzzy-search?query=${query}`).then(res =>{

    //             console.log(res)
               
                
    //         })
    //    }

     }
}
</script>

<style lang="less">
   .container{
       display: flex;
       flex-direction: column;
       width:100%;
       height: 100%;
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
          }
      }
   }
</style>

