<template>
       <div class="headerComm">
          <slot name="commHeader"></slot>
       </div>
</template>

<script>
export default {
     name:'CommHeader',
}
</script>

<style lang="less" scoped>
 
      .headerComm{
          width: 100vw;
          height: 5.5vh;
          line-height: 5.5vh;
          border: 1px solid red;
          position: fixed;
          color: red;
          left: 0;
          top: 0;
          .iconfont{
              font-size: 25px;
          }
        .header{
            display: flex;
            .clear{
                margin-right: 4vw;
                flex:1;
                text-align: right;
            }
        }          
      }
</style>

