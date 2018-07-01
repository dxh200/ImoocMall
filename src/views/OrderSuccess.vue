<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Order Success</span>
    </nav-bread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="/static/img/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{orderId}}</span>
            <span>Order total：{{orderTotal | currency('$')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <a href="javascript:;" class="btn btn--m">Cart List</a>
            </div>
            <div class="btn-r-wrap">
              <a href="javascript:;" class="btn btn--m">Goods List</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import "./../assets/css/base.css"
  import "./../assets/css/checkout.css"
  //模板
  import NavHeader from "@/components/NavHeader.vue"
  import NavFooter from "@/components/NavFooter.vue"
  import NavBread from "@/components/NavBread.vue"
  import NavModal from "@/components/NavModal.vue"

  //插件
  import axios from "axios"
  export default {
    name: "OrderSuccess",
    data(){
      return{
        orderId:'',
        orderTotal:0
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        let orderId = this.$route.query.orderId;
        axios.post('/users/orderDetail',{
          orderId:orderId
        }).then((response)=>{
          let res = response.data;
          if(res.status==0){
            this.orderId = res.result.orderId;
            this.orderTotal = res.result.orderTotal;
          }else{
            alert(res.msg);
          }
        }).catch((err)=>{
          alert(err.message);
        })
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      NavModal
    }
  }
</script>

<style scoped>

</style>
