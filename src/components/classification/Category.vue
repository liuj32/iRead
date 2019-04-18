<template>
    <div class="container">
        <CommHeader>
            <div class="header" slot="commHeader">
                <div class="back" @click="goBack">
                    <i class="iconfont icon-back"></i>
                </div>
                <div class="text">&nbsp;&nbsp;{{major}}</div>
                <div class="clear">书单</div>
            </div>
        </CommHeader>
         <Loading v-show="isLoading"></Loading>
         <div>
            <ul class="minor type">
                <li v-for="(value,key) in type" @click="getBook(key,null)">{{value}}</li>
            </ul>
            <ul class="minor">
                <li>全部</li>
                <li v-for="item in minorArr" @click="getBook(null,item)">{{item}}</li>
            </ul>
            <ul class="content" v-if="!isLoading">
                <li v-for="item in bookList">
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
import SearchedList from "@/components/search/SearchList";
import ls from "@/utils/localStorage";

export default {
  name: "Category",
  data() {
    return {
      isLoading: false,
      gender: "",
      major: "",
      type: {
        hot: "热门",
        new: "新书",
        over: "完结",
        // repulation: "好评",
        // month: "包月"
      },
      minor: {},
      minorArr: [],
      bookList: [],
      typeItem: "hot",
      minorItem: ""
    };
  },
  created() {
    this.gender = this.$route.query.gender;
    this.major = this.$route.query.major;
    if (ls.getItem("minor")) {
      this.minor = ls.getItem("minor");
    } else {
      this.getMinorData();
    }
    console.log(this.minor);
    this.getMinor();
    this.getBook();
  },

  filters: {
    parseImg(img) {
      let url = img.split("/agent/")[1];
      return unescape(url);
    }
  },
  components: {
    CommHeader,
    SearchedList
  },
  methods: {
    getBook(typeArg, minorArg) {
      this.isLoading = true;
      let sex = this.changeType();
      this.typeItem = typeArg || this.typeItem;
      this.minorItem = minorArg || this.minorItem;
      console.log(sex + this.typeItem + this.minorItem);
      this.$axios(
        `/api/book/by-categories?gender=${sex}&type=${this.typeItem}&major=${
          this.major
        }&minor=${this.minorItem}&start=0&limit=20`
      ).then(res => {
        console.log(res);
        this.bookList = res.data.books;
        this.isLoading = false;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    getMinorData() {
      this.$axios(`/api/cats/lv2`).then(res => {
        this.minor = res.data;
        this.saveMinor();
      });
    },
    saveMinor() {
      ls.setItem("minor", this.minor);
    },
    getMinor() {
      let genderKey = this.changeType();
      for (let item of this.minor[genderKey]) {
        if (item.major == this.major) {
          this.minorArr = item.mins;
          break;
        }
      }
    },
    changeType() {
      let title = this.gender;
      let gender = "";
      if (title == "男生") {
        gender = "male";
      } else if (title == "女生") {
        gender = "female";
      } else if (title == "漫画") {
        gender = "picture";
      } else {
        gender = "press";
      }
      return gender;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;

  .type {
    padding-top: 6vh;
  }
  .minor {
    box-sizing: border-box;
    padding-left: 3vw;
    text-align: left;
    border-bottom: 1px solid #eee;
    line-height: 4vh;
    li {
      font-size: 14px;
      margin-right: 2vw;
      display: inline;
    }
  }
  .content {
    overflow-y: scroll;
    height: 80vh;
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
          -webkit-box-orient: vertical;
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

