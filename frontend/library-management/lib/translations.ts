export type Language = 'en' | 'km' | 'ja';

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

    // Common
    search: string;
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    close: string;

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
}

export const translations: Record<Language, Translations> = {
    en: {
        // Navigation
        dashboard: 'Dashboard',
        books: 'Books',
        librarian: 'Librarian',
        chatbot: 'Chatbot',
        bookmark: 'Bookmark',
        settings: 'Settings',
        help: 'Help',

        // Management
        bookManagement: 'Book Management',
        member: 'Member',
        loan: 'Loan',
        fine: 'Fine',
        report: 'Report',
        addBook: 'Add Book',
        addMember: 'Add Member',

        // Common
        search: 'Search Book',
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        close: 'Close',

        // Settings
        fontSize: 'Font Size',
        language: 'Language',
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        settingsSaved: 'Settings saved!',

        // Dashboard
        discoverTitle: 'Discover Your Next Great Adventure',
        discoverSubtitle: 'Search and track through our extensive library of over 10,000 digital and physical books',
        browseCatalog: 'Browse Catalog',
        recentlyAdded: 'Recently Added',
        viewAll: 'View all',
        totalBooks: 'Total Books',
        activeReaders: 'Active Readers',
        overdueLoans: 'Overdue Loans',
        adminRate: 'Admin Rate'
    },
    km: {
        // Navigation (Khmer)
        dashboard: 'ផ្ទាំងគ្រប់គ្រង',
        books: 'សៀវភៅ',
        librarian: 'បណ្ណារក្ស',
        chatbot: 'ជំនួយការ',
        bookmark: 'ចំណាំ',
        settings: 'ការកំណត់',
        help: 'ជំនួយ',

        // Management
        bookManagement: 'គ្រប់គ្រងសៀវភៅ',
        member: 'សមាជិក',
        loan: 'ការខ្ចី',
        fine: 'ពិន័យ',
        report: 'របាយការណ៍',
        addBook: 'បន្ថែមសៀវភៅ',
        addMember: 'បន្ថែមសមាជិក',

        // Common
        search: 'ស្វែងរកសៀវភៅ',
        save: 'រក្សាទុក',
        cancel: 'បោះបង់',
        edit: 'កែសម្រួល',
        delete: 'លុប',
        close: 'បិទ',

        // Settings
        fontSize: 'ទំហំអក្សរ',
        language: 'ភាសា',
        small: 'តូច',
        medium: 'មធ្យម',
        large: 'ធំ',
        settingsSaved: 'បានរក្សាទុកការកំណត់!',

        // Dashboard
        discoverTitle: 'រកឃើញការផ្សងព្រេងដ៏អស្ចារ្យបន្ទាប់របស់អ្នក',
        discoverSubtitle: 'ស្វែងរក និងតាមដានតាមរយៈបណ្ណាល័យដ៏ធំទូលាយរបស់យើងនៃសៀវភៅឌីជីថល និងរូបវន្តជាង 10,000',
        browseCatalog: 'រកមើលកាតាឡុក',
        recentlyAdded: 'បានបន្ថែមថ្មីៗ',
        viewAll: 'មើលទាំងអស់',
        totalBooks: 'សៀវភៅសរុប',
        activeReaders: 'អ្នកអានសកម្ម',
        overdueLoans: 'ការខ្ចីហួសកំណត់',
        adminRate: 'អត្រាគ្រប់គ្រង'
    },
    ja: {
        // Navigation (Japanese)
        dashboard: 'ダッシュボード',
        books: '本',
        librarian: '司書',
        chatbot: 'チャットボット',
        bookmark: 'ブックマーク',
        settings: '設定',
        help: 'ヘルプ',

        // Management
        bookManagement: '本の管理',
        member: 'メンバー',
        loan: '貸出',
        fine: '罰金',
        report: 'レポート',
        addBook: '本を追加',
        addMember: 'メンバーを追加',

        // Common
        search: '本を検索',
        save: '保存',
        cancel: 'キャンセル',
        edit: '編集',
        delete: '削除',
        close: '閉じる',

        // Settings
        fontSize: 'フォントサイズ',
        language: '言語',
        small: '小',
        medium: '中',
        large: '大',
        settingsSaved: '設定を保存しました！',

        // Dashboard
        discoverTitle: '次の素晴らしい冒険を発見',
        discoverSubtitle: '10,000冊以上のデジタルおよび物理的な本の広範なライブラリを検索して追跡',
        browseCatalog: 'カタログを閲覧',
        recentlyAdded: '最近追加された',
        viewAll: 'すべて表示',
        totalBooks: '総書籍数',
        activeReaders: 'アクティブな読者',
        overdueLoans: '延滞貸出',
        adminRate: '管理率'
    }
};
