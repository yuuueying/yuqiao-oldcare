document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面动画和交互
    initPageInteractions();
    
    // 添加数据统计动画
    animateStatistics();
    
    // 检查URL参数中是否有从首页跳转的标记
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from') && urlParams.get('from') === 'home') {
        // 如果是从首页跳转来的，显示欢迎消息
        setTimeout(() => {
            showToast('欢迎来到时间银行服务');
        }, 1000);
    }
});

// 初始化页面交互效果
function initPageInteractions() {
    // 返回按钮点击效果
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            // 添加页面离开的过渡动画
            document.body.classList.add('page-leaving');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        });
    }
    
    // 功能按钮点击效果
    const functionButtons = document.querySelectorAll('.function-button');
    functionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span').textContent;
            
            if (buttonText === '发布需求') {
                showDialog('发布服务需求', '请描述您需要的服务类型、时间和地点');
            } else if (buttonText === '提供服务') {
                showDialog('提供服务', '请选择您可以提供的服务类型和时间');
            }
        });
    });
    
    // 服务分类点击效果
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-name').textContent;
            showToast(`查看${categoryName}分类的服务`);
        });
    });
    
    // 接单按钮点击效果
    const acceptButtons = document.querySelectorAll('.accept-btn');
    acceptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestItem = this.closest('.request-item');
            const requestTitle = requestItem.querySelector('.request-title').textContent;
            const requestPerson = requestItem.querySelector('.request-person').textContent.split(' ')[0];
            const requestTime = requestItem.querySelector('.request-time span').textContent;
            
            if (confirm(`确定接受"${requestTitle}"服务？\n服务对象: ${requestPerson}\n预计时间: ${requestTime}`)) {
                // 模拟接单成功
                this.textContent = '已接单';
                this.disabled = true;
                this.style.backgroundColor = '#999';
                
                showToast('接单成功！');
                
                // 添加到我的服务记录
                addToMyServiceRecords(requestTitle, requestPerson);
            }
        });
    });
    
    // 查看全部和更多按钮
    document.querySelector('.view-all').addEventListener('click', function() {
        showToast('查看全部附近服务需求');
    });
    
    document.querySelector('.view-more').addEventListener('click', function() {
        showToast('查看更多服务记录');
    });
    
    // 搜索框功能
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchText = this.value.trim();
            if (searchText) {
                showToast(`正在搜索: ${searchText}`);
                // 清空搜索框
                this.value = '';
                this.blur();
            }
        }
    });
    
    // 底部导航点击效果
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
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
                    window.location.href = 'my.html?from=timebank';
                }
            }
        });
    });
}

// 显示toast提示信息
function showToast(message) {
    // 检查是否已经存在toast元素
    let toast = document.querySelector('.toast-message');
    
    if (!toast) {
        // 创建toast元素
        toast = document.createElement('div');
        toast.className = 'toast-message';
        document.body.appendChild(toast);
    }
    
    // 设置消息内容和显示
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 2500);
}

// 显示对话框
function showDialog(title, message) {
    // 创建对话框元素
    const dialog = document.createElement('div');
    dialog.className = 'dialog-overlay';
    
    const dialogContent = document.createElement('div');
    dialogContent.className = 'dialog-content';
    
    const dialogTitle = document.createElement('div');
    dialogTitle.className = 'dialog-title';
    dialogTitle.textContent = title;
    
    const dialogMessage = document.createElement('div');
    dialogMessage.className = 'dialog-message';
    dialogMessage.textContent = message;
    
    const dialogInput = document.createElement('textarea');
    dialogInput.className = 'dialog-input';
    dialogInput.placeholder = '请输入详细信息...';
    
    const dialogActions = document.createElement('div');
    dialogActions.className = 'dialog-actions';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'dialog-button cancel';
    cancelButton.textContent = '取消';
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'dialog-button confirm';
    confirmButton.textContent = '确定';
    
    // 组装对话框
    dialogActions.appendChild(cancelButton);
    dialogActions.appendChild(confirmButton);
    
    dialogContent.appendChild(dialogTitle);
    dialogContent.appendChild(dialogMessage);
    dialogContent.appendChild(dialogInput);
    dialogContent.appendChild(dialogActions);
    
    dialog.appendChild(dialogContent);
    document.body.appendChild(dialog);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .dialog-content {
            background-color: #fff;
            border-radius: 12px;
            width: 85%;
            max-width: 400px;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            transform: translateY(20px);
            animation: slideUp 0.3s ease forwards;
        }
        
        .dialog-title {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }
        
        .dialog-message {
            font-size: 1rem;
            margin-bottom: 15px;
            color: #666;
        }
        
        .dialog-input {
            width: 100%;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px;
            margin-bottom: 15px;
            font-size: 1rem;
            min-height: 100px;
            resize: none;
        }
        
        .dialog-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .dialog-button {
            border: none;
            border-radius: 8px;
            padding: 10px 20px;
            font-size: 1rem;
            cursor: pointer;
        }
        
        .dialog-button.cancel {
            background-color: #f5f5f5;
            color: #666;
        }
        
        .dialog-button.confirm {
            background-color: #ff7d1a;
            color: white;
        }
        
        .toast-message {
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 100px;
            font-size: 0.9rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    
    // 处理按钮点击事件
    cancelButton.addEventListener('click', function() {
        closeDialog(dialog);
    });
    
    confirmButton.addEventListener('click', function() {
        const inputText = dialogInput.value.trim();
        if (inputText) {
            showToast(title === '发布服务需求' ? '已发布服务需求' : '已提交服务供应');
        } else {
            showToast('请输入详细信息');
            return;
        }
        closeDialog(dialog);
    });
    
    // 点击外部关闭
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeDialog(dialog);
        }
    });
}

// 关闭对话框
function closeDialog(dialog) {
    dialog.style.opacity = '0';
    setTimeout(() => {
        if (document.body.contains(dialog)) {
            document.body.removeChild(dialog);
        }
    }, 300);
}

// 添加到我的服务记录
function addToMyServiceRecords(title, person) {
    // 创建新的服务记录项
    const recordList = document.querySelector('.record-list');
    const recordItem = document.createElement('div');
    recordItem.className = 'record-item';
    recordItem.style.opacity = '0';
    recordItem.style.transform = 'translateY(10px)';
    
    // 根据服务类型选择不同的图标背景
    let iconClass = '';
    if (title.includes('看病')) {
        iconClass = 'life-service';
    } else if (title.includes('智能手机')) {
        iconClass = 'skill-service';
    } else {
        iconClass = 'life-service'; // 默认类型
    }
    
    recordItem.innerHTML = `
        <div class="record-icon ${iconClass}">
            <img src="images/${iconClass === 'life-service' ? 'life-icon.png' : 'skill-icon.png'}" alt="${title}" width="24" height="24">
        </div>
        <div class="record-content">
            <div class="record-title">${title} - ${person}</div>
        </div>
        <div class="record-time">待完成</div>
    `;
    
    // 添加到列表顶部
    if (recordList.firstChild) {
        recordList.insertBefore(recordItem, recordList.firstChild);
    } else {
        recordList.appendChild(recordItem);
    }
    
    // 添加动画效果
    setTimeout(() => {
        recordItem.style.opacity = '1';
        recordItem.style.transform = 'translateY(0)';
    }, 100);
}

// 数据统计动画
function animateStatistics() {
    // 获取余额元素
    const balanceElement = document.querySelector('.time-amount');
    const initialBalance = 53;
    
    // 获取本月获得、使用和累计服务元素
    const monthGainElement = document.querySelector('.time-stat-item:nth-child(1) .stat-value');
    const monthUseElement = document.querySelector('.time-stat-item:nth-child(2) .stat-value');
    const totalServiceElement = document.querySelector('.time-stat-item:nth-child(3) .stat-value');
    
    const monthGain = 12;
    const monthUse = 5;
    const totalService = 128;
    
    // 设置初始值
    balanceElement.textContent = '0';
    monthGainElement.textContent = '+0';
    monthUseElement.textContent = '-0';
    totalServiceElement.textContent = '0';
    
    // 动画函数
    function animate(element, targetValue, prefix = '', duration = 1500) {
        let startValue = 0;
        const startTime = performance.now();
        
        function updateValue(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                const currentValue = Math.round(progress * targetValue);
                element.textContent = `${prefix}${currentValue}`;
                requestAnimationFrame(updateValue);
            } else {
                element.textContent = `${prefix}${targetValue}`;
            }
        }
        
        requestAnimationFrame(updateValue);
    }
    
    // 开始动画（依次执行）
    setTimeout(() => animate(totalServiceElement, totalService), 300);
    setTimeout(() => animate(monthGainElement, monthGain, '+'), 800);
    setTimeout(() => animate(monthUseElement, monthUse, '-'), 1300);
    setTimeout(() => animate(balanceElement, initialBalance), 1800);
}

// 更新首页跳转链接
function updateHomePageLink() {
    // 这个函数应该在index.js中调用
    const timeCard = document.querySelector('.time-card');
    if (timeCard) {
        timeCard.addEventListener('click', function() {
            window.location.href = 'timebank.html?from=home';
        });
    }
}