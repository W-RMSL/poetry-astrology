//中间饼状图的数据
const centerPieData = [
    { value: 590, name: '星为代语' },
    { value: 885, name: '星为元素' },
    { value: 623, name: '星为原型意象' },
    { value: 287, name: '星为主题' },
]

const sidePieData = {
    '星为主题': [
        { value: 50, name: '紫微' },
        { value: 20, name: '木星' },
        { value: 19, name: '金宿' },
        { value: 18, name: '角宿' },
        { value: 180, name: '其他' }
    ],
    '星为元素': [
        { value: 190, name: '紫微' },
        { value: 98, name: '金星' },
        { value: 60, name: '木星' },
        { value: 55, name: '角宿' },
        { value: 482, name: '其他' }
    ],
    '星为原型意象': [
        { value: 147, name: '紫微' },
        { value: 49, name: '金星' },
        { value: 43, name: '尾宿' },
        { value: 38, name: '角宿' },
        { value: 346, name: '其他' }
    ],
    '星为代语': [
        { value: 99, name: '紫微' },
        { value: 46, name: '金星' },
        { value: 42, name: '角宿' },
        { value: 41, name: '木星' },
        { value: 362, name: '其他' }
    ]
}



//小的环形图色彩范围
const colorList = {
    // 每个环按一个色系，前 4 项（具体星宿）明亮可区分，第 5 项"其他"用暗色弱化
    '星为主题': ['#C8F2FF', '#7FE0FF', '#4ADDFF', '#2E9FD6', '#1E3A66'],
    '星为元素': ['#FFE6A8', '#FFD27A', '#F4B14E', '#C77F2E', '#5A4A2E'],
    '星为原型意象': ['#BFD4FF', '#7FA8F5', '#4A78E0', '#2C4FB0', '#1E2A66'],
    '星为代语': ['#E0C8FF', '#B98FF0', '#8E5FD6', '#5E3AA6', '#2E2566']
}



//绘制中间的情感饼图
function drawCenterPieChart() {
    var dom = document.getElementById('Center-Pie-Chart');
    var myChart = echarts.init(dom, null, {
        renderer: 'svg',
        useDirtyRect: false
    });
    var option;
    option = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '星象与入诗手法',
                type: 'pie',
                radius: '82%',
                data: centerPieData,
                selectedMode: true,
                startAngle: 168,
                emphasis: {
                    scale: true,
                    scaleSize: 8,
                    itemStyle: {
                        borderColor: '#FFD27A',
                        borderWidth: 2,
                        shadowBlur: 28,
                        shadowColor: 'rgba(255, 210, 122, 0.6)'
                    },
                    label: {
                        color: '#0A1A33',
                        fontSize: 16,
                        fontFamily: 'SongTi-regular'
                    }
                },
                // 四个切片与各自连线指向的环形图同色系（紫=代语 金=元素 蓝=原型意象 青=主题）
                color: ['#B98FF0', '#FFD27A', '#7FA8F5', '#4ADDFF'],
                itemStyle: {
                    borderColor: '#0A1A33',
                    borderWidth: 2,
                    borderRadius: 4,
                    shadowBlur: 16,
                    shadowColor: 'rgba(123, 160, 255, 0.3)'
                },
                label: {
                    color: "#0A1A33",
                    fontSize: 14,
                    fontFamily: 'SongTi-regular',
                    position: 'inside'
                },
                select: {
                    label: {
                        color: "#0A1A33",
                        fontSize: 16,
                        fontFamily: 'SongTi-regular',

                    },

                    labelLine: {
                        show: true,
                        length: 10,
                        length2: 15,
                        lineStyle: {

                            color: "#C8F2FF",
                            maxSurfaceAngle: 80
                        }
                    },
                },

            }
        ]
    };


    myChart.on('click', function (params) {
        var name = params.name;
        hightLightChart(name)
    });

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);

}


function hightLightChart(chartName) {
    var chartMapping = {
        '星为主题': { chartId: 'Side-Pie-Chart1', lineId: 'pie-pie-line1' },
        '星为元素': { chartId: 'Side-Pie-Chart2', lineId: 'pie-pie-line2' },
        '星为代语': { chartId: 'Side-Pie-Chart3', lineId: 'pie-pie-line3' },
        '星为原型意象': { chartId: 'Side-Pie-Chart4', lineId: 'pie-pie-line4' }
    };

    // 恢复默认透明度
    for (var key in chartMapping) {
        if (chartMapping.hasOwnProperty(key)) {
            var defaultOpacity = 0.3; // 默认透明度
            var mapping = chartMapping[key];
            setOpacity(mapping.chartId, mapping.lineId, defaultOpacity);
        }
    }

    // 设置点击的图表为透明度为1
    if (chartMapping.hasOwnProperty(chartName)) {
        var selectedChart = chartMapping[chartName];
        setOpacity(selectedChart.chartId, selectedChart.lineId, 1);
    }
}

function setOpacity(chartId, lineId, opacity) {
    const chartElement = document.getElementById(chartId);
    const lineElement = document.getElementById(lineId);
    if (chartElement && lineElement) {
        chartElement.style.opacity = opacity;
        lineElement.style.opacity = opacity;
    }
}

//绘制边上的情感饼图
function drawSidePieChart(chartName) {
    var dom;
    if (chartName == '星为主题') {
        dom = document.getElementById('Side-Pie-Chart1');
        dom.style.top = '255px';
        dom.style.left = '238px';
    } else if (chartName == '星为元素') {
        dom = document.getElementById('Side-Pie-Chart2');
        dom.style.top = '134px';
        dom.style.left = '963px';
    } else if (chartName == '星为代语') {
        dom = document.getElementById('Side-Pie-Chart3');
        dom.style.top = '-57px';
        dom.style.left = '486px';
    } else if (chartName == '星为原型意象') {
        dom = document.getElementById('Side-Pie-Chart4');
        dom.style.top = '426px';
        dom.style.left = '432px';
    }
    var myChart = echarts.init(dom, null, {
        renderer: 'svg',
        useDirtyRect: false
    });
    var option;
    option = {
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                name: '星宿',
                type: 'pie',
                radius: ['35%', '55%'],
                avoidLabelOverlap: true,
                selectedMode: true,
                selectedOffset: 0,
                color: colorList[chartName],
                itemStyle: {
                    borderColor: '#0A1A33',
                    borderWidth: 2,
                    borderRadius: 3
                },
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}',
                    color: '#C8F2FF',
                    fontSize: 11,
                    fontFamily: 'SongTi-regular',
                    overflow: 'none'
                },
                emphasis: {
                    scaleSize: 6,
                    itemStyle: {
                        borderColor: '#FFD27A',
                        borderWidth: 2,
                        shadowBlur: 16,
                        shadowColor: 'rgba(255, 210, 122, 0.55)'
                    }
                },
                labelLine: {
                    show: true,
                    length: 4,
                    length2: 6,
                    lineStyle: {
                        color: '#84D3FF'
                    }
                },
                data: sidePieData[chartName]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
    window.addEventListener('resize', myChart.resize);

}
//绘制灰色的连接线
async function drawVector(chartName) {
    var piePieLine;
    var src;
    if (chartName == '星为主题') {
        piePieLine = document.getElementById('pie-pie-line1');
        piePieLine.style.zIndex = -1
        src = './src/svg/vector4.svg'
        piePieLine.style.top = '275px';
        piePieLine.style.left = '340px';
    } else if (chartName == '星为元素') {
        piePieLine = document.getElementById('pie-pie-line2');
        piePieLine.style.zIndex = -1
        src = './src/svg/vector2.svg'
        piePieLine.style.top = '174px';
        piePieLine.style.left = '785px';
    } else if (chartName == '星为代语') {
        piePieLine = document.getElementById('pie-pie-line3');
        piePieLine.style.zIndex = -1
        src = './src/svg/vector1.svg'
        piePieLine.style.top = '33px';
        piePieLine.style.left = '532px';
    } else if (chartName == '星为原型意象') {
        piePieLine = document.getElementById('pie-pie-line4');
        piePieLine.style.zIndex = -1
        src = './src/svg/vector3.svg'
        piePieLine.style.top = '375px';
        piePieLine.style.left = '500px';
    }
    try {
        let vector = await fetch(src);
        let content = await vector.text();
        piePieLine.innerHTML = content;
    } catch (error) {
        console.error('加载SVG时发生错误:', error);
    }
}


drawCenterPieChart();


drawSidePieChart('星为主题');
drawSidePieChart('星为元素');
drawSidePieChart('星为代语');
drawSidePieChart('星为原型意象');
drawVector('星为主题');
drawVector('星为元素');
drawVector('星为代语');
drawVector('星为原型意象');
