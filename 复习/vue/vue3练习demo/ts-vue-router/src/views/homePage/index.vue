<template>
  <div class="home">
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
<div class="over-flow">
  <van-pull-refresh
  v-model="isLoading"
  success-text="刷新成功"
  @refresh="onRefresh"
>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad">
<div v-for="(item,index) in applyList" :key="index" >
  <list-item ref="listItemRef" @clickList="clickList" @deleteList="deleteList" :dataObj="item" :index="index"></list-item>
</div>
  <!-- <van-cell :title="item"> -->
  <!-- </van-cell> -->
</van-list>
  </van-pull-refresh>
</div>
  </div>
</template>

<script lang="ts">
import { onMounted,reactive,toRefs,computed,ref} from 'vue'
import { NavBar,List,PullRefresh } from 'vant';
import {getApplyList,deleteBook} from '@/api/apply/apply'
import ListItem from '@/views/homePage/components/listItem.vue'
import { getDateWeek,formatDate}from '@/utils/util'
export default {
components:{
  [NavBar.name]: NavBar,
  [List.name]:List,
  [PullRefresh.name]:PullRefresh,
  ListItem

},
setup(props:any,ctx:any){
  const state:any=reactive({
    applyList:[],
    page:0,
    size:10,
    loading:false,
    finished:false,
    isLoading:false,
    onMountedDate:'',
    time:'',
    listItemRef:null
  })
  onMounted(() => {
       state.onMountedDate=new Date()
       console.log(state.onMountedDate,'state.onMountedDate')
  })
      state.listItemRef = ref(null);
      state.time = computed(()=>{
      const now:any = new Date()
      return (now - state.onMountedDate)
    })
    const onClickLeft=()=>{}
    const onClickRight=()=>{}
    const clickList=(index:number|string)=>{
      state.listItemRef.deleteList()
      console.log(index,'index---->',)
    }
    const getList=(list:Array<any>)=>{
      const params={
        page:state.page,
        size:state.size
      }
      getApplyList(params).then((res:any)=>{
        state.loading=false
        state.isLoading=false
        if(res.data){
          res.data.forEach((item:any)=>{
            item.week = getDateWeek(formatDate(item.createdDate))
            item.date = formatDate(item.createdDate)
          })
          state.applyList=[...list,...res.data]
        }
        if(res.data.length<state.size){
          state.finished=true
        }
        state.page++
      })

    }
    const deleteList=(id:string)=>{

      deleteBook(id).then(res=>{
        onRefresh()
      })
    }
    const onLoad=()=>{
      console.log('上拉加载～～～～')
      state.loading=true
      getList(state.applyList)
    }
   const onRefresh=()=>{
     state.page=0
      getList([])
    }
    return{
      ...toRefs(state),
      onClickLeft,
      onClickRight,
      getList,
      onLoad,
      onRefresh,
      clickList,
      deleteList
      // listItemRef
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  height: 100%;
  .over-flow{
    overflow-y: scroll;
    width: 100%;
    height: 95vh;
  }
}
</style>