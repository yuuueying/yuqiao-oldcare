document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面交互
    initPageInteractions();
    
    // 检查URL参数中是否有从首页跳转的标记
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from') && urlParams.get('from') === 'home') {
        // 如果是从首页跳转来的，显示欢迎消息
        setTimeout(() => {
            showToast('欢迎使用服务预约系统');
        }, 1000);
    }
    
    // 模拟页面加载动画
    animatePageLoad();
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
    
    // 服务分类标签点击效果
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 根据选中的标签显示不同的服务列表
            const tabText = this.textContent;
            filterServicesByTab(tabText);
        });
    });
    
    // 预约按钮点击效果
    const bookingButtons = document.querySelectorAll('.booking-btn');
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('.service-name').textContent;
            showBookingDialog(serviceName);
        });
    });
    
    // 查看按钮点击效果
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('.service-name').textContent;
            showServiceDetail(serviceName);
        });
    });
    
    // 推荐服务项点击效果
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = this.querySelector('.service-item-name').textContent;
            showServiceDetail(serviceName);
        });
    });
    
    // 查看全部和更多按钮点击效果
    document.querySelector('.view-more').addEventListener('click', function() {
        showToast('正在加载更多推荐服务...');
    });
    
    document.querySelector('.view-all').addEventListener('click', function() {
        showToast('正在加载所有预约记录...');
    });
    
    // 搜索框功能
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchText = this.value.trim();
            if (searchText) {
                showToast(`正在搜索: ${searchText}`);
                // 模拟搜索结果
                setTimeout(() => {
                    // 清空搜索框
                    this.value = '';
                    this.blur();
                }, 500);
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
                    window.location.href = 'my.html?from=service';
                }
            }
        });
    });
}

// 根据选中的标签筛选服务
function filterServicesByTab(tabText) {
    // 模拟加载效果
    const serviceGrid = document.querySelector('.service-grid');
    serviceGrid.style.opacity = '0.5';
    
    setTimeout(() => {
        serviceGrid.style.opacity = '1';
        showToast(`已切换到${tabText}分类`);
    }, 300);
    
    // 在实际应用中，这里应该根据标签筛选服务，
    // 例如从服务器获取不同分类的服务列表
}

// 显示服务预约对话框
function showBookingDialog(serviceName) {
    // 创建对话框元素
    const dialog = document.createElement('div');
    dialog.className = 'dialog-overlay';
    
    const dialogContent = document.createElement('div');
    dialogContent.className = 'dialog-content';
    
    const dialogHeader = document.createElement('div');
    dialogHeader.className = 'dialog-header';
    dialogHeader.textContent = `预约${serviceName}`;
    
    const dialogForm = document.createElement('div');
    dialogForm.className = 'dialog-form';
    
    // 添加表单内容
    dialogForm.innerHTML = `
        <div class="form-group">
            <label>预约日期</label>
            <input type="date" min="${new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group">
            <label>预约时间</label>
            <select>
                <option>上午 8:00 - 10:00</option>
                <option>上午 10:00 - 12:00</option>
                <option>下午 14:00 - 16:00</option>
                <option>下午 16:00 - 18:00</option>
            </select>
        </div>
        <div class="form-group">
            <label>服务地址</label>
            <input type="text" placeholder="请输入服务地址">
        </div>
        <div class="form-group">
            <label>联系电话</label>
            <input type="tel" placeholder="请输入联系电话">
        </div>
        <div class="form-group">
            <label>备注</label>
            <textarea placeholder="请输入备注信息（选填）"></textarea>
        </div>
    `;
    
    const dialogActions = document.createElement('div');
    dialogActions.className = 'dialog-actions';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'dialog-button cancel';
    cancelButton.textContent = '取消';
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'dialog-button confirm';
    confirmButton.textContent = '确认预约';
    
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
            max-height: 90vh;
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
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .form-group textarea {
            min-height: 80px;
            resize: vertical;
        }
        
        .dialog-actions {
            display: flex;
            justify-content: space-between;
        }
        
        .dialog-button {
            flex: 1;
            margin: 0 5px;
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
            background-color: #30c67d;
            color: white;
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
        // 校验表单
        const dateInput = dialogForm.querySelector('input[type="date"]');
        const addressInput = dialogForm.querySelector('input[type="text"]');
        const phoneInput = dialogForm.querySelector('input[type="tel"]');
        
        if (!dateInput.value) {
            showToast('请选择预约日期');
            return;
        }
        
        if (!addressInput.value) {
            showToast('请输入服务地址');
            return;
        }
        
        if (!phoneInput.value) {
            showToast('请输入联系电话');
            return;
        }
        
        // 模拟预约成功
        closeDialog(dialog);
        showToast('预约成功！');
        
        // 添加到最近预约列表
        addToRecentBookings(serviceName, dateInput.value);
    });
    
    // 点击外部关闭
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeDialog(dialog);
        }
    });
}

// 显示服务详情
function showServiceDetail(serviceName) {
    // 创建详情页元素
    const detail = document.createElement('div');
    detail.className = 'service-detail-overlay';
    
    const detailContent = document.createElement('div');
    detailContent.className = 'service-detail-content';
    
    // 添加关闭按钮
    const closeButton = document.createElement('div');
    closeButton.className = 'detail-close-button';
    closeButton.innerHTML = '&times;';
    
    // 根据服务名称设置不同的详情内容
    let detailHtml = '';
    let iconClass = '';
    
    if (serviceName === '老年营养餐') {
        iconClass = 'food-bg';
        detailHtml = `
            <div class="detail-header">
                <div class="detail-icon ${iconClass}">
                    <img src="images/food-icon.png" alt="营养餐" width="32" height="32">
                </div>
                <div class="detail-title">
                    <h2>${serviceName}</h2>
                    <div class="detail-rating">
                        <div class="stars">
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                        </div>
                        <span class="rating">4.9 (124条评价)</span>
                    </div>
                </div>
            </div>
            <div class="detail-info">
                <div class="info-item">
                    <img src="images/time-icon.png" alt="时间" width="16" height="16">
                    <span>配送时间：每日 11:30 - 12:30</span>
                </div>
                <div class="info-item">
                    <img src="images/location-icon.png" alt="位置" width="16" height="16">
                    <span>服务范围：社区周边 3 公里</span>
                </div>
                <div class="info-item">
                    <img src="images/price-icon.png" alt="价格" width="16" height="16">
                    <span>服务价格：15元/餐（特殊人群可享受补贴）</span>
                </div>
            </div>
            <div class="detail-description">
                <h3>服务介绍</h3>
                <p>专为老年人设计的营养配餐服务，每日新鲜制作，按照老年人的营养需求和口味偏好精心搭配。菜品软烂适口，易于咀嚼消化，荤素搭配均衡，保证老年人日常所需的各类营养素摄入。</p>
                <p>本周菜单包括：红烧鱼块、清炒时蔬、玉米排骨汤、糖醋里脊、蒸蛋羹等多种菜品轮换。</p>
            </div>
            <div class="detail-reviews">
                <h3>用户评价</h3>
                <div class="review-item">
                    <div class="review-user">王大爷</div>
                    <div class="review-content">口味很好，每天不重样，老人家都吃得很开心。配送也很准时。</div>
                </div>
                <div class="review-item">
                    <div class="review-user">张奶奶</div>
                    <div class="review-content">分量足，菜品软烂，老人牙口不好也能吃，营养均衡，比自己做方便多了。</div>
                </div>
            </div>
        `;
    } else if (serviceName === '社区医疗巡诊') {
        iconClass = 'medical-bg';
        detailHtml = `
            <div class="detail-header">
                <div class="detail-icon ${iconClass}">
                    <img src="images/medical-icon.png" alt="医疗" width="32" height="32">
                </div>
                <div class="detail-title">
                    <h2>${serviceName}</h2>
                    <div class="detail-rating">
                        <div class="stars">
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                            <span class="star half">★</span>
                        </div>
                        <span class="rating">4.8 (86条评价)</span>
                    </div>
                </div>
            </div>
            <div class="detail-info">
                <div class="info-item">
                    <img src="images/calendar-icon.png" alt="日历" width="16" height="16">
                    <span>服务时间：每周三、五上午 9:00 - 11:30</span>
                </div>
                <div class="info-item">
                    <img src="images/location-icon.png" alt="位置" width="16" height="16">
                    <span>服务地点：社区服务中心一楼</span>
                </div>
                <div class="info-item">
                    <img src="images/price-icon.png" alt="价格" width="16" height="16">
                    <span>服务价格：免费（需提前预约）</span>
                </div>
            </div>
            <div class="detail-description">
                <h3>服务介绍</h3>
                <p>由社区卫生服务中心专业医护人员提供的定期巡诊服务，包括基础体检、慢病管理、健康咨询等内容。特别适合行动不便的老年人、慢性病患者等需要定期医疗随访的人群。</p>
                <p>巡诊医生团队包括：全科医生、内科医生、康复师、护士等专业医护人员。</p>
            </div>
            <div class="detail-reviews">
                <h3>用户评价</h3>
                <div class="review-item">
                    <div class="review-user">李大爷</div>
                    <div class="review-content">医生很耐心，不用去大医院排队，在家门口就能看病，血压药也能直接开，很方便。</div>
                </div>
                <div class="review-item">
                    <div class="review-user">赵奶奶</div>
                    <div class="review-content">定期血糖监测，医生还会指导用药，比自己摸索要好多了，感谢社区提供这么好的服务。</div>
                </div>
            </div>
        `;
    } else {
        // 默认详情
        iconClass = serviceName.includes('助餐') ? 'food-bg' : 
                   serviceName.includes('助医') ? 'medical-bg' : 
                   serviceName.includes('助洁') ? 'cleaning-bg' : 
                   serviceName.includes('助行') ? 'travel-bg' : 
                   serviceName.includes('康复') ? 'rehab-bg' : 'station-bg';
        
        detailHtml = `
            <div class="detail-header">
                <div class="detail-icon ${iconClass}">
                    <img src="images/${iconClass.replace('-bg', '-icon')}.png" alt="${serviceName}" width="32" height="32">
                </div>
                <div class="detail-title">
                    <h2>${serviceName}</h2>
                    <div class="detail-rating">
                        <div class="stars">
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                            <span class="star filled">★</span>
                            <span class="star">★</span>
                        </div>
                        <span class="rating">4.0 (50条评价)</span>
                    </div>
                </div>
            </div>
            <div class="detail-info">
                <div class="info-item">
                    <img src="images/time-icon.png" alt="时间" width="16" height="16">
                    <span>服务时间：每日 9:00 - 17:00</span>
                </div>
                <div class="info-item">
                    <img src="images/location-icon.png" alt="位置" width="16" height="16">
                    <span>服务范围：社区周边 2 公里</span>
                </div>
                <div class="info-item">
                    <img src="images/price-icon.png" alt="价格" width="16" height="16">
                    <span>服务价格：请咨询客服</span>
                </div>
            </div>
            <div class="detail-description">
                <h3>服务介绍</h3>
                <p>这是${serviceName}的详细介绍。我们提供专业、贴心的服务，满足老年人的各种需求，提高生活质量，解决日常困难。</p>
            </div>
            <div class="detail-reviews">
                <h3>用户评价</h3>
                <div class="review-item">
                    <div class="review-user">用户评价</div>
                    <div class="review-content">服务很好，工作人员态度亲切，很满意。</div>
                </div>
            </div>
        `;
    }
    
    // 添加预约按钮
    const bookingButton = document.createElement('button');
    bookingButton.className = 'detail-booking-button';
    bookingButton.textContent = serviceName.includes('微站') ? '查看详情' : '立即预约';
    
    // 组装详情页
    detailContent.innerHTML = detailHtml;
    detailContent.appendChild(bookingButton);
    detailContent.appendChild(closeButton);
    
    detail.appendChild(detailContent);
    document.body.appendChild(detail);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .service-detail-overlay {
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
        
        .service-detail-content {
            background-color: #fff;
            border-radius: 12px 12px 0 0;
            width: 100%;
            max-width: 500px;
            height: 80vh;
            position: fixed;
            bottom: 0;
            overflow-y: auto;
            padding: 20px;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
            animation: slideUp 0.3s ease forwards;
        }
        
        .detail-close-button {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 30px;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: #666;
            cursor: pointer;
        }
        
        .detail-header {
            display: flex;
            margin-bottom: 20px;
        }
        
        .detail-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
        }
        
        .detail-title h2 {
            font-size: 1.3rem;
            margin: 0 0 8px 0;
            color: #333;
        }
        
        .detail-rating {
            display: flex;
            align-items: center;
        }
        
        .detail-info {
            margin-bottom: 20px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-size: 0.9rem;
            color: #666;
        }
        
        .info-item img {
            margin-right: 8px;
        }
        
        .detail-description {
            margin-bottom: 20px;
        }
        
        .detail-description h3 {
            font-size: 1.1rem;
            margin-bottom: 10px;
            color: #333;
        }
        
        .detail-description p {
            font-size: 0.95rem;
            line-height: 1.5;
            color: #666;
            margin-bottom: 10px;
        }
        
        .detail-reviews h3 {
            font-size: 1.1rem;
            margin-bottom: 10px;
            color: #333;
        }
        
        .review-item {
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }
        
        .review-user {
            font-size: 0.9rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .review-content {
            font-size: 0.9rem;
            color: #666;
        }
        
        .detail-booking-button {
            position: sticky;
            bottom: 0;
            width: 100%;
            background-color: #30c67d;
            color: white;
            border: none;
            border-radius: 100px;
            padding: 12px 0;
            font-size: 1rem;
            font-weight: bold;
            margin-top: 20px;
            cursor: pointer;
        }
        
        @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
    `;
    
    document.head.appendChild(style);
    
    // 处理按钮点击事件
    closeButton.addEventListener('click', function() {
        document.body.removeChild(detail);
    });
    
    bookingButton.addEventListener('click', function() {
        document.body.removeChild(detail);
        
        if (!serviceName.includes('微站')) {
            showBookingDialog(serviceName);
        } else {
            showToast('查看微站详情');
        }
    });
    
    // 点击外部关闭
    detail.addEventListener('click', function(e) {
        if (e.target === detail) {
            document.body.removeChild(detail);
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

// 显示吐司提示
function showToast(message) {
    // 检查是否已经存在toast元素
    let toast = document.querySelector('.toast-message');
    
    if (!toast) {
        // 创建toast元素
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

// 添加到最近预约列表
function addToRecentBookings(serviceName, date) {
    // 解析日期
    const bookingDate = new Date(date);
    const today = new Date();
    
    // 格式化日期显示
    let dateDisplay = '';
    if (bookingDate.toDateString() === today.toDateString()) {
        dateDisplay = '今日';
    } else {
        const month = (bookingDate.getMonth() + 1).toString().padStart(2, '0');
        const day = bookingDate.getDate().toString().padStart(2, '0');
        dateDisplay = `${month}-${day}`;
    }
    
    // 随机时间
    const hours = ['9:00', '10:00', '14:00', '15:00', '16:00'];
    const randomTime = hours[Math.floor(Math.random() * hours.length)];
    const timeDisplay = `${dateDisplay} ${bookingDate.getHours() < 12 ? '上午' : '下午'} ${randomTime}`;
    
    // 决定图标类型
    const iconClass = serviceName.includes('营养餐') ? 'food-bg' : 
                     serviceName.includes('医') ? 'medical-bg' : 
                     serviceName.includes('清洁') ? 'cleaning-bg' : 
                     serviceName.includes('行') ? 'travel-bg' : 
                     serviceName.includes('康复') ? 'rehab-bg' : 'station-bg';
    
    // 创建新的预约项元素
    const bookingList = document.querySelector('.booking-list');
    const newBooking = document.createElement('div');
    newBooking.className = 'booking-item';
    newBooking.style.opacity = '0';
    newBooking.style.transform = 'translateY(10px)';
    
    newBooking.innerHTML = `
        <div class="booking-icon ${iconClass}">
            <img src="images/${iconClass.replace('-bg', '-icon')}.png" alt="${serviceName}" width="32" height="32">
        </div>
        <div class="booking-info">
            <div class="booking-name">${serviceName}</div>
            <div class="booking-time">${timeDisplay}</div>
        </div>
        <div class="booking-status booked">已预约</div>
    `;
    
    // 添加到列表顶部
    if (bookingList.firstChild) {
        bookingList.insertBefore(newBooking, bookingList.firstChild);
    } else {
        bookingList.appendChild(newBooking);
    }
    
    // 添加动画效果
    setTimeout(() => {
        newBooking.style.opacity = '1';
        newBooking.style.transform = 'translateY(0)';
    }, 100);
}

// 模拟页面加载动画
function animatePageLoad() {
    const elements = [
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.service-item'),
        ...document.querySelectorAll('.booking-item')
    ];
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + index * 50);
    });
}

// 更新首页跳转链接
function updateHomePageLink() {
    // 这个函数应该在index.js中调用
    const serviceCard = document.querySelector('.service-card');
    if (serviceCard) {
        serviceCard.addEventListener('click', function() {
            window.location.href = 'service.html?from=home';
        });
    }
}