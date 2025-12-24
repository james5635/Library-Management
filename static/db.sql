-- ==========================================
-- 1. CLEANUP (Optional: Drops tables if they exist)
-- ==========================================
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS DigitalAccessLogs, DigitalAssets, Loans, Book_Authors, 
                     Books, Staff, Readers, Author, Category, Publisher;
SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================
-- 2. CORE ENTITIES (Lookup Tables)
-- ==========================================

CREATE TABLE Publishers (
    PublisherID INT PRIMARY KEY AUTO_INCREMENT,
    PublisherName VARCHAR(255) NOT NULL,
    YearOfPublication YEAR
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(100) NOT NULL
);

CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    Biography TEXT
);

-- ==========================================
-- 3. USERS & STAFF
-- ==========================================

CREATE TABLE Readers (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100),
    Email VARCHAR(255) UNIQUE,
    PhoneNumber VARCHAR(20),
    Address TEXT,
    JoinDate DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Staffs (
    StaffID INT PRIMARY KEY AUTO_INCREMENT,
    StaffName VARCHAR(255) NOT NULL,
    LoginID VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL, -- In production, use HASHED passwords
    CanManageDigital BOOLEAN DEFAULT FALSE
);

-- ==========================================
-- 4. THE BOOK SYSTEM
-- ==========================================

CREATE TABLE Books (
    ISBN VARCHAR(20) PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Edition VARCHAR(50),
    Price DECIMAL(10, 2),
    BookType ENUM('Physical', 'Digital', 'Both') DEFAULT 'Physical',
    PublisherID INT,
    CategoryID INT,
    FOREIGN KEY (PublisherID) REFERENCES Publisher(PublisherID),
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);

-- Many-to-Many Bridge for Authors
CREATE TABLE Book_Authors (
    ISBN VARCHAR(20),
    AuthorID INT,
    PRIMARY KEY (ISBN, AuthorID),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN) ON DELETE CASCADE,
    FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID) ON DELETE CASCADE
);

-- ==========================================
-- 5. PHYSICAL LIBRARY (Loans)
-- ==========================================

CREATE TABLE Loans (
    LoanID INT PRIMARY KEY AUTO_INCREMENT,
    ISBN VARCHAR(20) NOT NULL,
    UserID INT NOT NULL,
    StaffID INT NOT NULL,
    IssueDate DATE NOT NULL,
    DueDate DATE NOT NULL,
    ReturnDate DATE, 
    Status ENUM('Borrowed', 'Returned', 'Overdue') DEFAULT 'Borrowed',
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (UserID) REFERENCES Readers(UserID),
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);

-- ==========================================
-- 6. E-LIBRARY (Digital Assets)
-- ==========================================

CREATE TABLE DigitalAssets (
    AssetID INT PRIMARY KEY AUTO_INCREMENT,
    ISBN VARCHAR(20) NOT NULL,
    FileFormat ENUM('PDF', 'EPUB', 'MOBI', 'MP3') NOT NULL,
    FileSizeMB DECIMAL(10, 2),
    DownloadURL VARCHAR(512),
    AccessLevel ENUM('Free', 'MemberOnly', 'Premium') DEFAULT 'MemberOnly',
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN) ON DELETE CASCADE
);

CREATE TABLE DigitalAccessLogs (
    AccessID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    AssetID INT NOT NULL,
    AccessTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IPAddress VARCHAR(45),
    FOREIGN KEY (UserID) REFERENCES Readers(UserID),
    FOREIGN KEY (AssetID) REFERENCES DigitalAssets(AssetID)
);