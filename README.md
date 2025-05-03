# CodeMentor AI

CodeMentor AI is an interactive platform to help students practice Python coding questions with AI-generated hints. It combines a React frontend, a Flask backend, OpenAI API, and MySQL for user and code management.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. 📥 Clone & Install Dependencies

```bash
git clone https://github.com/your-username/code-mentor-ai.git
cd code-mentor-ai
npm install
```
### 2. 🔑 Add Your OpenAI API Key
```bash
# Open the file
nano ./src/data/config.json

# Add your OpenAI key in the format:
# {
#   "apiKey": "your-openai-api-key-here"
# }
```

### 3. ⚙️ Start the Backend Server
```bash
# Navigate to backend folder
cd src/backend

# Open server.py and configure MySQL username and password

# Then run the server
python3 server.py
```

### 4. 🛢️ Set Up MySQL Database
```bash
# Login to MySQL
mysql -u your_username -p
```
```sql
-- Create the database and use it
CREATE DATABASE codementor_ai;
USE codementor_ai;

-- Create users table
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(100),
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  hints_available INT
);

-- Create coding_attempts table
CREATE TABLE coding_attempts (
  user_id VARCHAR(255),
  question_id VARCHAR(255),
  code TEXT
);
```
```bash
# Add your seed data manually if needed
```

### 5. 🖥️ Run the React App
```bash
# From the root directory
npm start
```
