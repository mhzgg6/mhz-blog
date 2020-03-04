<template>
    <h3 ref="numberGrow" :data-time="time" :data-value="value">{{value}}</h3>
</template>

<script>
export default {
    name: 'numberGrow',
    props: {
        time: {
            type: Number,
            default: 2
        },
        value: {
            type: Number,
            default: 10
        }
    },
    methods: {
        numberGrow(ele){
            var _this = this
            var step = (_this.value*10) / (_this.time*1000)
            var star = 0
            var t = setInterval(function() {
                star += step    //初始值往上加数字
                if(star>_this.value){
                    clearInterval(t)
                    star = _this.value
                    t = null
                }
                _this.$el.innerHTML = parseInt(star)
            },10)
        }
    },
    created() {
        this.numberGrow( this.$refs.numberGrow )
    }
}
</script>