<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <a>Goods</a>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)">All</a></dd>
                <dd>
                  <a href="javascript:void(0)">0 - 100</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)">100 - 500</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)">500 - 1000</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)">1000 - 2000</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>

                  <li v-for="(item,index) in data">
                    <div class="pic">
                      <a href="#"><img :src="'/static/img/'+item.img+'.jpg'" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.name}}</div>
                      <div class="price">{{item.price}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>

                </ul>
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
    import "./../assets/css/product.css"
    import "./../assets/css/login.css"

    //模板
    import NavHeader from "@/views/NavHeader.vue"
    import NavFooter from "@/views/NavFooter.vue"
    import NavBread from "@/views/NavBread.vue"

    //插件
    import axios from "axios"

    export default {
        data(){
          return {
            msg:"hello dxh",
            data:[]
          }
        }
        ,components:{
            NavHeader:NavHeader,
            NavFooter,
            NavBread
        }
        ,mounted(){
            /*axios.get("").then((res)=>{

            }).catch((err)=>{

            })*/
            this.data = [
              {
                "id":"1",
                "name":"音响",
                "price":199,
                "img":"6"
              },
              {
                "id":"2",
                "name":"小米8",
                "price":2999,
                "img":"8"
              },
              {
                "id":"3",
                "name":"小米5s小米5s",
                "price":1099,
                "img":"4"
              }
            ];
         }
    }
</script>

