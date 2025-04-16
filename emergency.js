document.addEventListener('DOMContentLoaded', function() {
    // 初始化紧急按钮
    initEmergencyButton();
    
    // 初始化紧急联系人呼叫
    initContactCalls();
    
    // 初始化紧急服务点击
    initEmergencyServices();
    
    // 初始化底部导航"我的"按钮跳转
    initMyButtonNavigation();
    
    // 页面加载动画
    animatePageLoad();
    
    // 检查URL参数中是否有从首页跳转的标记
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from') && urlParams.get('from') === 'home') {
        // 如果是从首页跳转来的，显示欢迎消息
        setTimeout(() => {
            showMessage('紧急救援功能已就绪');
        }, 1000);
    }
});

// 初始化底部导航"我的"按钮跳转
function initMyButtonNavigation() {
    const myButton = document.querySelector('.bottom-nav .nav-item:last-child');
    if (myButton) {
        myButton.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                e.preventDefault();
                window.location.href = 'my.html?from=emergency';
            }
        });
    }
}

// 初始化紧急按钮
function initEmergencyButton() {
    const sosButton = document.getElementById('sosButton');
    let pressTimer;
    let isLongPress = false;
    let countdownInterval;
    let countdownOverlay;
    let countdownNumber;
    
    // 按下按钮时开始计时
    sosButton.addEventListener('touchstart', startPress);
    sosButton.addEventListener('mousedown', startPress);
    
    // 释放按钮
    sosButton.addEventListener('touchend', endPress);
    sosButton.addEventListener('mouseup', endPress);
    sosButton.addEventListener('mouseleave', endPress);
    
    // 开始长按计时
    function startPress(e) {
        e.preventDefault();
        isLongPress = false;
        
        sosButton.classList.add('pressed');
        
        // 5秒后触发紧急呼叫
        pressTimer = setTimeout(() => {
            isLongPress = true;
            startEmergencyCountdown();
        }, 5000);
    }
    
    // 结束长按
    function endPress() {
        sosButton.classList.remove('pressed');
        
        // 清除计时器
        clearTimeout(pressTimer);
        
        // 如果不是长按（未达到5秒），显示提示
        if (!isLongPress) {
            showMessage('请长按按钮5秒钟');
        }
    }
    
    // 开始紧急呼叫倒计时
    function startEmergencyCountdown() {
        // 创建倒计时覆盖层
        countdownOverlay = document.createElement('div');
        countdownOverlay.className = 'countdown-overlay';
        
        countdownNumber = document.createElement('div');
        countdownNumber.className = 'countdown-number';
        countdownNumber.textContent = '5';
        
        const countdownText = document.createElement('div');
        countdownText.className = 'countdown-text';
        countdownText.textContent = '即将拨打紧急电话';
        
        const cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-button';
        cancelButton.textContent = '取消';
        
        countdownOverlay.appendChild(countdownNumber);
        countdownOverlay.appendChild(countdownText);
        countdownOverlay.appendChild(cancelButton);
        
        document.body.appendChild(countdownOverlay);
        
        // 倒计时逻辑
        let countdown = 5;
        countdownInterval = setInterval(() => {
            countdown--;
            countdownNumber.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                // 触发紧急呼叫
                makeEmergencyCall();
            }
        }, 1000);
        
        // 取消按钮点击事件
        cancelButton.addEventListener('click', cancelEmergencyCall);
    }
    
    // 取消紧急呼叫
    function cancelEmergencyCall() {
        clearInterval(countdownInterval);
        document.body.removeChild(countdownOverlay);
        showMessage('已取消紧急呼叫');
    }
    
    // 执行紧急呼叫
    function makeEmergencyCall() {
        if (countdownOverlay && document.body.contains(countdownOverlay)) {
            document.body.removeChild(countdownOverlay);
        }
        
        // 模拟拨打电话
        showCallDialog('紧急救援中心', '120');
    }
}

// 初始化联系人呼叫
function initContactCalls() {
    const callButtons = document.querySelectorAll('.call-button');
    
    callButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactItem = this.closest('.contact-item');
            const name = contactItem.querySelector('.contact-name').textContent;
            const role = contactItem.querySelector('.contact-role').textContent;
            
            // 显示呼叫对话框
            showCallDialog(name, getPhoneNumberByRole(role));
        });
    });
    
    // 管理联系人按钮
    const manageButton = document.querySelector('.manage-contacts-button');
    manageButton.addEventListener('click', function() {
        showMessage('打开联系人管理页面');
    });
}

// 根据角色获取电话号码（模拟）
function getPhoneNumberByRole(role) {
    switch(role) {
        case '社区医生':
            return '010-12345678';
        case '社区护士':
            return '010-87654321';
        case '儿子':
            return '13812345678';
        default:
            return '120';
    }
}

// 初始化紧急服务点击
function initEmergencyServices() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = this.querySelector('.service-name').textContent;
            const serviceDesc = this.querySelector('.service-desc').textContent;
            
            // 根据服务类型执行不同操作
            switch(serviceName) {
                case '120':
                    showCallDialog('急救中心', '120');
                    break;
                case '110':
                    showCallDialog('报警中心', '110');
                    break;
                case '119':
                    showCallDialog('消防中心', '119');
                    break;
                case '养老服务':
                    showCallDialog('社区养老服务站', '010-12345678');
                    break;
            }
        });
    });
}

// 显示呼叫对话框
function showCallDialog(name, number) {
    // 创建对话框元素
    const dialog = document.createElement('div');
    dialog.className = 'call-dialog-overlay';
    
    const dialogContent = document.createElement('div');
    dialogContent.className = 'call-dialog-content';
    
    // 添加头像和名称
    const avatarContainer = document.createElement('div');
    avatarContainer.className = 'call-avatar-container';
    
    const avatar = document.createElement('div');
    avatar.className = 'call-avatar';
    avatar.innerHTML = `<img src="images/call-avatar.png" alt="${name}" width="60" height="60">`;
    
    const calleeName = document.createElement('div');
    calleeName.className = 'callee-name';
    calleeName.textContent = name;
    
    const calleeNumber = document.createElement('div');
    calleeNumber.className = 'callee-number';
    calleeNumber.textContent = number;
    
    const callStatus = document.createElement('div');
    callStatus.className = 'call-status';
    callStatus.textContent = '呼叫中...';
    
    avatarContainer.appendChild(avatar);
    avatarContainer.appendChild(calleeName);
    avatarContainer.appendChild(calleeNumber);
    avatarContainer.appendChild(callStatus);
    
    // 添加控制按钮
    const callControls = document.createElement('div');
    callControls.className = 'call-controls';
    
    const speakerButton = document.createElement('div');
    speakerButton.className = 'call-control-button';
    speakerButton.innerHTML = `<img src="images/speaker-icon.png" alt="扬声器" width="24" height="24"><span>扬声器</span>`;
    
    const muteButton = document.createElement('div');
    muteButton.className = 'call-control-button';
    muteButton.innerHTML = `<img src="images/mute-icon.png" alt="静音" width="24" height="24"><span>静音</span>`;
    
    const keypadButton = document.createElement('div');
    keypadButton.className = 'call-control-button';
    keypadButton.innerHTML = `<img src="images/keypad-icon.png" alt="键盘" width="24" height="24"><span>键盘</span>`;
    
    callControls.appendChild(speakerButton);
    callControls.appendChild(muteButton);
    callControls.appendChild(keypadButton);
    
    // 添加挂断按钮
    const hangupButton = document.createElement('div');
    hangupButton.className = 'hangup-button';
    hangupButton.innerHTML = `<img src="images/hangup-icon.png" alt="挂断" width="30" height="30">`;
    
    // 组装对话框
    dialogContent.appendChild(avatarContainer);
    dialogContent.appendChild(callControls);
    dialogContent.appendChild(hangupButton);
    
    dialog.appendChild(dialogContent);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .call-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .call-dialog-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 50px 20px;
        }
        
        .call-avatar-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 50px;
        }
        
        .call-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        .callee-name {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            margin-bottom: 10px;
        }
        
        .callee-number {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 15px;
        }
        
        .call-status {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.6);
        }
        
        .call-controls {
            display: flex;
            justify-content: space-between;
            width: 100%;
            max-width: 300px;
            margin-bottom: 30px;
        }
        
        .call-control-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
        }
        
        .call-control-button img {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            padding: 10px;
            margin-bottom: 5px;
        }
        
        .call-control-button span {
            font-size: 0.8rem;
        }
        
        .hangup-button {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: #f43f3f;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 50px;
            cursor: pointer;
            animation: pulse 2s infinite;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(dialog);
    
    // 模拟呼叫音效
    playCallSound();
    
    // 处理挂断按钮点击事件
    hangupButton.addEventListener('click', function() {
        stopCallSound();
        document.body.removeChild(dialog);
        showMessage('通话已结束');
    });
    
    // 模拟一段时间后自动接通
    setTimeout(() => {
        if (document.body.contains(dialog)) {
            callStatus.textContent = '已接通';
            stopCallSound();
            // 5秒后自动挂断（模拟演示）
            setTimeout(() => {
                if (document.body.contains(dialog)) {
                    document.body.removeChild(dialog);
                    showMessage('通话已结束');
                }
            }, 5000);
        }
    }, 3000);
}

// 播放呼叫音效
function playCallSound() {
    // 在实际应用中，这里应该播放呼叫音效
    console.log('播放呼叫音效');
}

// 停止呼叫音效
function stopCallSound() {
    // 在实际应用中，这里应该停止呼叫音效
    console.log('停止呼叫音效');
}

// 显示提示消息
function showMessage(message) {
    // 检查是否已经存在消息元素
    let toast = document.querySelector('.toast-message');
    
    if (!toast) {
        // 创建消息元素
        toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.style.position = 'fixed';
        toast.style.bottom = '80px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '100px';
        toast.style.fontSize = '0.9rem';
        toast.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        toast.style.zIndex = '9999';
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(toast);
    }
    
    // 设置消息内容和显示
    toast.textContent = message;
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 2500);
}

// 页面加载动画
function animatePageLoad() {
    const elements = [
        document.querySelector('.emergency-section'),
        ...document.querySelectorAll('.contact-item'),
        document.querySelector('.manage-contacts-button'),
        ...document.querySelectorAll('.service-item')
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

// 更新首页跳转链接
function updateHomePageLink() {
    // 这个函数应该在index.js中调用
    // 紧急呼叫按钮和卡片
    const emergencyCall = document.querySelector('.emergency-call');
    const emergencyBtn = document.querySelector('.emergency-btn');
    
    if (emergencyCall) {
        emergencyCall.addEventListener('click', function() {
            window.location.href = 'emergency.html?from=home';
        });
    }
    
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            window.location.href = 'emergency.html?from=home';
        });
    }
}
