package com.souchanrojame.librarymanagement.config;

import com.souchanrojame.librarymanagement.model.*;
import com.souchanrojame.librarymanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    private final StaffRepository staffRepository;
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;
    private final PublisherRepository publisherRepository;
    private final ReaderRepository readerRepository;
    private final LoanRepository loanRepository;
    private final DigitalAssetRepository digitalAssetRepository;

    @Override
    public void run(String... args) {
        if (staffRepository.count() > 0) return;

        // --- Staff Accounts ---
        staffRepository.save(Staff.builder()
                .staffName("Admin User").loginId("admin").password("admin123")
                .email("admin@library.com").role(Staff.StaffRole.ADMIN).canManageDigital(true).build());
        staffRepository.save(Staff.builder()
                .staffName("Jane Librarian").loginId("librarian").password("lib123")
                .email("jane@library.com").role(Staff.StaffRole.LIBRARIAN).canManageDigital(true).build());
        staffRepository.save(Staff.builder()
                .staffName("Sou Chanrojame").loginId("jame").password("jame123")
                .email("chanrojame@example.com").role(Staff.StaffRole.BORROWER).canManageDigital(false).build());
        staffRepository.save(Staff.builder()
                .staffName("Student Demo").loginId("student").password("student123")
                .email("student@example.com").role(Staff.StaffRole.BORROWER).canManageDigital(false).build());

        // --- Categories ---
        Category catCS = categoryRepository.save(Category.builder().categoryName("Computer Science").build());
        Category catMath = categoryRepository.save(Category.builder().categoryName("Mathematics").build());
        Category catLit = categoryRepository.save(Category.builder().categoryName("Literature").build());
        Category catSci = categoryRepository.save(Category.builder().categoryName("Science").build());
        Category catHist = categoryRepository.save(Category.builder().categoryName("History").build());
        Category catBiz = categoryRepository.save(Category.builder().categoryName("Business").build());
        Category catPhil = categoryRepository.save(Category.builder().categoryName("Philosophy").build());
        Category catArt = categoryRepository.save(Category.builder().categoryName("Art & Design").build());

        // --- Publishers ---
        Publisher pubOReilly = publisherRepository.save(Publisher.builder().publisherName("O'Reilly Media").build());
        Publisher pubPearson = publisherRepository.save(Publisher.builder().publisherName("Pearson Education").build());
        Publisher pubPenguin = publisherRepository.save(Publisher.builder().publisherName("Penguin Books").build());
        Publisher pubHarper = publisherRepository.save(Publisher.builder().publisherName("HarperCollins").build());
        Publisher pubMcGraw = publisherRepository.save(Publisher.builder().publisherName("McGraw-Hill").build());

        // --- Authors ---
        Author aMartin = authorRepository.save(Author.builder().firstName("Robert").lastName("Martin").biography("Author of Clean Code and Clean Architecture.").build());
        Author aKnuth = authorRepository.save(Author.builder().firstName("Donald").lastName("Knuth").biography("Renowned computer scientist, creator of TeX.").build());
        Author aCormen = authorRepository.save(Author.builder().firstName("Thomas").lastName("Cormen").biography("Professor of computer science at Dartmouth.").build());
        Author aGamma = authorRepository.save(Author.builder().firstName("Erich").lastName("Gamma").biography("Co-author of Design Patterns.").build());
        Author aOrwell = authorRepository.save(Author.builder().firstName("George").lastName("Orwell").biography("English novelist best known for 1984 and Animal Farm.").build());
        Author aHawking = authorRepository.save(Author.builder().firstName("Stephen").lastName("Hawking").biography("Theoretical physicist and cosmologist.").build());
        Author aHarari = authorRepository.save(Author.builder().firstName("Yuval Noah").lastName("Harari").biography("Israeli historian and professor.").build());
        Author aDrake = authorRepository.save(Author.builder().firstName("Peter").lastName("Drake").biography("Professor of computer science.").build());
        Author aBloch = authorRepository.save(Author.builder().firstName("Joshua").lastName("Bloch").biography("Author of Effective Java.").build());
        Author aGoleman = authorRepository.save(Author.builder().firstName("Daniel").lastName("Goleman").biography("Psychologist and science journalist.").build());

        // --- Books ---
        bookRepository.save(Book.builder().isbn("978-0132350884").title("Clean Code")
                .description("A handbook of agile software craftsmanship. Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way. Robert C. Martin presents a revolutionary paradigm with Clean Code.")
                .edition("1st").price(BigDecimal.valueOf(39.99)).bookType(Book.BookType.BOTH)
                .status(Book.BookStatus.AVAILABLE).totalCopies(5).availableCopies(4)
                .publisher(pubPearson).category(catCS).authors(Set.of(aMartin))
                .coverImage("/static/covers/clean-code.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0201633610").title("Design Patterns")
                .description("Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems. These 23 patterns allow designers to create more flexible, elegant, and ultimately reusable designs.")
                .edition("1st").price(BigDecimal.valueOf(49.99)).bookType(Book.BookType.PHYSICAL)
                .status(Book.BookStatus.AVAILABLE).totalCopies(3).availableCopies(3)
                .publisher(pubPearson).category(catCS).authors(Set.of(aGamma))
                .coverImage("/static/covers/design-patterns.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0262033848").title("Introduction to Algorithms")
                .description("Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth.")
                .edition("3rd").price(BigDecimal.valueOf(79.99)).bookType(Book.BookType.BOTH)
                .status(Book.BookStatus.AVAILABLE).totalCopies(4).availableCopies(4)
                .publisher(pubMcGraw).category(catCS).authors(Set.of(aCormen))
                .coverImage("/static/covers/intro-algorithms.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0201896831").title("The Art of Computer Programming")
                .description("The Art of Computer Programming is a comprehensive monograph written by Donald Knuth. It is the single greatest piece of work in computer science.")
                .edition("4th").price(BigDecimal.valueOf(89.99)).bookType(Book.BookType.PHYSICAL)
                .status(Book.BookStatus.AVAILABLE).totalCopies(2).availableCopies(2)
                .publisher(pubPearson).category(catCS).authors(Set.of(aKnuth))
                .coverImage("/static/covers/art-programming.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0451524935").title("1984")
                .description("Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its dystopian purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmarish vision of a totalitarian, bureaucratic world.")
                .edition("Anniversary").price(BigDecimal.valueOf(12.99)).bookType(Book.BookType.BOTH)
                .status(Book.BookStatus.AVAILABLE).totalCopies(10).availableCopies(8)
                .publisher(pubPenguin).category(catLit).authors(Set.of(aOrwell))
                .coverImage("/static/covers/1984.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0553380163").title("A Brief History of Time")
                .description("A landmark volume in science writing by one of the great minds of our time, Stephen Hawking's book explores such profound questions as: How did the universe begin—and what made its start possible?")
                .edition("Updated").price(BigDecimal.valueOf(18.99)).bookType(Book.BookType.DIGITAL)
                .status(Book.BookStatus.AVAILABLE).totalCopies(6).availableCopies(6)
                .publisher(pubPenguin).category(catSci).authors(Set.of(aHawking))
                .coverImage("/static/covers/brief-history.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0062316110").title("Sapiens: A Brief History of Humankind")
                .description("100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens. How did our species succeed in the battle for dominance? Yuval Noah Harari explores the ways in which biology and history have defined us.")
                .edition("1st").price(BigDecimal.valueOf(22.99)).bookType(Book.BookType.BOTH)
                .status(Book.BookStatus.BORROWED).totalCopies(7).availableCopies(5)
                .publisher(pubHarper).category(catHist).authors(Set.of(aHarari))
                .coverImage("/static/covers/sapiens.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0134685991").title("Effective Java")
                .description("The definitive guide to Java best practices from the acknowledged master of the craft. Updated for Java 7, 8, and 9, this book explores new design patterns and language idioms.")
                .edition("3rd").price(BigDecimal.valueOf(44.99)).bookType(Book.BookType.BOTH)
                .status(Book.BookStatus.AVAILABLE).totalCopies(4).availableCopies(3)
                .publisher(pubPearson).category(catCS).authors(Set.of(aBloch))
                .coverImage("/static/covers/effective-java.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0553383043").title("A Short History of Nearly Everything")
                .description("Bill Bryson describes himself as a reluctant traveler, but even when he stays home he can't contain his curiosity about the world around him. This book is his quest to understand everything that has happened from the Big Bang to the rise of civilization.")
                .edition("1st").price(BigDecimal.valueOf(16.99)).bookType(Book.BookType.PHYSICAL)
                .status(Book.BookStatus.AVAILABLE).totalCopies(3).availableCopies(3)
                .publisher(pubPenguin).category(catSci).authors(Set.of(aHawking))
                .coverImage("/static/covers/short-history.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0553418026").title("Homo Deus: A Brief History of Tomorrow")
                .description("Yuval Noah Harari envisions a near future in which we face a new set of challenges. Homo Deus explores the projects, dreams and nightmares that will shape the twenty-first century.")
                .edition("1st").price(BigDecimal.valueOf(24.99)).bookType(Book.BookType.DIGITAL)
                .status(Book.BookStatus.AVAILABLE).totalCopies(5).availableCopies(5)
                .publisher(pubHarper).category(catHist).authors(Set.of(aHarari))
                .coverImage("/static/covers/homo-deus.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0596007126").title("Head First Design Patterns")
                .description("Learning a complex new language is no easy task, especially when it's an object-oriented computer programming language like Java. You might think the problem is your brain.")
                .edition("2nd").price(BigDecimal.valueOf(49.99)).bookType(Book.BookType.BOTH)
                .status(Book.BookStatus.AVAILABLE).totalCopies(4).availableCopies(4)
                .publisher(pubOReilly).category(catCS).authors(Set.of(aDrake))
                .coverImage("/static/covers/head-first.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0061120084").title("Emotional Intelligence")
                .description("Daniel Goleman's brilliant report from the frontiers of psychology and neuroscience offers startling new insight into our 'two minds' — the rational and the emotional.")
                .edition("10th Anniversary").price(BigDecimal.valueOf(15.99)).bookType(Book.BookType.BOTH)
                .status(Book.BookStatus.RESERVED).totalCopies(3).availableCopies(1)
                .publisher(pubHarper).category(catPhil).authors(Set.of(aGoleman))
                .coverImage("/static/covers/emotional-intelligence.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0452284234").title("Animal Farm")
                .description("George Orwell's timeless and timely allegorical novel — a scathing satire on a downtrodden society's blind march towards totalitarianism.")
                .edition("Centennial").price(BigDecimal.valueOf(9.99)).bookType(Book.BookType.BOTH)
                .status(Book.BookStatus.AVAILABLE).totalCopies(8).availableCopies(7)
                .publisher(pubPenguin).category(catLit).authors(Set.of(aOrwell))
                .coverImage("/static/covers/animal-farm.jpg").build());

        bookRepository.save(Book.builder().isbn("978-0071508728").title("Principles of Corporate Finance")
                .description("This textbook is a comprehensive introduction to the theory and practice of corporate finance, providing a broad perspective on key concepts.")
                .edition("12th").price(BigDecimal.valueOf(69.99)).bookType(Book.BookType.PHYSICAL)
                .status(Book.BookStatus.AVAILABLE).totalCopies(3).availableCopies(3)
                .publisher(pubMcGraw).category(catBiz).authors(Set.of(aDrake))
                .coverImage("/static/covers/corp-finance.jpg").build());

        bookRepository.save(Book.builder().isbn("978-1491950357").title("JavaScript: The Good Parts")
                .description("Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined.")
                .edition("1st").price(BigDecimal.valueOf(29.99)).bookType(Book.BookType.DIGITAL)
                .status(Book.BookStatus.AVAILABLE).totalCopies(6).availableCopies(6)
                .publisher(pubOReilly).category(catCS).authors(Set.of(aDrake))
                .coverImage("/static/covers/js-good-parts.jpg").build());

        // --- Readers ---
        Reader reader1 = readerRepository.save(Reader.builder()
                .firstName("Sou").lastName("Chanrojame").email("chanrojame@example.com")
                .phoneNumber("+855 12 345 678").address("Phnom Penh, Cambodia")
                .joinDate(LocalDate.now().minusMonths(3)).build());
        Reader reader2 = readerRepository.save(Reader.builder()
                .firstName("Sokha").lastName("Chheng").email("sokha@example.com")
                .phoneNumber("+855 77 890 123").address("Siem Reap, Cambodia")
                .joinDate(LocalDate.now().minusMonths(2)).build());
        Reader reader3 = readerRepository.save(Reader.builder()
                .firstName("Dara").lastName("Pich").email("dara@example.com")
                .phoneNumber("+855 96 456 789").address("Battambang, Cambodia")
                .joinDate(LocalDate.now().minusMonths(1)).build());
        Reader reader4 = readerRepository.save(Reader.builder()
                .firstName("Mary").lastName("Johnson").email("mary@example.com")
                .phoneNumber("+1 555 123 456").address("New York, US")
                .joinDate(LocalDate.now().minusWeeks(2)).build());

        // --- Loans ---
        loanRepository.save(Loan.builder()
                .book(bookRepository.findById("978-0062316110").orElse(null))
                .reader(reader1).issueDate(LocalDate.now().minusDays(10))
                .dueDate(LocalDate.now().plusDays(4))
                .status(Loan.LoanStatus.BORROWED).build());
        loanRepository.save(Loan.builder()
                .book(bookRepository.findById("978-0451524935").orElse(null))
                .reader(reader2).issueDate(LocalDate.now().minusDays(15))
                .dueDate(LocalDate.now().minusDays(1))
                .status(Loan.LoanStatus.BORROWED).build());
        loanRepository.save(Loan.builder()
                .book(bookRepository.findById("978-0134685991").orElse(null))
                .reader(reader3).issueDate(LocalDate.now().minusDays(20))
                .dueDate(LocalDate.now().minusDays(6))
                .returnDate(LocalDate.now().minusDays(5))
                .status(Loan.LoanStatus.RETURNED).build());
        loanRepository.save(Loan.builder()
                .book(bookRepository.findById("978-0132350884").orElse(null))
                .reader(reader4).issueDate(LocalDate.now().minusDays(5))
                .dueDate(LocalDate.now().plusDays(9))
                .status(Loan.LoanStatus.BORROWED).build());

        // --- Digital Assets ---
        digitalAssetRepository.save(DigitalAsset.builder()
                .book(bookRepository.findById("978-0553380163").orElse(null))
                .fileFormat(DigitalAsset.FileFormat.PDF)
                .fileSizeMB(BigDecimal.valueOf(12.5))
                .accessLevel(DigitalAsset.AccessLevel.PUBLIC).build());
        digitalAssetRepository.save(DigitalAsset.builder()
                .book(bookRepository.findById("978-0132350884").orElse(null))
                .fileFormat(DigitalAsset.FileFormat.PDF)
                .fileSizeMB(BigDecimal.valueOf(8.2))
                .accessLevel(DigitalAsset.AccessLevel.PUBLIC).build());
        digitalAssetRepository.save(DigitalAsset.builder()
                .book(bookRepository.findById("978-0553418026").orElse(null))
                .fileFormat(DigitalAsset.FileFormat.EPUB)
                .fileSizeMB(BigDecimal.valueOf(5.1))
                .accessLevel(DigitalAsset.AccessLevel.PUBLIC).build());

        System.out.println("✅ Demo data loaded: " + bookRepository.count() + " books, " + 
                            staffRepository.count() + " staff, " + readerRepository.count() + " readers");
    }
}
