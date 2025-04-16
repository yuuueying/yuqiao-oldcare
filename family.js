document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面交互
    initPageInteractions();
    
    // 页面加载动画
    animatePageLoad();
    
    // 检查URL参数中是否有从首页跳转的标记
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from') && urlParams.get('from') === 'home') {
        // 如果是从首页跳转来的，显示欢迎消息
        setTimeout(() => {
            showToast('欢迎进入家庭关怀页面');
        }, 1000);
    }
});

// 初始化页面交互
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
    
    // 家人通话按钮点击效果
    const callButtons = document.querySelectorAll('.call-btn');
    callButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberName = this.closest('.family-member').querySelector('.member-name').textContent;
            showCallDialog(memberName);
        });
    });
    
    // 添加家人按钮点击效果
    const addFamilyButton = document.querySelector('.add-family-member');
    if (addFamilyButton) {
        addFamilyButton.addEventListener('click', function() {
            showAddFamilyDialog();
        });
    }
    
    // 健康共享开关切换
    const healthSharingToggle = document.getElementById('healthSharingToggle');
    if (healthSharingToggle) {
        healthSharingToggle.addEventListener('change', function() {
            toggleHealthSharing(this.checked);
        });
    }
    
    // 单项健康数据开关切换
    const dataToggles = document.querySelectorAll('.shared-data-item .switch input');
    dataToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const dataName = this.closest('.shared-data-item').querySelector('.data-name').textContent;
            toggleDataSharing(dataName, this.checked);
        });
    });
    
    // 查看全部通知点击效果
    const viewAllButton = document.querySelector('.view-all');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            showAllNotifications();
        });
    }
    
    // 通知项点击效果
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            const notificationTitle = this.querySelector('.notification-title').textContent;
            showNotificationDetail(notificationTitle);
        });
    });
    
    // 编辑紧急联系人按钮点击效果
    const editButton = document.querySelector('.edit-btn');
    if (editButton) {
        editButton.addEventListener('click', function() {
            showEditContactsDialog();
        });
    }
    
    // 紧急设置开关切换
    const emergencyToggles = document.querySelectorAll('.emergency-settings .switch input');
    emergencyToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingLabel = this.closest('.setting-item').querySelector('.setting-label').textContent;
            toggleEmergencySetting(settingLabel, this.checked);
        });
    });
    
    // 顶部图标点击效果
    const headerIcons = document.querySelectorAll('.header-icons img');
    headerIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconType = this.getAttribute('alt');
            if (iconType === '消息') {
                showToast('跳转到消息中心');
            } else if (iconType === '设置') {
                showToast('跳转到家庭关怀设置');
            }
        });
    });
    
    // 底部导航点击效果
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!item.classList.contains('active')) {
                const navText = item.textContent.trim();
                
                // 处理紧急呼叫
                if (navText.includes('紧急呼叫')) {
                    e.preventDefault();
                    if (confirm('确定要拨打紧急求助电话吗？')) {
                        alert('正在连接紧急服务中心...');
                    }
                }
                // 其他导航项已有链接，不需处理
            }
        });
    });
}

// 页面加载动画
function animatePageLoad() {
    const sections = [
        document.querySelector('.family-status-container'),
        document.querySelector('.health-sharing-section'),
        document.querySelector('.family-notifications-section'),
        document.querySelector('.emergency-contacts-section')
    ];
    
    sections.forEach((section, index) => {
        if (section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100 + index * 150);
        }
    });
}

// 显示家人通话对话框
function showCallDialog(memberName) {
    // 提取家人姓名（去除括号中的称呼）
    const name = memberName.split('（')[0];
    
    // 创建对话框元素
    const dialog = document.createElement('div');
    dialog.className = 'dialog-overlay';
    
    const dialogContent = document.createElement('div');
    dialogContent.className = 'dialog-content';
    
    const dialogTitle = document.createElement('div');
    dialogTitle.className = 'dialog-title';
    dialogTitle.textContent = `联系${name}`;
    
    const dialogOptions = document.createElement('div');
    dialogOptions.className = 'dialog-options';
    
    // 添加选项
    const voiceCallOption = document.createElement('div');
    voiceCallOption.className = 'dialog-option';
    voiceCallOption.innerHTML = '<img src="images/voice-call-icon.png" alt="语音通话" width="24" height="24"><span>语音通话</span>';
    
    const videoCallOption = document.createElement('div');
    videoCallOption.className = 'dialog-option';
    videoCallOption.innerHTML = '<img src="images/video-call-icon.png" alt="视频通话" width="24" height="24"><span>视频通话</span>';
    
    const messageOption = document.createElement('div');
    messageOption.className = 'dialog-option';
    messageOption.innerHTML = '<img src="images/message-icon.png" alt="发送消息" width="24" height="24"><span>发送消息</span>';
    
    dialogOptions.appendChild(voiceCallOption);
    dialogOptions.appendChild(videoCallOption);
    dialogOptions.appendChild(messageOption);
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'dialog-cancel-button';
    cancelButton.textContent = '取消';
    
    // 组装对话框
    dialogContent.appendChild(dialogTitle);
    dialogContent.appendChild(dialogOptions);
    dialogContent.appendChild(cancelButton);
    
    dialog.appendChild(dialogContent);
    
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
            align-items: flex-end;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .dialog-content {
            background-color: #fff;
            border-radius: 12px 12px 0 0;
            width: 100%;
            padding: 20px;
            animation: slideUp 0.3s ease forwards;
        }
        
        .dialog-title {
            font-size: 1.1rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }
        
        .dialog-options {
            margin-bottom: 20px;
        }
        
        .dialog-option {
            display: flex;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
        }
        
        .dialog-option:last-child {
            border-bottom: none;
        }
        
        .dialog-option img {
            margin-right: 15px;
        }
        
        .dialog-option span {
            font-size: 1rem;
            color: #333;
        }
        
        .dialog-cancel-button {
            width: 100%;
            padding: 15px 0;
            background-color: #f5f5f5;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: bold;
            color: #333;
            cursor: pointer;
        }
        
        @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(dialog);
    
    // 选项点击事件
    voiceCallOption.addEventListener('click', function() {
        closeDialog(dialog);
        showToast(`正在语音通话中：${name}...`);
        
        // 模拟通话界面（实际开发中应该跳转到真实通话界面）
        setTimeout(() => {
            alert(`已连接到${name}，通话中...`);
        }, 1000);
    });
    
    videoCallOption.addEventListener('click', function() {
        closeDialog(dialog);
        showToast(`正在视频通话中：${name}...`);
        
        // 模拟通话界面
        setTimeout(() => {
            alert(`已连接到${name}，视频通话中...`);
        }, 1000);
    });
    
    messageOption.addEventListener('click', function() {
        closeDialog(dialog);
        showToast(`打开与${name}的聊天窗口`);
    });
    
    // 取消按钮点击事件
    cancelButton.addEventListener('click', function() {
        closeDialog(dialog);
    });
    
    // 点击背景关闭
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeDialog(dialog);
        }
    });
}

// 显示添加家人对话框
function showAddFamilyDialog() {
    // 创建对话框元素
    const dialog = document.createElement('div');
    dialog.className = 'dialog-overlay';
    
    const dialogContent = document.createElement('div');
    dialogContent.className = 'dialog-content';
    
    const dialogHeader = document.createElement('div');
    dialogHeader.className = 'dialog-header';
    dialogHeader.textContent = '添加家人';
    
    const dialogForm = document.createElement('div');
    dialogForm.className = 'dialog-form';
    
    // 添加表单内容
    dialogForm.innerHTML = `
        <div class="form-group">
            <label>家人姓名</label>
            <input type="text" placeholder="请输入家人姓名">
        </div>
        <div class="form-group">
            <label>称呼关系</label>
            <select>
                <option value="">请选择</option>
                <option value="spouse">配偶</option>
                <option value="son">儿子</option>
                <option value="daughter">女儿</option>
                <option value="grandchild">孙辈</option>
                <option value="other">其他</option>
            </select>
        </div>
        <div class="form-group">
            <label>手机号码</label>
            <input type="tel" placeholder="请输入手机号码">
        </div>
        <div class="form-group">
            <label>设为紧急联系人</label>
            <div class="switch-container">
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    `;
    
    const dialogActions = document.createElement('div');
    dialogActions.className = 'dialog-actions';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'dialog-button cancel';
    cancelButton.textContent = '取消';
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'dialog-button confirm';
    confirmButton.textContent = '添加';
    
    // 组装对话框
    dialogActions.appendChild(cancelButton);
    dialogActions.appendChild(confirmButton);
    
    dialogContent.appendChild(dialogHeader);
    dialogContent.appendChild(dialogForm);
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
            width: 90%;
            max-width: 400px;
            max-height: 80vh;
            overflow-y: auto;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            animation: slideUp 0.3s ease forwards;
        }
        
        .dialog-header {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
            text-align: center;
        }
        
        .dialog-form {
            margin-bottom: 20px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            font-size: 0.9rem;
            margin-bottom: 5px;
            color: #666;
        }
        
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .form-group .switch-container {
            display: flex;
            justify-content: flex-end;
        }
        
        .dialog-actions {
            display: flex;
            justify-content: space-between;
            gap: 10px;
        }
        
        .dialog-button {
            flex: 1;
            padding: 12px 0;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
        }
        
        .dialog-button.cancel {
            background-color: #f5f5f5;
            color: #666;
        }
        
        .dialog-button.confirm {
            background-color: var(--family-color);
            color: white;
        }
    `;
    
    document.head.appendChild(style);
    
    // 处理按钮点击事件
    cancelButton.addEventListener('click', function() {
        closeDialog(dialog);
    });
    
    confirmButton.addEventListener('click', function() {
        // 获取表单值
        const nameInput = dialogForm.querySelector('input[type="text"]');
        const relationSelect = dialogForm.querySelector('select');
        const phoneInput = dialogForm.querySelector('input[type="tel"]');
        
        // 简单验证
        if (!nameInput.value) {
            showToast('请输入家人姓名');
            return;
        }
        
        if (!relationSelect.value) {
            showToast('请选择称呼关系');
            return;
        }
        
        if (!phoneInput.value) {
            showToast('请输入手机号码');
            return;
        }
        
        // 模拟添加成功
        closeDialog(dialog);
        showToast('家人添加成功！');
        
        // 添加新家人到列表（实际应用中应该刷新数据）
        const relationText = relationSelect.options[relationSelect.selectedIndex].text;
        addFamilyMember(nameInput.value, relationText);
    });
    
    // 点击外部关闭
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeDialog(dialog);
        }
    });
}

// 添加家人成员到列表
function addFamilyMember(name, relation) {
    const familyMembersList = document.querySelector('.family-members');
    
    if (familyMembersList) {
        const newMember = document.createElement('div');
        newMember.className = 'family-member';
        newMember.style.opacity = '0';
        newMember.style.transform = 'translateY(10px)';
        
        newMember.innerHTML = `
            <div class="member-avatar">
                <img src="images/default-avatar.png" alt="${name}" width="40" height="40">
                <div class="status-indicator offline"></div>
            </div>
            <div class="member-info">
                <div class="member-name">${name}（${relation}）</div>
                <div class="member-status">刚刚添加</div>
            </div>
            <div class="member-action">
                <button class="call-btn">
                    <img src="images/call-icon.png" alt="呼叫" width="20" height="20">
                </button>
            </div>
        `;
        
        // 添加到列表
        familyMembersList.appendChild(newMember);
        
        // 添加动画效果
        setTimeout(() => {
            newMember.style.opacity = '1';
            newMember.style.transform = 'translateY(0)';
        }, 100);
        
        // 更新家人数量
        const countElement = document.querySelector('.family-members-count');
        if (countElement) {
            // 提取当前数量
            const currentCount = parseInt(countElement.textContent.match(/\d+/)[0]);
            // 更新数量
            countElement.textContent = `${currentCount + 1}位家人已连接`;
        }
        
        // 为新添加的呼叫按钮添加事件
        const callButton = newMember.querySelector('.call-btn');
        callButton.addEventListener('click', function() {
            const memberName = newMember.querySelector('.member-name').textContent;
            showCallDialog(memberName);
        });
    }
}

// 切换健康共享功能
function toggleHealthSharing(isEnabled) {
    // 获取所有数据共享开关
    const dataToggles = document.querySelectorAll('.shared-data-item .switch input');
    
    // 根据总开关状态，设置所有子开关状态
    dataToggles.forEach(toggle => {
        toggle.disabled = !isEnabled;
        if (!isEnabled) {
            toggle.checked = false;
        }
    });
    
    // 显示提示信息
    showToast(isEnabled ? '已开启健康数据共享' : '已关闭健康数据共享');
    
    // 更新共享说明文本
    const descElement = document.querySelector('.health-sharing-description');
    if (descElement) {
        descElement.textContent = isEnabled 
            ? '已开启健康数据共享，您的家人可以实时查看您的健康状态。' 
            : '已关闭健康数据共享，您的家人将无法查看您的健康状态。';
    }
}

// 切换单项数据共享
function toggleDataSharing(dataName, isEnabled) {
    showToast(isEnabled ? `已开启${dataName}数据共享` : `已关闭${dataName}数据共享`);
}

// 显示所有通知
function showAllNotifications() {
    showToast('查看全部家庭通知');
}

// 显示通知详情
function showNotificationDetail(notificationTitle) {
    showToast(`查看通知详情：${notificationTitle}`);
}

// 显示编辑联系人对话框
function showEditContactsDialog() {
    showToast('编辑紧急联系人');
}

// 切换紧急设置
function toggleEmergencySetting(settingLabel, isEnabled) {
    showToast(isEnabled ? `已开启${settingLabel}` : `已关闭${settingLabel}`);
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

// 显示提示消息
function showToast(message) {
    // 检查是否已经存在Toast
    let toast = document.querySelector('.toast-message');
    
    if (!toast) {
        // 创建Toast元素
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

// 更新首页跳转链接
function updateHomePageLink() {
    // 这个函数应该在index.js中调用
    const familyCard = document.querySelector('.family-card');
    if (familyCard) {
        familyCard.addEventListener('click', function() {
            window.location.href = 'family.html?from=home';
        });
    }
}