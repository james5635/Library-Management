export type Language = 'en' | 'km' | 'ja' | 'zh' | 'ko';

export interface Translations {
    // Navigation
    dashboard: string;
    books: string;
    librarian: string;
    chatbot: string;
    bookmark: string;
    settings: string;
    help: string;

    // Management
    bookManagement: string;
    member: string;
    loan: string;
    fine: string;
    report: string;
    addBook: string;
    addMember: string;
    staff: string;

    // Common
    search: string;
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    close: string;
    login: string;
    logout: string;
    register: string;
    username: string;
    password: string;
    email: string;
    role: string;
    name: string;
    submit: string;
    loading: string;
    noData: string;
    actions: string;
    status: string;
    available: string;
    borrowed: string;
    reserved: string;
    lost: string;

    // Auth
    signIn: string;
    signUp: string;
    forgotPassword: string;
    noAccount: string;
    hasAccount: string;

    // Book Detail
    borrowNow: string;
    reserveBook: string;
    borrowDigital: string;
    reservePhysical: string;
    summarize: string;
    like: string;
    comments: string;
    addComment: string;
    writeComment: string;
    physicalOnly: string;
    digitalOnly: string;
    reserved: string;

    // Settings
    fontSize: string;
    language: string;
    small: string;
    medium: string;
    large: string;
    settingsSaved: string;

    // Dashboard
    discoverTitle: string;
    discoverSubtitle: string;
    browseCatalog: string;
    recentlyAdded: string;
    viewAll: string;
    totalBooks: string;
    activeReaders: string;
    overdueLoans: string;
    adminRate: string;
    currentLoans: string;
    returnRate: string;

    // AI
    askAnything: string;
    aiAssistant: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        dashboard: 'Dashboard', books: 'Books', librarian: 'Librarian', chatbot: 'AI Assistant',
        bookmark: 'Bookmark', settings: 'Settings', help: 'Help',
        bookManagement: 'Book Management', member: 'Member', loan: 'Loan', fine: 'Fine',
        report: 'Report', addBook: 'Add Book', addMember: 'Add Member', staff: 'Staff',
        search: 'Search Book', save: 'Save', cancel: 'Cancel', edit: 'Edit', delete: 'Delete',
        close: 'Close', login: 'Login', logout: 'Logout', register: 'Register',
        username: 'Username', password: 'Password', email: 'Email', role: 'Role', name: 'Name',
        submit: 'Submit', loading: 'Loading...', noData: 'No data available',
        actions: 'Actions', status: 'Status',
        available: 'Available', borrowed: 'Borrowed', reserved: 'Reserved', lost: 'Lost',
        signIn: 'Sign In', signUp: 'Sign Up', forgotPassword: 'Forgot password?',
        noAccount: 'No account? Register', hasAccount: 'Already have an account? Sign In',
        borrowNow: 'Borrow Now', reserveBook: 'Reserve', borrowDigital: 'Borrow (Digital)', reservePhysical: 'Reserve (Physical)',
        summarize: 'AI Summary',
        like: 'Like', comments: 'Comments', addComment: 'Add Comment', writeComment: 'Write a comment...',
        physicalOnly: 'Physical Book Only', digitalOnly: 'Digital Book Available',
        reserved: 'Reservations',
        fontSize: 'Font Size', language: 'Language', small: 'Small', medium: 'Medium', large: 'Large',
        settingsSaved: 'Settings saved!',
        discoverTitle: 'Discover Your Next Great Adventure',
        discoverSubtitle: 'Search and read through our extensive library of over 10,000 digital and physical books.',
        browseCatalog: 'Browse Catalog', recentlyAdded: 'Recently Added', viewAll: 'View all',
        totalBooks: 'Total Books', activeReaders: 'Active Readers', overdueLoans: 'Overdue Loans',
        adminRate: 'Admin Rate', currentLoans: 'Current Loans', returnRate: 'Return Rate',
        askAnything: 'Ask anything...', aiAssistant: 'AI Assistant',
    },
    km: {
        dashboard: 'ផ្ទាំងគ្រប់គ្រង', books: 'សៀវភៅ', librarian: 'បណ្ណារក្ស', chatbot: 'ជំនួយការ AI',
        bookmark: 'ចំណាំ', settings: 'ការកំណត់', help: 'ជំនួយ',
        bookManagement: 'គ្រប់គ្រងសៀវភៅ', member: 'សមាជិក', loan: 'ការខ្ចី', fine: 'ពិន័យ',
        report: 'របាយការណ៍', addBook: 'បន្ថែមសៀវភៅ', addMember: 'បន្ថែមសមាជិក', staff: 'បុគ្គលិក',
        search: 'ស្វែងរកសៀវភៅ', save: 'រក្សាទុក', cancel: 'បោះបង់', edit: 'កែសម្រួល', delete: 'លុប',
        close: 'បិទ', login: 'ចូល', logout: 'ចាកចេញ', register: 'ចុះឈ្មោះ',
        username: 'ឈ្មោះអ្នកប្រើ', password: 'ពាក្យសម្ងាត់', email: 'អ៊ីមែល', role: 'តួនាទី', name: 'ឈ្មោះ',
        submit: 'ដាក់ស្នើ', loading: 'កំពុងផ្ទុក...', noData: 'មិនមានទិន្នន័យ',
        actions: 'សកម្មភាព', status: 'ស្ថានភាព',
        available: 'មាន', borrowed: 'បានខ្ចី', reserved: 'បានកក់ទុក', lost: 'បាត់បង់',
        signIn: 'ចូល', signUp: 'ចុះឈ្មោះ', forgotPassword: 'ភ្លេចពាក្យសម្ងាត់?',
        noAccount: 'មិនមានគណនី? ចុះឈ្មោះ', hasAccount: 'មានគណនីរួចហើយ? ចូល',
        borrowNow: 'ខ្ចីឥឡូវ', reserveBook: 'កក់ទុក', borrowDigital: 'ខ្ចី (ឌីជីថល)', reservePhysical: 'កក់ (រូបិយ)', summarize: 'សង្ខេប AI',
        like: 'ចូលចិត្ត', comments: 'មតិយោបល់', addComment: 'បន្ថែមមតិ', writeComment: 'សរសេរមតិ...',
        physicalOnly: 'សៀវភៅរូបិយប៉ុណ្ណោះ', digitalOnly: 'មានជាសៀវភៅឌីជីថល',
        reserved: 'ការកក់',
        fontSize: 'ទំហំអក្សរ', language: 'ភាសា', small: 'តូច', medium: 'មធ្យម', large: 'ធំ',
        settingsSaved: 'បានរក្សាទុកការកំណត់!',
        discoverTitle: 'រកឃើញការផ្សងព្រេងដ៏អស្ចារ្យបន្ទាប់របស់អ្នក',
        discoverSubtitle: 'ស្វែងរក និងអានតាមរយៈបណ្ណាល័យដ៏ធំទូលាយរបស់យើង',
        browseCatalog: 'រកមើលកាតាឡុក', recentlyAdded: 'បានបន្ថែមថ្មីៗ', viewAll: 'មើលទាំងអស់',
        totalBooks: 'សៀវភៅសរុប', activeReaders: 'អ្នកអានសកម្ម', overdueLoans: 'ការខ្ចីហួសកំណត់',
        adminRate: 'អត្រាគ្រប់គ្រង', currentLoans: 'ការខ្ចីបច្ចុប្បន្ន', returnRate: 'អត្រាត្រឡប់',
        askAnything: 'សួរអ្វីក៏បាន...', aiAssistant: 'ជំនួយការ AI',
    },
    ja: {
        dashboard: 'ダッシュボード', books: '本', librarian: '司書', chatbot: 'AIアシスタント',
        bookmark: 'ブックマーク', settings: '設定', help: 'ヘルプ',
        bookManagement: '本の管理', member: 'メンバー', loan: '貸出', fine: '罰金',
        report: 'レポート', addBook: '本を追加', addMember: 'メンバーを追加', staff: 'スタッフ',
        search: '本を検索', save: '保存', cancel: 'キャンセル', edit: '編集', delete: '削除',
        close: '閉じる', login: 'ログイン', logout: 'ログアウト', register: '登録',
        username: 'ユーザー名', password: 'パスワード', email: 'メール', role: '役割', name: '名前',
        submit: '送信', loading: '読み込み中...', noData: 'データなし',
        actions: 'アクション', status: 'ステータス',
        available: '利用可能', borrowed: '貸出中', reserved: '予約済み', lost: '紛失',
        signIn: 'サインイン', signUp: 'サインアップ', forgotPassword: 'パスワードを忘れた？',
        noAccount: 'アカウントがない？登録', hasAccount: 'アカウントをお持ちですか？サインイン',
        borrowNow: '今すぐ借りる', reserveBook: '予約する', borrowDigital: '今すぐ借り入れる (デジタル)', reservePhysical: '予約する (物理)', summarize: 'AI要約',
        like: 'いいね', comments: 'コメント', addComment: 'コメントを追加', writeComment: 'コメントを書く...',
        physicalOnly: '紙の本のみ', digitalOnly: '電子書籍利用可',
        reserved: '予約',
        fontSize: 'フォントサイズ', language: '言語', small: '小', medium: '中', large: '大',
        settingsSaved: '設定を保存しました！',
        discoverTitle: '次の素晴らしい冒険を発見',
        discoverSubtitle: '10,000冊以上のデジタルおよび物理的な本のライブラリを検索して読む',
        browseCatalog: 'カタログを閲覧', recentlyAdded: '最近追加された', viewAll: 'すべて表示',
        totalBooks: '総書籍数', activeReaders: 'アクティブな読者', overdueLoans: '延滞貸出',
        adminRate: '管理率', currentLoans: '現在の貸出', returnRate: '返却率',
        askAnything: '何でも聞いてください...', aiAssistant: 'AIアシスタント',
    },
    zh: {
        dashboard: '仪表盘', books: '图书', librarian: '图书管理员', chatbot: 'AI助手',
        bookmark: '书签', settings: '设置', help: '帮助',
        bookManagement: '图书管理', member: '会员', loan: '借阅', fine: '罚款',
        report: '报告', addBook: '添加图书', addMember: '添加会员', staff: '员工',
        search: '搜索图书', save: '保存', cancel: '取消', edit: '编辑', delete: '删除',
        close: '关闭', login: '登录', logout: '退出', register: '注册',
        username: '用户名', password: '密码', email: '邮箱', role: '角色', name: '姓名',
        submit: '提交', loading: '加载中...', noData: '暂无数据',
        actions: '操作', status: '状态',
        available: '可借', borrowed: '已借出', reserved: '已预约', lost: '遗失',
        signIn: '登录', signUp: '注册', forgotPassword: '忘记密码？',
        noAccount: '没有账号？注册', hasAccount: '已有账号？登录',
        borrowNow: '立即借阅', reserveBook: '预约', borrowDigital: '借阅 (电子)', reservePhysical: '预约 (实体)', summarize: 'AI摘要',
        like: '点赞', comments: '评论', addComment: '添加评论', writeComment: '写评论...',
        physicalOnly: '仅实体书', digitalOnly: '电子书可借',
        reserved: '预约',
        fontSize: '字体大小', language: '语言', small: '小', medium: '中', large: '大',
        settingsSaved: '设置已保存！',
        discoverTitle: '发现你的下一个精彩冒险',
        discoverSubtitle: '搜索和阅读我们拥有超过10,000本数字和实体图书的图书馆',
        browseCatalog: '浏览目录', recentlyAdded: '最近添加', viewAll: '查看全部',
        totalBooks: '总图书数', activeReaders: '活跃读者', overdueLoans: '逾期借阅',
        adminRate: '管理比率', currentLoans: '当前借阅', returnRate: '归还率',
        askAnything: '随便问什么...', aiAssistant: 'AI助手',
    },
    ko: {
        dashboard: '대시보드', books: '도서', librarian: '사서', chatbot: 'AI 어시스턴트',
        bookmark: '북마크', settings: '설정', help: '도움말',
        bookManagement: '도서 관리', member: '회원', loan: '대출', fine: '벌금',
        report: '보고서', addBook: '도서 추가', addMember: '회원 추가', staff: '직원',
        search: '도서 검색', save: '저장', cancel: '취소', edit: '편집', delete: '삭제',
        close: '닫기', login: '로그인', logout: '로그아웃', register: '가입',
        username: '사용자 이름', password: '비밀번호', email: '이메일', role: '역할', name: '이름',
        submit: '제출', loading: '로딩 중...', noData: '데이터 없음',
        actions: '작업', status: '상태',
        available: '대출 가능', borrowed: '대출 중', reserved: '예약됨', lost: '분실',
        signIn: '로그인', signUp: '가입', forgotPassword: '비밀번호를 잊으셨나요?',
        noAccount: '계정이 없나요? 가입', hasAccount: '이미 계정이 있나요? 로그인',
        borrowNow: '지금 대출', reserveBook: '예약', borrowDigital: '대출 (디지털)', reservePhysical: '예약 (실물)', summarize: 'AI 요약',
        like: '좋아요', comments: '댓글', addComment: '댓글 추가', writeComment: '댓글을 작성하세요...',
        physicalOnly: '실물 도서만', digitalOnly: '전자 도서 가능',
        reserved: '예약',
        fontSize: '글꼴 크기', language: '언어', small: '작게', medium: '보통', large: '크게',
        settingsSaved: '설정이 저장되었습니다!',
        discoverTitle: '다음 위대한 모험을 발견하세요',
        discoverSubtitle: '10,000권 이상의 디지털 및 실물 도서 라이브러리를 검색하고 읽으세요',
        browseCatalog: '카탈로그 보기', recentlyAdded: '최근 추가된', viewAll: '전체 보기',
        totalBooks: '총 도서 수', activeReaders: '활성 독자', overdueLoans: '연체 대출',
        adminRate: '관리 비율', currentLoans: '현재 대출', returnRate: '반납률',
        askAnything: '무엇이든 물어보세요...', aiAssistant: 'AI 어시스턴트',
    }
};
