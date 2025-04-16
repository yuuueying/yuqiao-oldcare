document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面交互
    initPageInteractions();
    
    // 页面加载动画
    animatePageLoad();
    
    // 检查URL参数中是否有从其他页面跳转的标记
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from')) {
        // 如果有跳转标记，保存状态
        sessionStorage.setItem('lastPage', urlParams.get('from'));
    }
});

// 初始化页面交互
function initPageInteractions() {
    // 头像编辑点击效果
    const avatarEdit = document.querySelector('.avatar-edit');
    if (avatarEdit) {
        avatarEdit.addEventListener('click', function() {
            showImagePickerDialog();
        });
    }
    
    // 编辑资料按钮点击效果
    const editProfileButton = document.querySelector('.edit-profile');
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
            showEditProfileDialog();
        });
    }
    
    // 家人关联按钮点击效果
    const familyConnectButton = document.querySelector('.family-connect');
    if (familyConnectButton) {
        familyConnectButton.addEventListener('click', function() {
            showFamilyConnectDialog();
        });
    }
    
    // 健康档案按钮点击效果
    const healthArchiveButton = document.querySelector('.health-archive-button');
    if (healthArchiveButton) {
        healthArchiveButton.addEventListener('click', function() {
            navigateToHealthArchive();
        });
    }
    
    // 服务项点击效果
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link + '?from=my';
            } else {
                showMessage('该功能正在开发中');
            }
        });
    });
    
    // 设置项点击效果
    const settingsItems = document.querySelectorAll('.settings-item');
    settingsItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link + '?from=my';
            } else {
                showMessage('该功能正在开发中');
            }
        });
    });
    
    // 退出登录按钮点击效果
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            showLogoutConfirmDialog();
        });
    }
    
    // 底部导航
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (!item.classList.contains('active')) {
            item.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    // 已有链接，不需处理
                } else {
                    e.preventDefault();
                    const navText = this.textContent.trim();
                    
                    // 处理紧急呼叫
                    if (navText.includes('紧急呼叫')) {
                        if (confirm('确定要拨打紧急求助电话吗？')) {
                            alert('正在连接紧急服务中心...');
                        }
                    } else {
                        showMessage('该功能正在开发中');
                    }
                }
            });
        }
    });
}

// 页面加载动画
function animatePageLoad() {
    const sections = [
        document.querySelector('.profile-section'),
        document.querySelector('.health-info-section'),
        document.querySelector('.my-services-section'),
        document.querySelector('.system-settings-section'),
        document.querySelector('.logout-button')
    ];
    
    sections.forEach((section, index) => {
        if (section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        }
    });
}

// 显示图片选择对话框
function showImagePickerDialog() {
    // 创建对话框元素
    const dialog = document.createElement('div');
    dialog.className = 'dialog-overlay';
    
    const dialogContent = document.createElement('div');
    dialogContent.className = 'dialog-content';
    
    const dialogTitle = document.createElement('div');
    dialogTitle.className = 'dialog-title';
    dialogTitle.textContent = '选择头像';
    
    const dialogOptions = document.createElement('div');
    dialogOptions.className = 'dialog-options';
    
    // 添加选项
    const cameraOption = document.createElement('div');
    cameraOption.className = 'dialog-option';
    cameraOption.innerHTML = '<img src="images/camera-icon.png" alt="拍照" width="24" height="24"><span>拍照</span>';
    
    const galleryOption = document.createElement('div');
    galleryOption.className = 'dialog-option';
    galleryOption.innerHTML = '<img src="images/gallery-icon.png" alt="相册" width="24" height="24"><span>从相册选择</span>';
    
    dialogOptions.appendChild(cameraOption);
    dialogOptions.appendChild(galleryOption);
    
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
    `;
    
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(dialog);
    
    // 选项点击事件
    cameraOption.addEventListener('click', function() {
        closeDialog(dialog);
        showMessage('已打开相机');
        
        // 模拟更换头像
        setTimeout(() => {
            document.getElementById('userAvatar').src = 'images/user-avatar.png';
        }, 1000);
    });
    
    galleryOption.addEventListener('click', function() {
        closeDialog(dialog);
        showMessage('已打开相册');
        
        // 模拟更换头像
        setTimeout(() => {
            document.getElementById('userAvatar').src = 'images/user-avatar.png';
        }, 1000);
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

// 显示编辑资料对话框
function showEditProfileDialog() {
    showMessage('打开编辑资料页面');
}

// 显示家人关联对话框
function showFamilyConnectDialog() {
    showMessage('打开家人关联页面');
}

// 跳转到健康档案
function navigateToHealthArchive() {
    showMessage('查看完整健康档案');
}

// 显示退出登录确认对话框
function showLogoutConfirmDialog() {
    if (confirm('确定要退出登录吗？')) {
        showMessage('已退出登录');
        
        // 模拟退出登录后跳转到登录页
        setTimeout(() => {
            // 实际应用中应该跳转到登录页
            window.location.href = 'index.html';
        }, 1500);
    }
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

// 更新首页跳转链接
function updateHomePageLink() {
    // 这个函数应该在index.js中调用
    const myProfileButton = document.querySelector('.nav-item:last-child');
    
    if (myProfileButton) {
        myProfileButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'my.html?from=home';
        });
    }
}