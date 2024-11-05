const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// 添加 body-parser 中間件來解析 POST 請求
const bodyParser = require('express').json();

// 添加模擬的用戶數據庫
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    companyName: "ABC 健身公司",
    role: "系統管理員",
    avatar: null
  },
  {
    id: 2,
    username: "Hugo",
    password: "Hugo123",
    companyName: "HUgo健身公司",
    role: "一般用戶",
    avatar: null
  }
];

// 啟用 CORS
app.use(cors());

// 模擬數據
const userData = {
  companyName: "ABC 健身公司",
  accountName: "John Doe",
  role: "系統管理員",
  avatar: null // 如果有頭像URL可以放這裡
};
 

const dashboardData = {
  dailyActiveUsers: [
    { date: '2024-11-01', activeUsers: 1000 },
    { date: '2024-11-02', activeUsers: 1000 },
    { date: '2024-11-03', activeUsers: 1000 },
    { date: '2024-11-04', activeUsers: 100 }
  ],

  averageUsageTime: [
    { date: '2024-11-01', averageUsageTime: 50 },
    { date: '2024-11-02', averageUsageTime: 45},
    { date: '2024-11-03', averageUsageTime: 35 },
    { date: '2024-11-04', averageUsageTime: 30 }
  ],
    
  inactiveEmployees: [
    { date: '2024-11-01', inactiveEmployees: 3 },
    { date: '2024-11-02', inactiveEmployees: 2 },
    { date: '2024-11-03', inactiveEmployees: 1 },
    { date: '2024-11-04', inactiveEmployees: 10 }
  ],

  monthlyTrends: [
    { month: '一月', activeUsers: 1000 },
    { month: '二月', activeUsers: 1200 },
    { month: '三月', activeUsers: 900 },
    { month: '四月', activeUsers: 1000 },
    { month: '五月', activeUsers: 1100 },
    { month: '六月', activeUsers: 1000 },
    { month: '七月', activeUsers: 800 },
    { month: '八月', activeUsers: 1000 },
    { month: '九月', activeUsers: 1200 },
    { month: '十月', activeUsers: 1500 },
    { month: '十一月', activeUsers: 2400 },
    { month: '十二月', activeUsers: 3000}
  ],
  employeeParticipation: [
    { name: '張小明', participationRate: 10 },
    { name: '李小華', participationRate: 92 },
    { name: '王大明', participationRate: 78 },
    { name: '陳小芳', participationRate: 95 },
    { name: '林志偉', participationRate: 88 },
    { name: '黃雅琪', participationRate: 760 },
    { name: '劉建宏', participationRate: 910 },
    { name: '吳佳穎', participationRate: 830 },
    { name: '蔡明翰', participationRate: 870 },
    { name: '楊雅婷', participationRate: 940 },
    { name: '周俊宏', participationRate: 790 },
    { name: '許雅雯', participationRate: 860 },
    { name: '謝宗翰', participationRate: 930 },
    { name: '鄭佩珊', participationRate: 810 },
    { name: '洪志明', participationRate: 890 },
    { name: '曾雅玲', participationRate: 77 },
    { name: '邱建志', participationRate: 90 },
    { name: '廖雅琳', participationRate: 84 },
    { name: '趙志豪', participationRate: 88 },
    { name: '徐雅芳', participationRate: 96 },
    { name: '潘俊賢', participationRate: 82 },
    { name: '簡雅惠', participationRate: 91 },
    { name: '江志強', participationRate: 85 },
    { name: '何佳蓉', participationRate: 93 },
    { name: '卓建良', participationRate: 80 },
    { name: '范雅文', participationRate: 87 },
    { name: '朱志偉', participationRate: 94 },
    { name: '宋雅婷', participationRate: 86 },
    { name: '馬俊傑', participationRate: 89 },
    { name: '高雅萍', participationRate: 92 }
  ],
  healthRiskEmployees: [
    { name: '張小明', riskReason: '肌耐力下降' },
    { name: '李小華', riskReason: '連續3天未完成訓練' },
    { name: '王大明', riskReason: '工作壓力導致的睡眠問題' },
    { name: '陳小芳', riskReason: '運動強度過高' },
    { name: '林志偉', riskReason: '飲食計劃執行不佳' },
    { name: '黃雅琪', riskReason: '缺乏休息時間' },
    { name: '劉建宏', riskReason: '肌肉疲勞警告' },
    { name: '吳佳穎', riskReason: '心率異常警示' },
    { name: '蔡明翰', riskReason: '姿勢矯正需求' },
    { name: '楊雅婷', riskReason: '關節活動度不足' },
    { name: '周俊宏', riskReason: '體重控制未達標' },
    { name: '許雅雯', riskReason: '水分攝取不足' },
    { name: '謝宗翰', riskReason: '運動頻率過低' },
    { name: '鄭佩珊', riskReason: '壓力指數過高' },
    { name: '洪志明', riskReason: '睡眠品質不佳' },
    { name: '曾雅玲', riskReason: '肌耐力下降' },
    { name: '邱建志', riskReason: '柔軟度待改善' },
    { name: '廖雅琳', riskReason: '恢復時間不足' },
    { name: '趙志豪', riskReason: '運動計劃執行率低' },
    { name: '徐雅芳', riskReason: '疲勞指數過高' }
  ]
};

// API 文檔頁面
app.get('/', (req, res) => {
  res.send(`
    <h1>健身管理系統 API</h1>
    <h2>可用的端點：</h2>
    <ul>
      <li><a href="/api/user-info">/api/user-info</a> - 公司與用戶資訊</li>
      <li><a href="/api/daily-active-users">/api/daily-active-users</a> - 每日活躍用戶</li>
      <li><a href="/api/average-usage-time">/api/average-usage-time</a> - 平均使用時間</li>
      <li><a href="/api/inactive-employees">/api/inactive-employees</a> - 不活躍員工</li>
      <li><a href="/api/monthly-trends">/api/monthly-trends</a> - 月度活躍用戶趨勢</li>
      <li><a href="/api/employee-participation">/api/employee-participation</a> - 員工參與情況</li>
      <li><a href="/api/health-risk-employees">/api/health-risk-employees</a> - 健康風險員工</li>
      <li><a href="/api/overview">/api/overview</a> - 概覽數據</li>
    </ul>
  `);
});

app.get('/api/user-info', (req, res) => {
  res.json(userData);
});

app.get('/api/daily-active-users', (req, res) => {
  res.json(dashboardData.dailyActiveUsers);
});

app.get('/api/average-usage-time', (req, res) => {
  res.json(dashboardData.averageUsageTime);
});

app.get('/api/inactive-employees', (req, res) => {
  res.json(dashboardData.inactiveEmployees);
});

app.get('/api/monthly-trends', (req, res) => {
  res.json(dashboardData.monthlyTrends);
});

app.get('/api/employee-participation', (req, res) => {
  res.json(dashboardData.employeeParticipation);
});

app.get('/api/health-risk-employees', (req, res) => {
  res.json(dashboardData.healthRiskEmployees);
});

app.get('/api/overview', (req, res) => {
  res.json(dashboardData.overview);
});

// 登入 API
app.post('/api/login', bodyParser, (req, res) => {
  const { username, password } = req.body;

  // 查找用戶
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // 登入成功，返回用戶資訊（不包含密碼）
    const { password, ...userInfo } = user;
    res.json({
      success: true,
      message: "登入成功",
      data: {
        ...userInfo,
        token: `dummy-token-${user.id}` // 模擬 token
      }
    });
  } else {
    // 登入失敗
    res.status(401).json({
      success: false,
      message: "用戶名或密碼錯誤"
    });
  }
});

// 驗證 token 的中間件（可選）
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "未提供認證令牌"
    });
  }

  // 這裡僅做簡單驗證，實際應用中應該使用 JWT
  if (token.startsWith('dummy-token-')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "無效的認證令牌"
    });
  }
};

// 測試認證的API（可選）
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "認證成功",
    data: "這是受保護的數據"
  });
});

// 啟動服務器
app.listen(port, () => {
  console.log(`API 服務器運行在 http://localhost:${port}`);
}); 