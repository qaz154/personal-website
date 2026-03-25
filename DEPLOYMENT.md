# 部署指南 - 个人网站

## 概述
这是一个高级个人网站，使用Next.js 16、React 19、Tailwind CSS、Supabase等技术构建。支持博客、项目管理、AI聊天、3D效果等高级功能。

## 部署到Vercel

### 前提条件
1. 注册 [Vercel](https://vercel.com) 账户
2. 注册 [Supabase](https://supabase.com) 账户并创建项目
3. (可选) 注册 [Resend](https://resend.com) 用于邮件功能
4. (可选) 获取 [Anthropic API Key](https://console.anthropic.com) 用于AI聊天
5. (可选) 获取 [GitHub Token](https://github.com/settings/tokens) 用于GitHub活动展示

### 步骤

#### 1. 准备环境变量
在Vercel中配置以下环境变量：

**必需配置：**
- `NEXT_PUBLIC_SUPABASE_URL`: 你的Supabase项目URL (如: `https://xxx.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 你的Supabase匿名密钥
- `SUPABASE_SERVICE_ROLE_KEY`: 你的Supabase服务角色密钥

**可选配置：**
- `NEXT_PUBLIC_RESEND_API_KEY`: Resend API密钥 (用于联系表单)
- `RESEND_FROM_EMAIL`: 发件人邮箱
- `RESEND_TO_EMAIL`: 收件人邮箱
- `ANTHROPIC_API_KEY`: Anthropic API密钥 (用于AI聊天功能)
- `GITHUB_TOKEN`: GitHub个人访问令牌 (用于展示GitHub活动)
- `GITHUB_USERNAME`: GitHub用户名

**应用配置：**
- `NEXT_PUBLIC_APP_URL`: 部署后的URL (如: `https://your-site.vercel.app`)
- `NEXT_PUBLIC_SITE_NAME`: 网站名称 (如: "张三的个人网站")
- `NEXT_PUBLIC_SITE_DESCRIPTION`: 网站描述

#### 2. 部署到Vercel

**方法A: 通过GitHub导入**
1. 将代码推送到GitHub仓库
2. 登录Vercel，点击"New Project"
3. 导入你的GitHub仓库
4. 配置环境变量（如上所述）
5. 点击"Deploy"

**方法B: 通过Vercel CLI**
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

#### 3. 配置Supabase数据库
1. 在Supabase控制台运行SQL脚本初始化数据库
2. 启用身份验证功能
3. 配置存储策略（用于上传文件）

#### 4. 配置自定义域名（可选）
1. 在Vercel项目设置中，进入"Domains"
2. 添加你的自定义域名
3. 按照提示配置DNS记录

## 本地开发

### 环境设置
1. 复制 `.env.example` 为 `.env.local`
2. 填入实际的环境变量值
3. 安装依赖: `npm install`
4. 运行开发服务器: `npm run dev`

### 数据库迁移
如果需要初始化数据库，请运行Supabase迁移脚本。

## 故障排除

### 常见问题
1. **构建失败**: 检查环境变量是否完整
2. **API错误**: 确认Supabase项目已正确配置
3. **认证问题**: 检查Supabase身份验证设置
4. **图片加载失败**: 检查`next.config.ts`中的远程模式配置

### 性能优化
- 使用Vercel的边缘函数减少延迟
- 启用图片优化
- 配置适当的缓存头

## 维护

### 更新依赖
```bash
npm update
```

### 代码质量检查
```bash
npm run lint
npm run format
```

### 生产构建测试
```bash
npm run build
npm start
```

## 安全注意事项
1. 不要将`.env.local`提交到Git
2. 定期更新依赖包
3. 监控API使用情况
4. 设置适当的访问控制

---

**注意**: 部署前请确保所有功能已测试，并准备好必要的API密钥和服务配置。