document.addEventListener('DOMContentLoaded', function() {
    // 初始化血压趋势图
    initBloodPressureChart();
    
    // 添加页面交互效果
    initPageInteractions();
    
    // 模拟数据更新
    setupDataUpdates();
    
    // 添加页面进入动画
    pageEntryAnimation();
    
    // 初始化数据交叉比较提示
    initDataComparisonTips();
    
    // 添加图表交互功能
    addChartInteraction();
    
    // 检查URL参数中是否有从首页跳转的标记
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from') && urlParams.get('from') === 'home') {
        // 如果是从首页跳转来的，显示欢迎消息
        setTimeout(() => {
            alert('欢迎来到健康监测页面!');
        }, 1000);
    }
});

// 初始化血压趋势图
function initBloodPressureChart() {
    const ctx = document.createElement('canvas');
    document.getElementById('bloodPressureChart').appendChild(ctx);
    
    // 创建Chart.js图表
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            datasets: [
                {
                    label: '收缩压',
                    data: [125, 128, 130, 124, 122, 120, 118],
                    backgroundColor: 'rgba(255, 125, 77, 0.1)',
                    borderColor: '#ff7d4d',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#ff7d4d',
                    pointBorderWidth: 2,
                    tension: 0.3,
                    fill: false
                },
                {
                    label: '舒张压',
                    data: [82, 84, 85, 80, 78, 80, 76],
                    backgroundColor: 'rgba(77, 151, 255, 0.1)',
                    borderColor: '#4d97ff',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#4d97ff',
                    pointBorderWidth: 2,
                    tension: 0.3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#333',
                    borderColor: '#eee',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: true,
                    callbacks: {
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y;
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#999'
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 150,
                    ticks: {
                        stepSize: 30,
                        color: '#999'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
    
    // 保存图表实例以便后续可能的更新
    window.bloodPressureChart = chart;
}

// 初始化页面交互效果
function initPageInteractions() {
    // 返回按钮点击效果
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        // 添加页面离开的过渡动画
        document.body.classList.add('page-leaving');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 300);
    });
    
    // 分享按钮点击效果
    const shareButton = document.querySelector('.share-button');
    shareButton.addEventListener('click', function() {
        // 模拟分享功能
        alert('已向家人共享您的健康数据');
    });
    
    // 趋势图日期选择点击效果
    const trendChartPeriod = document.querySelector('.trend-chart-period');
    trendChartPeriod.addEventListener('click', function() {
        // 模拟日期选择功能
        const periods = ['最近一周', '最近一月', '最近三月'];
        const currentPeriod = trendChartPeriod.textContent.trim().split(' ')[0];
        const nextPeriodIndex = (periods.indexOf(currentPeriod) + 1) % periods.length;
        
        // 更新显示的时间段
        trendChartPeriod.textContent = periods[nextPeriodIndex];
        trendChartPeriod.appendChild(createCalendarIcon());
        
        // 更新图表数据
        updateChartByPeriod(periods[nextPeriodIndex]);
    });
    
    // 添加健康数据按钮点击效果
    const addButton = document.querySelector('.add-health-data-button');
    addButton.addEventListener('click', function() {
        // 模拟添加数据功能
        showAddDataDialog();
    });
    
    // 健康提醒项点击效果
    const reminderItems = document.querySelectorAll('.reminder-item');
    reminderItems.forEach(item => {
        item.addEventListener('click', function() {
            const reminderText = item.querySelector('.reminder-text').textContent;
            const reminderTime = item.querySelector('.reminder-time').textContent;
            
            // 模拟点击提醒项
            alert(`提醒详情: ${reminderText} - ${reminderTime}`);
        });
    });
    
    // 底部导航点击效果
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 获取导航项的文本内容
            const navText = item.textContent.trim();
            
            // 处理紧急呼叫
            if (navText.includes('紧急呼叫')) {
                e.preventDefault();
                if (confirm('确定要拨打紧急求助电话吗？')) {
                    alert('正在连接紧急服务中心...');
                }
            }
            
            // 处理"我的"导航项
            if (navText.includes('我的')) {
                if (!item.classList.contains('active')) {
                    e.preventDefault();
                    window.location.href = 'my.html?from=health';
                }
            }
        });
    });
}

// 创建日历图标元素
function createCalendarIcon() {
    const img = document.createElement('img');
    img.src = 'images/calendar-icon.png';
    img.alt = '日历';
    img.width = 20;
    img.height = 20;
    img.style.marginLeft = '5px';
    return img;
}

// 根据所选时间段更新图表
function updateChartByPeriod(period) {
    // 定义不同时间段的数据
    const periodData = {
        '最近一周': {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            systolic: [125, 128, 130, 124, 122, 120, 118],
            diastolic: [82, 84, 85, 80, 78, 80, 76]
        },
        '最近一月': {
            labels: ['第1周', '第2周', '第3周', '第4周'],
            systolic: [126, 124, 121, 118],
            diastolic: [83, 81, 79, 76]
        },
        '最近三月': {
            labels: ['一月', '二月', '三月'],
            systolic: [128, 123, 118],
            diastolic: [84, 80, 76]
        }
    };
    
    // 更新图表数据
    if (window.bloodPressureChart && periodData[period]) {
        window.bloodPressureChart.data.labels = periodData[period].labels;
        window.bloodPressureChart.data.datasets[0].data = periodData[period].systolic;
        window.bloodPressureChart.data.datasets[1].data = periodData[period].diastolic;
        window.bloodPressureChart.update();
    }
}

// 显示添加数据对话框
function showAddDataDialog() {
    // 在真实实现中，这里应该显示一个表单对话框
    // 但在此示例中，我们简单地模拟一下
    const dataType = prompt('请选择要添加的数据类型（血压、心率、血糖、睡眠）:');
    
    if (dataType) {
        alert(`您选择了添加${dataType}数据。在实际应用中，这里会打开相应的数据输入表单。`);
        
        // 模拟数据添加成功后的刷新
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach(card => {
            if (card.querySelector('.metric-title').textContent.includes(dataType)) {
                // 添加更新动画
                const valueElement = card.querySelector('.metric-value');
                valueElement.classList.add('updating');
                
                // 延迟后移除动画类
                setTimeout(() => {
                    valueElement.classList.remove('updating');
                }, 500);
            }
        });
    }
}

// 设置数据自动更新功能
function setupDataUpdates() {
    // 更新当前时间
    updateCurrentTime();
    
    // 定期随机微调健康数据以模拟实时监测
    setInterval(() => {
        // 随机选择一个指标进行更新
        const metrics = ['血压', '心率', '血糖', '睡眠'];
        const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
        
        // 获取对应的卡片
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach(card => {
            if (card.querySelector('.metric-title').textContent === randomMetric) {
                // 添加更新动画
                const valueElement = card.querySelector('.metric-value');
                valueElement.classList.add('updating');
                
                // 更新数值
                setTimeout(() => {
                    // 根据不同指标，生成略微不同的随机数据
                    if (randomMetric === '血压') {
                        // 血压值略微波动
                        const systolic = 120 + Math.floor(Math.random() * 5 - 2);
                        const diastolic = 80 + Math.floor(Math.random() * 3 - 1);
                        valueElement.innerHTML = `${systolic}/${diastolic} <span class="metric-unit">mmHg</span>`;
                    } else if (randomMetric === '心率') {
                        // 心率值略微波动
                        const heartRate = 75 + Math.floor(Math.random() * 5 - 2);
                        valueElement.innerHTML = `${heartRate} <span class="metric-unit">次/分钟</span>`;
                    } else if (randomMetric === '血糖') {
                        // 血糖值略微波动
                        const bloodSugar = (5.6 + (Math.random() * 0.4 - 0.2)).toFixed(1);
                        valueElement.innerHTML = `${bloodSugar} <span class="metric-unit">mmol/L</span>`;
                    } else if (randomMetric === '睡眠') {
                        // 睡眠时间保持稳定
                        valueElement.innerHTML = `7.5 <span class="metric-unit">小时</span>`;
                    }
                    
                    // 移除动画效果
                    valueElement.classList.remove('updating');
                }, 500);
            }
        });
    }, 30000); // 每30秒更新一次
}

// 更新当前时间
function updateCurrentTime() {
    // 获取当前时间
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    // 更新"最近更新"时间
    const updateTimeElement = document.querySelector('.health-status-date');
    if (updateTimeElement) {
        const dateText = updateTimeElement.textContent.split('|')[0];
        updateTimeElement.textContent = `${dateText} | 最近更新: ${currentTime}`;
    }
    
    // 每分钟更新一次时间
    setTimeout(updateCurrentTime, 60000);
}

// 添加页面进入动画
function pageEntryAnimation() {
    const elements = [
        document.querySelector('.health-status-card'),
        ...document.querySelectorAll('.metric-card'),
        document.querySelector('.trend-chart-container'),
        document.querySelector('.health-reminders-container'),
        document.querySelector('.add-health-data-button')
    ];
    
    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        }
    });
}

// 初始化数据交叉比较提示
function initDataComparisonTips() {
    // 获取各项指标的值
    const bloodPressureText = document.querySelector('.metric-card:nth-child(1) .metric-value').textContent;
    const heartRateText = document.querySelector('.metric-card:nth-child(2) .metric-value').textContent;
    const bloodSugarText = document.querySelector('.metric-card:nth-child(3) .metric-value').textContent;
    const sleepText = document.querySelector('.metric-card:nth-child(4) .metric-value').textContent;
    
    // 解析血压值
    const bloodPressureMatch = bloodPressureText.match(/(\d+)\/(\d+)/);
    const systolic = bloodPressureMatch ? parseInt(bloodPressureMatch[1]) : 0;
    const diastolic = bloodPressureMatch ? parseInt(bloodPressureMatch[2]) : 0;
    
    // 解析心率
    const heartRate = parseInt(heartRateText);
    
    // 解析血糖
    const bloodSugar = parseFloat(bloodSugarText);
    
    // 解析睡眠时间
    const sleepHours = parseFloat(sleepText);
    
    // 根据数据交叉分析生成健康建议
    let healthTip = "";
    
    if (systolic > 130 && heartRate > 80) {
        healthTip = "血压与心率均偏高，建议放松心情，适当休息。";
    } else if (bloodSugar > 6.0 && sleepHours < 7) {
        healthTip = "血糖偏高且睡眠不足，建议规律作息，减少甜食摄入。";
    } else if (sleepHours < 7 && heartRate > 80) {
        healthTip = "睡眠不足可能导致心率偏快，建议保持充足睡眠。";
    } else if (systolic < 110 && heartRate < 60) {
        healthTip = "血压与心率偏低，建议补充适量水分，适度活动。";
    } else {
        healthTip = "各项指标保持良好，继续保持健康的生活方式。";
    }
    
    // 显示健康提示
    console.log("健康提示:", healthTip);
}

// 添加血压趋势图交互
function addChartInteraction() {
    const chartContainer = document.getElementById('bloodPressureChart');
    
    // 添加点击事件以显示详细数据
    chartContainer.addEventListener('click', function(event) {
        if (window.bloodPressureChart) {
            // 获取点击位置对应的数据点
            const elements = window.bloodPressureChart.getElementsAtEventForMode(
                event, 
                'nearest', 
                { intersect: true }, 
                false
            );
            
            if (elements.length) {
                const firstElement = elements[0];
                const datasetIndex = firstElement.datasetIndex;
                const index = firstElement.index;
                
                const value = window.bloodPressureChart.data.datasets[datasetIndex].data[index];
                const label = window.bloodPressureChart.data.labels[index];
                const datasetLabel = window.bloodPressureChart.data.datasets[datasetIndex].label;
                
                alert(`${label}的${datasetLabel}值为: ${value}`);
            }
        }
    });
}

// 更新首页跳转链接
function updateHomePageLink() {
    // 获取首页上的健康监测卡片
    const healthCard = document.querySelector('.health-card');
    if (healthCard) {
        healthCard.addEventListener('click', function() {
            window.location.href = 'health.html?from=home';
        });
    }
}