<template>
    <div class="list">
        <div class="article clearfix" v-for="(article, index) in ArticleLists" :key="index" @click="link()">
            <div class="article_left">
                <img :src=article.img alt="" width="100%" height="100%">
            </div>

            <div class="article_right">
                <h2>{{article.title}}</h2>
                <div class="infor">
                    <ul class="clearfix">
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconrili"></use> 
                            </svg>
                            <span>{{article.time}}</span>
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconzuozhe"></use> 
                            </svg>
                            <span>{{article.author}}</span>
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconchakan"></use> 
                            </svg>
                            <span>{{article.readNum}}阅读</span>
                        </li>
                    </ul>
                </div>
                <p>{{article.content}}</p>
                <div class="lable">
                    <span v-for="(lable, num) in article.labels" :key="num">
                        {{lable.name}}
                    </span>
                </div>
                <div class="hand">
                    <ul class="clearfix">
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconpinglun"></use> 
                            </svg>
                            <span @click="link(index)">{{article.commentNum}}条评论</span>
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconxihuan"></use> 
                            </svg>
                            <span>{{article.like}}点赞</span>
                        </li>
                        <li>
                            <span @click="link(index)">阅读全文</span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconjiahao"></use> 
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'list',
    props: {
        ArticleLists: {
            type: Array,
            default: [] 
        }
    },
    // data() {
    //     return {
    //         ArticleLists: [    //热门文章列表
    //             {   
    //                 img: 'https://www.weipxiu.com/wp-content/uploads/2018/09/zuj-220x150.png',
    //                 title: 'Web Components之Custom Elements组件开发',
    //                 time: '2019-5-25',
    //                 author: '毛啊毛',
    //                 readNum: 22,
    //                 content: `Web Components 包含了多种不同的技术。你可以把Web Components当做是用一系列的Web技术创建的、可重用的用户界面组件的统称。Web Components使开发人员拥有扩展浏览器标签的能力，可以自由的进行定制组件。但截至本文时间，Web Components依然是W3C工作组的一个草案，并为被正式纳入标准，但这并不妨碍我们去学习它。
    //                         有时候关于Web Components和谷歌的plymer之间可能会存在一些困惑，简介而论，Polymer是基于Web Components技术的一个框架，你当然可以在不适用其的情况下开发Web Components`,
    //                 labels: [
    //                 {name: '#Javascript'},
    //                 {name: '#午后杂谈'}
    //                 ],
    //                 commentNum: 22,
    //                 like: 200
    //             },
    //             {
    //                 img: 'https://www.weipxiu.com/wp-content/uploads/2016/11/1444980728230-220x150.jpg',
    //                 title: 'js判断对象是否为空对象的几种方法',
    //                 time: '2018-5-25',
    //                 author: '毛啊毛',
    //                 readNum: 210,
    //                 content: `在做数据交互的时候，我们经常需要判断数据或者对象是不是为空，避免当接口异常时候前端页面崩溃，上次总结了篇关于如何判断数据是不是数组，下面来自网上一篇教程总结方便以后查阅，正所谓好记性不如烂笔头。`,
    //                 labels: [
    //                 {name: '#WordPress'},
    //                 {name: '#建站'}
    //                 ],
    //                 commentNum: 10,
    //                 like: 2000
    //             },
    //             {
    //                 img: 'https://www.weipxiu.com/wp-content/uploads/2019/03/NK7EM@V088CCO8WLAW.png',
    //                 title: 'vue.js大转盘抽奖及其9宫格抽奖详解附代码',
    //                 time: '2018-4-25',
    //                 author: '毛啊毛',
    //                 readNum: 20,
    //                 content: `前端经常会遇到做抽奖类似活动，下面讲下整体思路，首先说说圆形的大转盘抽奖思路，分析，在制作抽奖时候，首先每次点击抽奖时候，我们会请求后端的接口数据，拿到用户这次抽奖的奖品id，只有这样你才知道转到具体哪个位置，大转盘的奖品是张底图，一开始在代码中计算好每个商品所在的角度`,
    //                 labels: [
    //                 {name: '#vue'},
    //                 {name: '#午后杂谈'}
    //                 ],
    //                 commentNum: 10,
    //                 like: 2000
    //             },
    //             {
    //                 img: 'https://www.weipxiu.com/wp-content/uploads/2019/05/flutter-220x140.png',
    //                 title: 'VUE中Vue.nextTick()和this.$nextTick()',
    //                 time: '2018-5-25',
    //                 author: '毛啊毛',
    //                 readNum: 20,
    //                 content: `比如你在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中。原因是什么呢，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。`,
    //                 labels: [
    //                 {name: '#你坚持最久的事'},
    //                 {name: '#午后杂谈'}
    //                 ],
    //                 commentNum: 10,
    //                 like: 2000
    //             },
    //             {
    //                 img: 'https://www.weipxiu.com/wp-content/uploads/2019/04/TFFUWF7Z42KRDHXT8TG-220x140.png',
    //                 title: '超简单原生js判断用户访问来源',
    //                 time: '2018-3-25',
    //                 author: '毛啊毛',
    //                 readNum: 20,
    //                 content: `超简单原生js判断用户访问来源`,
    //                 labels: [
    //                 {name: '#php'},
    //                 {name: '#建站'}
    //                 ],
    //                 commentNum: 10,
    //                 like: 2000
    //             }
    //         ],
    //     }
    // },
    methods: {
        link(index) {
            switch(index) {
                case 0:
                    this.$router.push({path: '/demohotArticle'})
                    break;
                case 1:
                    this.$router.push({path: '/isArry'})
                    break;
                case 2:
                    this.$router.push({path: '/bigRotateArticle'})
                    break;
                case 3:
                    this.$router.push({path: '/nextTick'})
                    break;
                case 4:
                    this.$router.push({path: '/isFrom'})
                    break;
            }
                
        }
    }
}
</script>

<style scoped>
.list{
    width: 840px;
}

.article{
    width: 100%;
    height: 278px;
    margin-bottom: 20px; 
    border-radius: 5px;
   -moz-box-shadow:1px 3px 6px #B8B8B8; 
   -webkit-box-shadow:1px 3px 6px #B8B8B8; 
   box-shadow:1px 3px 6px #B8B8B8;
}

.article_left{
    float: left;
    width: 290px;
    height: 225px;
    margin: 24px 30px;
}

.article_left img{
    cursor: pointer;
}

.article_left img:hover{
    opacity: 0.9;
    transform: scale(1.1);
    -ms-transform: scale(1.1); /* IE 9 */
    -webkit-transform: scale(1.1); /* Safari and Chrome */
    transition-duration: .5s;
    -ms-transition-duration: .5s; 	/* IE 9 */
    -moz-transition-duration: .5s;; 	/* Firefox */
    -webkit-transition-duration: .5s; /* Safari 和 Chrome */
    -o-transition-duration: .5s; 	/* Opera */
}

.article_right{
    float: left;
    width: 490px;
    color: #2c2d2e;
}

.article_right h2{
    font-size: 16px;
    margin-top: 26px;
}

.article_right .infor{
    width: 100%;
    height: 16px;
    margin-top: 14px;
    margin-bottom: 22px;
}

.infor ul{
    font-size: 12px;
    width: 100%;
    height: 100%; 
}

.infor ul li{
    float: left;
}

.infor ul li span{
    margin: 0 22px 0 14px;
}

.article_right p{
    width: 460px;
    min-height: 80px;
    font-size: 14px;
    text-indent: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}

.article_right .lable{
    margin: 12px 30px 20px 0;
    color: #6bdedb;
    font-size: 12px;
}

.article_right .lable span{
    display: inline-block;
    height: 20px;
    background: #ebfbfb;
    padding: 0 12px 0 12px;
    margin-right: 10px; 
    border-radius: 5px;
    text-align: center;
    line-height: 20px;
}

.article_right .hand{
    width: 460px;
    height: 20px;
}

.hand ul{
    width: 100%;
    height: 100%;
}

.hand ul li{
    float: left;
    font-size: 14px;
    margin-right: 20px;

}

.hand ul li:last-child{
    float: right;
    margin-right: 0;
}

.hand ul li svg{
    font-size: 14px;
    margin-right: 12px;
    cursor: pointer;

}

.hand ul li:last-child svg{
    float: right;
    margin: 3px 0 0 8px;
}

.hand ul li:last-child span{
    cursor: pointer;
}

.hand ul li:last-child span:hover{
    border-bottom: 1px solid #2c2d2e;
}
</style>


