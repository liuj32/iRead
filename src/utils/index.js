import LoadingComponent from '@/components/comm/Loading'

function conversionTime(time){
  var d;
  if(time){
    d = new Date(time)
  }else{
    d = new Date()
  }
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

export  default {
  install(Vue){
      Vue.component('Loading',LoadingComponent)
      Vue.currentTime = conversionTime
      Vue.prototype.$currentTime = conversionTime
      Vue.prototype.$staticPath="http://statics.zhuishushenqi.com"
      Vue.prototype.common = {
        defaultImage(e) {
          e.target.src = 'http://www.zwdu.com/files/article/image/20/20962/20962s.jpg'
        },
      }      

  }   
}

