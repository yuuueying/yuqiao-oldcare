document.addEventListener('DOMContentLoaded', function() {
    // 全局变量
    const fontButtons = document.querySelectorAll('.font-size-btn');
    const voiceButton = document.getElementById('voiceBtn');
    const emergencyCall = document.querySelector('.emergency-call');
    const navItems = document.querySelectorAll('.nav-item');
    const featureCards = document.querySelectorAll('.feature-card');
    const serviceItems = document.querySelectorAll('.service-item');
    
    // 页面加载动画
    const mainContent = document.querySelectorAll('.features, .nearby-services');
    mainContent.forEach(element => {
        element.classList.add('page-transition');
        setTimeout(() => {
            element.classList.add('active');
        }, 100);
    });
    
    // 适老化模式字体大小调整
    fontButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的active类
            fontButtons.forEach(b => b.classList.remove('active'));
            
            // 当前按钮添加active类
            btn.classList.add('active');
            
            // 根据按钮设置全局字体大小
            const size = btn.getAttribute('data-size');
            
            // 移除之前的字体大小类
            document.documentElement.classList.remove('font-normal', 'font-medium', 'font-large');
            
            // 添加对应的字体大小类
            if (size === 'medium') {
                document.documentElement.classList.add('font-medium');
            } else if (size === 'large') {
                document.documentElement.classList.add('font-large');
            }
            
            // 触发动画效果
            animateTextChange();
        });
    });
    
    // 文本大小变化动画效果
    function animateTextChange() {
        const textElements = document.querySelectorAll('.feature-title, .feature-desc, .section-title, .service-item-name');
        textElements.forEach(element => {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 300);
        });
    }
    
    // 语音辅助功能
    voiceButton.addEventListener('click', () => {
        // 语音功能演示
        const speechSynthesis = window.speechSynthesis;
        
        if (speechSynthesis) {
            const textToSpeak = "欢迎使用玉桥街道养老服务应用，您可以通过此应用查看健康状态、预约服务，或在紧急情况下拨打求助电话。";
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'zh-CN';
            speechSynthesis.speak(utterance);
            
            // 语音播放动画
            voiceButton.classList.add('active');
            setTimeout(() => {
                voiceButton.classList.remove('active');
            }, 3000);
        }
    });
    
    // 紧急呼叫功能
    emergencyCall.addEventListener('click', () => {
        emergencyCall.style.animation = 'none';
        emergencyCall.offsetHeight; // 触发重绘
        emergencyCall.style.animation = null;
        
        // 模拟紧急呼叫确认
        setTimeout(() => {
            if (confirm('确定要拨打紧急求助电话吗？')) {
                // 模拟拨打电话
                alert('正在连接紧急服务中心...');
            }
        }, 300);
    });
    
    // 功能卡片点击效果
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            // 添加点击动效
            card.classList.add('clicked');
            
            setTimeout(() => {
                card.classList.remove('clicked');
                
                // 根据卡片类型模拟跳转到不同页面
                if (card.classList.contains('health-card')) {
                    alert('跳转至健康监测页面');
                } else if (card.classList.contains('service-card')) {
                    alert('跳转至服务预约页面');
                } else if (card.classList.contains('time-card')) {
                    alert('跳转至时间银行页面');
                } else if (card.classList.contains('family-card')) {
                    alert('跳转至家庭关怀页面');
                }
            }, 200);
        });
    });
    
    // 服务项点击效果
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            // 添加点击动效
            item.style.backgroundColor = '#f5f5f5';
            
            setTimeout(() => {
                item.style.backgroundColor = '';
                
                // 获取服务名称
                const serviceName = item.querySelector('.service-item-name').textContent;
                alert(`您选择了: ${serviceName}`);
            }, 200);
        });
    });
    
    // 底部导航切换
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // 阻止默认跳转行为
            e.preventDefault();
            
            // 如果当前项不是活跃项，就切换
            if (!item.classList.contains('active')) {
                // 移除所有导航项的活跃状态
                navItems.forEach(i => i.classList.remove('active'));
                
                // 设置当前导航项为活跃状态
                item.classList.add('active');
                
                // 获取页面类型
                const pageType = item.getAttribute('data-page');
                
                // 模拟页面切换
                if (pageType === 'emergency') {
                    // 紧急呼叫处理
                    if (confirm('确定要拨打紧急求助电话吗？')) {
                        // 模拟拨打电话
                        alert('正在连接紧急服务中心...');
                    } else {
                        // 如果取消了紧急呼叫，恢复到首页
                        navItems.forEach(i => {
                            if (i.getAttribute('data-page') === 'home') {
                                i.classList.add('active');
                            } else {
                                i.classList.remove('active');
                            }
                        });
                    }
                } else if (pageType === 'my') {
                    // 模拟跳转到"我的"页面
                    simulatePageTransition('my-page');
                }
            }
        });
    });
    
    // 模拟页面切换效果
    function simulatePageTransition(pageName) {
        // 隐藏当前内容
        mainContent.forEach(element => {
            element.classList.remove('active');
        });
        
        // 延迟显示提示信息
        setTimeout(() => {
            alert(`正在跳转到${pageName === 'my-page' ? '我的' : ''}页面...`);
            
            // 恢复当前内容显示（模拟页面跳转后返回）
            setTimeout(() => {
                mainContent.forEach(element => {
                    element.classList.add('active');
                });
            }, 500);
        }, 300);
    }
    
    // 查看全部按钮功能
    document.querySelector('.view-all').addEventListener('click', function() {
        alert('查看全部附近养老服务');
    });
    
    // 滚动效果
    window.addEventListener('scroll', function() {
        // 当页面滚动时，添加下滑阴影效果到顶部导航
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // 设置通知图标点击事件
    document.querySelector('.header-icons img:first-child').addEventListener('click', function() {
        alert('查看通知消息');
    });
    
    // 设置设置图标点击事件
    document.querySelector('.header-icons img:last-child').addEventListener('click', function() {
        alert('打开设置页面');
    });
    
    // 定期更新健康状态信息（模拟实时数据）
    function updateHealthStatus() {
        const healthDesc = document.querySelector('.health-card .feature-desc');
        const statusList = ['今日状态良好', '血压正常', '心率平稳', '活动量适中'];
        let currentIndex = 0;
        
        // 每隔5秒更新一次状态信息
        setInterval(() => {
            currentIndex = (currentIndex + 1) % statusList.length;
            
            // 添加淡出效果
            healthDesc.style.opacity = '0';
            
            // 延迟后更新内容并淡入
            setTimeout(() => {
                healthDesc.textContent = statusList[currentIndex];
                healthDesc.style.opacity = '1';
            }, 300);
        }, 5000);
    }
    
    // 启动健康状态更新
    updateHealthStatus();
    
    // 适配不同设备屏幕
    function adjustForScreenSize() {
        const screenWidth = window.innerWidth;
        
        // 针对不同屏幕尺寸进行调整
        if (screenWidth <= 320) {  // 针对较小设备，如iPhone SE
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.padding = '15px 10px';
                card.style.minHeight = '140px';
            });
        } else if (screenWidth <= 375) {  // 针对中等尺寸设备，如iPhone X/11 Pro
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.padding = '20px 15px';
                card.style.minHeight = '160px';
            });
        } else {  // 针对较大设备，如iPhone 11/12/13/15
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.padding = '25px 20px';
                card.style.minHeight = '170px';
            });
        }
    }
    
    // 初始调整屏幕尺寸
    adjustForScreenSize();
    
    // 窗口大小改变时重新调整
    window.addEventListener('resize', adjustForScreenSize);
});

// 健康监测卡片点击跳转
document.querySelector('.health-card').addEventListener('click', function() {
    // 添加点击动效
    this.classList.add('clicked');
    
    setTimeout(() => {
        this.classList.remove('clicked');
        
        // 跳转到健康监测页面
        window.location.href = 'health.html?from=home';
    }, 200);
});

// 在原有script.js中添加时间银行卡片点击跳转功能

// 时间银行卡片点击跳转
document.querySelector('.time-card').addEventListener('click', function() {
    // 添加点击动效
    this.classList.add('clicked');
    
    setTimeout(() => {
        this.classList.remove('clicked');
        
        // 跳转到时间银行页面
        window.location.href = 'timebank.html?from=home';
    }, 200);
});

// 在原有script.js中添加服务预约卡片点击跳转功能

// 服务预约卡片点击跳转
document.querySelector('.service-card').addEventListener('click', function() {
    // 添加点击动效
    this.classList.add('clicked');
    
    setTimeout(() => {
        this.classList.remove('clicked');
        
        // 跳转到服务预约页面
        window.location.href = 'service.html?from=home';
    }, 200);
    
});

// 在原有script.js中添加紧急救援按钮和卡片的点击跳转功能

// 紧急救援卡片点击跳转
document.querySelector('.emergency-call').addEventListener('click', function() {
    // 添加点击动效
    this.classList.add('clicked');
    
    setTimeout(() => {
        this.classList.remove('clicked');
         // 跳转到服务预约页面
         window.location.href = 'emergency.html?from=home';
        }, 200);
        
    });

    // 在原有script.js中添加"我的"页面跳转功能

   
// 添加家庭关怀卡片点击跳转功能
document.querySelector('.family-card').addEventListener('click', function() {
    // 添加点击动效
    this.classList.add('clicked');
    
    setTimeout(() => {
        this.classList.remove('clicked');
        
        // 跳转到家庭关怀页面
        window.location.href = 'family.html?from=home';
    }, 200);
});
// 底部导航栏"我的"按钮点击跳转
document.querySelector('.nav-item:last-child').addEventListener('click', function(e) {
    if (!this.classList.contains('active')) {
        e.preventDefault();
        window.location.href = 'my.html?from=home';
    }
});