<template>
    <!-- <template #left > -->
      <div @click="clickTime">
        <div class="content">
          <van-swipe-cell>
            <div class="expense-content">
                    <div class="expense-top">
                      <div class="top-left" >
                          <span class="date">{{ dataObj.date}}</span>
                          <span>{{ dataObj.week }}</span>
                      </div>
                      <div class="top-right">
                        <div class="have attachment-ticket" style="color: #ffb337;background: rgba(255,179,55,0.1);" v-if="dataObj.authorizedFlagName==='未授权'">{{dataObj.authorizedFlagName}}</div>
                        <div class="attachment-ticket" v-else>{{dataObj.authorizedFlagName}}</div>
                        <div class="have attachment-ticket" v-if="dataObj.statusDesc==='编辑中'">{{dataObj.statusDesc}}</div>
                        <div class="attachment-ticket" v-else>{{dataObj.statusDesc}}</div>
                      </div>
                    </div>
                    <div class="expense-center">
                      <div class="center-left">
                        <img v-if="dataObj.expenseTypeIconUrl" :src="dataObj.expenseTypeIconUrl" alt="费用图标">
                        <img v-else src="@/assets/huoche.svg">
                        <span>{{dataObj.expenseTypeCategoryName}}</span>
                      </div>
                      <div class="center-right">
                          <span class="amount">{{ dataObj.totalAmount }}</span>
                          <span class="symbol">{{ dataObj.currencyCode }}</span>
                      </div>
                    </div>
                    <div class="expense-bottom">
                      <span class="bottom-left">来源：</span>
                      <span class="bottom-right">{{dataObj.sourceSystemName}}</span>
                    </div>
                    <div class="expense-bottom">
                      <span class="bottom-left">备注：</span>
                      <span class="bottom-right">{{dataObj.description}}</span>
                    </div>
                  </div>
            <template #right >
    <van-button @click="deleteList" square text="删除" type="danger" class="delete-button" />
    </template>

  </van-swipe-cell>
        </div>
      </div>
    <!-- </template> -->
</template>
<script lang="ts">
import { SwipeCell,Button } from 'vant';
export default {
  components:{
    [SwipeCell.name]:SwipeCell,
    [Button.name]:Button
  },
  name:'ListdataObj',
  props: {
    dataObj:Object,
    isEdit:Boolean,
    index:Number,

  },
  setup(props:any,ctx:any){
    console.log(props.dataObj.id,ctx,'子组件')
    const clickTime=()=>{
      ctx.emit('clickList',props.index)
    }
    const deleteList=()=>{
      console.log('deleteList')
      ctx.emit('deleteList',props.dataObj.id)
    }
    return {
      clickTime,
      deleteList
    }

  }
  
}
</script>
<style lang="less" scoped>
.content{
  padding: 12px;
  background: #fafafa;
}
          .expense-content {
            background-color: #fff;
            padding: 0px 16px 8px 16px;
            border-radius: 5px;
            .expense-top{
              width:100%;
              display: flex;
              align-items:center;
              flex-wrap: nowrap;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #9E9E9E;
              padding:6px 0px;
              border-bottom:1px solid  #F6F7FC;
            justify-content:space-between;
            .top-left{
              display: flex;
              flex-wrap: nowrap;
              align-items:center;
              .date{
                margin-right:3px;
              }
              .left {
                transition: 1s ease;
                flex: 0 0 8%;
                margin-right:10px;
                padding-top: 2px;
                .nofontSize {
                  transition: 1s ease;
                  width: 0;
                }
                .fontSize {
                  width: 16px;
                }
                .selected {
                  transition: 1s ease;
                  .vux-x-icon {
                    fill: themeColor;
                  }
                }
                .unselected {
                  transition: 1s ease;
                  .vux-x-icon {
                    fill: themeColor;
                  }
                  .vux-x-icon-unselect {
                    fill: rgba(27, 27, 27, 0.48);
                  }
                }
            }
            .leftEdit {
              flex: 0 0 0%;
            }
            }
            .top-right{
              display:flex;
              flex-direction: row-reverse;
              align-items:center;
              .attachment-ticket{
                font-family: PingFangSC-Regular;
                font-size: 10px;
                color: #9E9E9E;
                letter-spacing: 0;
                background: rgba(158,158,158,0.10);
                border-radius: 8px;
                padding:1px 6px;
                margin-left:14px;
              }
              .have{
                color: rgb(50,119,255);
                background: rgba(50,119,255,0.10);
              }
            }
            }
            .expense-center{
              display:flex;
              padding:13px 0px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #2B2B2B;
              .center-left{
                display: flex;
                align-items: center;
                img{
                  width:23px;
                  height:23px;
                  margin-right: 6px;;
                }
                flex:0 0 65%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .center-right{
                flex:0 0 35%;
                display:flex;
                align-items:center;
                flex-direction: row-reverse;
                .amount{
                  font-family: PingFangSC-Semibold;
                  font-size: 16px;
                  color: #2B2B2B;
                  margin-left:4px;
                }
                .symbol{
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #5C5C5C;
                }
              }

            }
            .expense-bottom{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              .bottom-left{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #9E9E9E;
              }
              padding-bottom:4px;
              .bottom-right{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #000000;
                     white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .vux-swipeout-item{
              margin:0px 15px;
            }
            .left {
              transition: 1s ease;
              flex: 0 0 8%;
              padding-top: 2px;
              .nofontSize {
                transition: 1s ease;
                width: 0;
              }
              .fontSize {
                width: 16px;
              }
              .selected {
                transition: 1s ease;
                .vux-x-icon {
                  fill: themeColor;
                }
              }
              .unselected {
                transition: 1s ease;
                .vux-x-icon {
                  fill: rgba(27, 27, 27, 0.48);
                }
                .vux-x-icon {
                  fill: themeColor;
                }
              }
            }
            .leftEdit {
              flex: 0 0 0%;
            }
            .right {
              transition: 1s ease;
              flex: 0 0 92%;
              .expense-type {
                display: -webkit-flex;
                display: flex;
                flex-wrap: nowrap;
                .expense-type-left {
                  flex: 0 0 10%;
                  img {
                    width: 20px;
                    height: 20px;
                  }
                }
                .expense-type-center {
                  flex: 0 0 40%;
                  max-width: 145px;
                  font-family: PingFangSC-Medium;
                  font-size: 16px;
                  color: #333333;
                  letter-spacing: 0;
                  line-height: 20px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .expense-type-right {
                  flex: 0 0 50%;
                  text-align: right;
                  .symbol {
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #666666;
                    letter-spacing: 0;
                    line-height: 20px;
                  }
                  .amount {
                    font-family: PingFangSC-Semibold;
                    font-size: 18px;
                    color: #333333;
                    letter-spacing: 0;
                    text-align: right;
                    line-height: 20px;
                  }
                }
              }
              .direction {
                display: -webkit-flex;
                display: flex;
                flex-wrap: nowrap;
                .direction-left {
                  flex: 0 0 5%;
                  position: relative;
                  /*text-align:center;*/
                  .circle {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translate(0, -50%);
                    width: 5px;
                    height: 5px;
                    border-radius: 2.5px;
                  }
                  .circle-green {
                    background: #48D2A0;
                  }
                  .circle-orange {
                    background: #F5A623;
                  }
                }
                .direction-right {
                  flex: 0 0 95%;
                  ont-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #666666;
                  letter-spacing: 0;
                  line-height: 12px;
                }
              }
              .invoice {
                .invoice-content {
                  font-family: PingFangSC-Regular;
                  font-size: 10px;
                  color: themeColor;
                  letter-spacing: 0;
                  line-height: 10px;
                  padding: 5px 0;
                  border: 1px solid themeColor;
                  border-radius: 2px;
                  width: 15%;
                  text-align: center;
                }
              }
            }
            .isEdit {
              flex: 0 0 100%;
            }
          }

 .delete-button {
    height: 100%;
  }
</style>