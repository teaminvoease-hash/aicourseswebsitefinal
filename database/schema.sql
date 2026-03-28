CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(40) NOT NULL DEFAULT 'super_admin',
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  mobile VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  law_college VARCHAR(200), year_semester VARCHAR(100), city_state VARCHAR(120), profession VARCHAR(50),
  profile_photo VARCHAR(255), status ENUM('active','inactive') DEFAULT 'active',
  email_verified_at DATETIME NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE instructors (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, bio TEXT, profile_image VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL, slug VARCHAR(180) NOT NULL UNIQUE,
  short_description TEXT, full_description LONGTEXT,
  thumbnail VARCHAR(255), banner VARCHAR(255),
  instructor_name VARCHAR(120), duration VARCHAR(80), level VARCHAR(30), category VARCHAR(80),
  price DECIMAL(10,2) NOT NULL DEFAULT 0, discounted_price DECIMAL(10,2) DEFAULT NULL,
  status ENUM('draft','published') DEFAULT 'draft',
  certificate_available TINYINT(1) DEFAULT 1, quiz_enabled TINYINT(1) DEFAULT 1,
  lessons_count INT DEFAULT 0,
  meta_title VARCHAR(180), meta_description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(180) NOT NULL,
  content LONGTEXT,
  video_url VARCHAR(255), material_file VARCHAR(255), assignment_text TEXT,
  sort_order INT DEFAULT 1, duration_minutes INT DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
CREATE TABLE enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL, course_id INT NOT NULL,
  payment_status ENUM('pending','paid') DEFAULT 'pending',
  progress_percent DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_enrollment(student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
CREATE TABLE lesson_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL, course_id INT NOT NULL, lesson_id INT NOT NULL,
  completed_at DATETIME NULL,
  UNIQUE KEY uniq(student_id,lesson_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);
CREATE TABLE coupons (id INT AUTO_INCREMENT PRIMARY KEY, code VARCHAR(40) UNIQUE, discount_type ENUM('flat','percent') DEFAULT 'percent', discount_value DECIMAL(10,2), active TINYINT(1) DEFAULT 1, expires_at DATETIME NULL);
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL, course_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  coupon_id INT NULL,
  status ENUM('created','paid','failed','refunded') DEFAULT 'created',
  razorpay_order_id VARCHAR(80), razorpay_payment_id VARCHAR(80), razorpay_signature VARCHAR(255),
  invoice_number VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id), FOREIGN KEY (course_id) REFERENCES courses(id), FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);
CREATE TABLE quizzes (id INT AUTO_INCREMENT PRIMARY KEY, course_id INT NOT NULL, title VARCHAR(180), passing_marks INT DEFAULT 60, duration_minutes INT DEFAULT 20, retake_limit INT DEFAULT 2, status ENUM('draft','published') DEFAULT 'draft', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE);
CREATE TABLE quiz_questions (id INT AUTO_INCREMENT PRIMARY KEY, quiz_id INT NOT NULL, question TEXT NOT NULL, marks INT DEFAULT 1, sort_order INT DEFAULT 1, FOREIGN KEY(quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE);
CREATE TABLE quiz_options (id INT AUTO_INCREMENT PRIMARY KEY, question_id INT NOT NULL, option_text VARCHAR(255), is_correct TINYINT(1) DEFAULT 0, FOREIGN KEY(question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE);
CREATE TABLE quiz_attempts (id INT AUTO_INCREMENT PRIMARY KEY, quiz_id INT, student_id INT, score DECIMAL(5,2), passed TINYINT(1), answers_json LONGTEXT, attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(quiz_id) REFERENCES quizzes(id), FOREIGN KEY(student_id) REFERENCES students(id));
CREATE TABLE live_classes (id INT AUTO_INCREMENT PRIMARY KEY, course_id INT, title VARCHAR(180), meeting_link VARCHAR(255), start_time DATETIME, end_time DATETIME, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE);
CREATE TABLE certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL, course_id INT NOT NULL,
  verification_id VARCHAR(40) UNIQUE,
  certificate_file VARCHAR(255), issue_date DATE,
  status ENUM('pending','issued') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
);
CREATE TABLE inquiries (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120), email VARCHAR(120), mobile VARCHAR(20), course_interest VARCHAR(150), message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE testimonials (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120), designation VARCHAR(120), content TEXT, rating INT DEFAULT 5, is_active TINYINT(1) DEFAULT 1, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE faqs (id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255), answer TEXT, sort_order INT DEFAULT 1, is_active TINYINT(1) DEFAULT 1, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE banners (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(180), subtitle TEXT, cta_text VARCHAR(60), cta_link VARCHAR(255), is_active TINYINT(1) DEFAULT 1, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE site_settings (id INT AUTO_INCREMENT PRIMARY KEY, setting_key VARCHAR(120) UNIQUE, setting_value TEXT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
CREATE TABLE password_resets (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(120), token VARCHAR(80) UNIQUE, expires_at DATETIME, used_at DATETIME NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

INSERT INTO admins (full_name,email,password_hash,role) VALUES ('Platform Admin','admin@lexaiacademy.in','$2y$10$hM3pbDnR6YulE57DrYzD1uS/p0f3Ycnf0bGb./4VXZ7n9x6iTA5Qm','super_admin');
INSERT INTO students (full_name,email,mobile,password_hash,law_college,year_semester,city_state,profession,status) VALUES ('Priya Sharma','student@lexaiacademy.in','9876543210','$2y$10$hM3pbDnR6YulE57DrYzD1uS/p0f3Ycnf0bGb./4VXZ7n9x6iTA5Qm','NLU Delhi','4th Year','Delhi','Student','active');
INSERT INTO courses (title,slug,short_description,full_description,instructor_name,duration,level,category,price,discounted_price,status,certificate_available,quiz_enabled,meta_title,meta_description) VALUES
('AI Legal Research Bootcamp','ai-legal-research-bootcamp','Master AI workflows for legal research in Indian and comparative law contexts.','Build practical skills with prompts, case-law summarization workflows, citation checking and research validation methods for legal teams.','Adv. Rohan Iyer','6 weeks','Beginner','Legal Research',9999,6999,'published',1,1,'AI Legal Research Course India','Practical AI legal research course for students and associates'),
('AI Drafting for Contracts & Pleadings','ai-drafting-contracts-pleadings','Draft contracts and pleadings faster with responsible AI support.','Covers drafting templates, clause generation, review prompts, risk flags, and ethical review controls for legal documents.','Aditi Menon','8 weeks','Intermediate','Drafting',12999,8999,'published',1,1,'AI Drafting Course for Lawyers','Contract and pleading drafting with AI support'),
('Legal Prompt Engineering & Productivity','legal-prompt-engineering-productivity','Prompt design for legal tasks and daily productivity systems.','Learn role-based prompting, validation checklists, workflow SOPs, and AI use policies for law firms and in-house teams.','Karan Bedi','4 weeks','Beginner','Productivity',7999,4999,'published',1,1,'Prompt Engineering for Legal Teams','Prompting and productivity systems for legal professionals');
INSERT INTO lessons (course_id,title,content,sort_order,duration_minutes) VALUES
(1,'Introduction to AI in legal research','Concepts and responsible usage',1,30),(1,'Prompt patterns for legal issues','Issue extraction and authority search prompts',2,45),
(2,'Contract clause drafting workflows','Drafting and review templates',1,40),(3,'Prompt architecture','Reusable legal prompt libraries',1,35);
INSERT INTO quizzes (course_id,title,passing_marks,duration_minutes,retake_limit,status) VALUES (1,'Research Foundations Quiz',60,20,2,'published');
INSERT INTO quiz_questions (quiz_id,question,marks,sort_order) VALUES (1,'Which prompt pattern best extracts ratio decidendi from a case summary?',1,1);
INSERT INTO quiz_options (question_id,option_text,is_correct) VALUES (1,'Role + facts + issue + jurisdiction + output format',1),(1,'Single-line generic question',0),(1,'No context prompt',0),(1,'Copy-paste case and ask summarize',0);
INSERT INTO enrollments(student_id,course_id,payment_status,progress_percent) VALUES (1,1,'paid',68.00);
INSERT INTO payments(student_id,course_id,amount,status,razorpay_order_id,razorpay_payment_id,invoice_number) VALUES (1,1,6999,'paid','order_seed_001','pay_seed_001','INV-2026-0001');
INSERT INTO certificates(student_id,course_id,verification_id,certificate_file,issue_date,status) VALUES (1,1,'LEXAI-2026-0001','/assets/uploads/certificates/sample-certificate.pdf','2026-02-15','issued');
INSERT INTO faqs(question,answer,sort_order) VALUES
('Are these courses suitable for law students with no technical background?','Yes. The curriculum starts with foundational concepts and practical guided workflows.',1),
('Will I get access to recordings?','Yes, each enrolled learner gets access to session recordings and materials.',2),
('Do certificates represent legal qualification?','No. Certificates indicate course completion and are not legal licenses.',3);
INSERT INTO testimonials(name,designation,content,rating) VALUES
('Aman Verma','Law Associate, Mumbai','The drafting automation module saved me hours each week.',5),
('Neha Kapoor','Final-year Law Student','I used the research prompts during internships and stood out immediately.',5);
INSERT INTO live_classes(course_id,title,meeting_link,start_time,end_time) VALUES (1,'Weekly Case Research Lab','https://meet.example.com/lexai-lab',DATE_ADD(NOW(), INTERVAL 2 DAY),DATE_ADD(NOW(), INTERVAL 2 DAY) + INTERVAL 90 MINUTE);
INSERT INTO site_settings(setting_key,setting_value) VALUES ('site_title','LexAI Academy | AI Courses for Law Professionals'),('site_description','Premium legal-tech courses for law students and legal professionals in India.');
