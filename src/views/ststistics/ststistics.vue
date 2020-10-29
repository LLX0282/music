<template>
    <div style="margin-left=200px;">
        <div id="main" style="width: 1000px;height:600px;"></div>
    </div>
</template>

<script>
    export default {
        methods: {
            getData(){
                // this.$axios.get("prod-api/music/backend/dataAnalysis/songTypeDA").then(res=>{
                //     console.log(res)
                // })
            },
            drawChart() {
                this.$axios.get("prod-api/music/backend/dataAnalysis/songTypeDA").then(res=>{
                    console.log(res.data.data)

                    // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("main"));
                var arry=[]
                var arryAll=[]
                for(var index in res.data.data){
                    arry[index]=res.data.data[index].name
                    if(res.data.data[index].value!=0){
                        arryAll[index]=res.data.data[index]
                    }
                }
                console.log(arry)
                    let option = {
                    title: {
                        text: '分类数量',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        // orient: 'vertical',
                        // top: 'middle',
                        bottom: 10,
                        left: 'center',
                        data: arry
                    },
                    series: [{
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:arryAll,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };
                myChart.setOption(option);
                })
                // 基于准备好的dom，初始化echarts实例
                //let myChart = this.$echarts.init(document.getElementById("main"));
                
                // 指定图表的配置项和数据
                // let option = {
                //     title: {
                //         text: '分类数量',
                //         left: 'center'
                //     },
                //     tooltip: {
                //         trigger: 'item',
                //         formatter: '{a} <br/>{b} : {c} ({d}%)'
                //     },
                //     legend: {
                //         // orient: 'vertical',
                //         // top: 'middle',
                //         bottom: 10,
                //         left: 'center',
                //         data: ['西凉', '益州', '兖州', '荆州', '幽州']
                //     },
                //     series: [{
                //         type: 'pie',
                //         radius: '65%',
                //         center: ['50%', '50%'],
                //         selectedMode: 'single',
                //         data: [
                //         ],
                //         emphasis: {
                //             itemStyle: {
                //                 shadowBlur: 10,
                //                 shadowOffsetX: 0,
                //                 shadowColor: 'rgba(0, 0, 0, 0.5)'
                //             }
                //         }
                //     }]
                // };

                // 使用刚指定的配置项和数据显示图表。
                //myChart.setOption(option);
            }
        },
        mounted() {
            this.getData();
            this.drawChart();
        }
    }
</script>

<style lang="scss" scoped>

</style>