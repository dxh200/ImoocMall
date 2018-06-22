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
            <a href="javascript:void(0)" class="filterby stopPop" v-on:click="setFilterPrice">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:;" @click="setFilterChecked('All')" :class="{'cur':priceChecked=='All'}">All</a></dd>

                <dd v-for="(price,index) in priceFilter" @click="setFilterChecked(index)">
                  <a href="javascript:;" :class="{cur:priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>

              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>

                  <li v-for="(item,index) in data">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/img/'+item.img" alt=""></a>
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
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
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
            data:[],
            priceFilter:[
              {startPrice:0,endPrice:500.00},
              {startPrice:500.00,endPrice:1000.00},
              {startPrice:1000.00,endPrice:1500.00},
              {startPrice:1500.00,endPrice:2000.00},
              {startPrice:2000.00,endPrice:3000.00},
            ],
            priceChecked:"All",   /*默认All选中*/
            overLayFlag:false,    /*遮罩默认不显示*/
            filterBy:false
          }
        }
        ,components:{
            NavHeader:NavHeader,
            NavFooter,
            NavBread
        }
        ,methods:{
            setFilterPrice(){
                this.filterBy = true;
                this.overLayFlag = true;
            },
            setFilterChecked(index){
                this.priceChecked=index;
                this.closePop();
            }
            ,
            closePop(){
                this.filterBy = false;
                this.overLayFlag = false;
            }
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
                "img":"6.jpg"
              },
              {
                "id":"2",
                "name":"小米8",
                "price":2999,
                "img":"8.jpg"
              },
              {
                "id":"3",
                "name":"小米5s小米5s",
                "price":1099,
                "img":"4.jpg"
              }
            ];
         }
    }
</script>

