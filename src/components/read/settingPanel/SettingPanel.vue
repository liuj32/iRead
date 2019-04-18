<template>
  <transition name="slide-fade">
    <div class="settingBox" >
        <div class="brightness"><span>系统设置</span> </div>
        <div class="theFont">
            <span class="font icon" @click="addFont">
                <i class="iconfont icon-add"></i>
            </span>
            <span class="text">{{font_size}}</span>
            <span class="font icon"  @click="reduceFont">
                <i class="iconfont icon-move"></i>
            </span>
        </div>
        <div class="bgBox">
            <span v-for="item in 7" :key="item" :bg="(item)"  @click="setBGColor(item)"><i v-show="item == bg_color"  class="checked iconfont icon-selected"></i></span>
        </div>
        <div class="alignment">
            <span class="align">1</span>
            <span class="align">2</span>
            <span class="align">3</span>
        </div>
        <div class="otherSetting">
            <div @click="eyecare"><i class="iconfont icon-shu"></i>
                 <div>开启护眼</div>
            </div>
            <div><i class="iconfont icon-shu"></i>
                 <div>切换字体</div>
            </div>
        </div>
    </div>
 </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SettingPanel",
  data() {
    return {
      bgList: []
    };
  },
  created() {},
  computed: {
    ...mapState([
      "font_size","bg_color"
    ])
  },
  components: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    reduceFont(){
      if(this.font_size<=12){
        return
      }else{
        let value = this.font_size - 1
        this.$store.dispatch("setFont",value)
      }

    },
    addFont(){
      if(this.font_size>=24){
        return 
      }else{
        let value = this.font_size + 1
        this.$store.dispatch("setFont",value)
      }

    },
    setBGColor(i){
         console.log(i)
         this.$store.dispatch("setBgColor",i)
    },
    eyecare(){
      this.$store.dispatch("setBgColor",1)
    }
  }
};
</script>

<style lang="less" scoped>
.settingBox {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 31vh;
  z-index: 999;
  background: rgb(4, 4,3);
  color: #fff;
  text-align: left;
  padding: 2vw;
  box-sizing: border-box;
  span {
    text-align: center;
    padding: 0.5vw 7vw;
    height: 7vw;
    line-height: 7vw;
    display: inline-block;
  }
  .brightness {
       line-height: 4.5vh;
       span{
       }
  }
  .theFont {
    margin: 1vh 0 1vh 0;
    .font {
      border: 1px solid rgb(50, 50, 50);
    }
  }
  .bgBox {
    width: 100vw;
    white-space: nowrap;
    overflow-x: scroll;
    span {
      padding: 0.5vw 9vw;
      margin-right: 3vw;
      position: relative;
      .checked{
        left: 0;
        z-index: 3;
        color: red;
        font-size: 30px;
        margin-left:5vw;
        position: absolute;
      }
    }

  }
  .alignment {
    margin: 1vh 0 1vh 0;
    .align{
       border: 1px solid rgb(50, 50, 50);
    }
  }
  .otherSetting {
     display: flex;
     text-align: center;
     .iconfont{font-size: 4vw;}
     div{
          flex: 0 0 20%;
          display: flex;
          text-align: center;
          flex-direction: column;
          .iconfont{
            font-size: 18px;
          }
          div{
            font-size: 12px;
          }
     }
  }
}

.bac(@color) {
  background-color: @color;
}

[bg="1"] {
  .bac(#e9dfc7);
}

[bg="2"] {
  .bac(#e7eee5);
}

[bg="3"] {
  .bac(#a4a4a4);
}

[bg="4"] {
  .bac(#cdefcd);
}

[bg="5"] {
  .bac(#283548);
}

[bg="6"] {
  .bac(#0f1410);
}
[bg="7"] {
  .bac(rgb(212, 217, 217));
}
[night="true"] {
  .bac(#0f1410);
  h4 {
    .bac(#0f1410);
  }
}

.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .1s ease
}
.slide-fade-enter, .slide-fade-leave-to {
  height: 0vh;
}
.slide-fade-enter-to,.slide-fade-leave{
  height:31vh !important;
} 
</style>

