import mysql.connector

# Establish a connection to the MySQL database
conn = mysql.connector.connect(
    host="localhost",
    user="myuser",
    password="mypassword",
    database="coding_db"
)

cursor = conn.cursor()

# Function to fetch user coding attempts
def fetch_user_attempts(user_id):
    cursor.execute("SELECT question_id, code FROM coding_attempts WHERE user_id = %s", (user_id,))
    attempts = cursor.fetchall()
    return attempts

# Function to save a new coding attempt
def save_coding_attempt(user_id, question_id, code):
    cursor.execute('''
        INSERT INTO coding_attempts (user_id, question_id, code)
        VALUES (%s, %s, %s)
        ON DUPLICATE KEY UPDATE code = %s
    ''', (user_id, question_id, code, code))
    conn.commit()

# Fetch user coding history
user_attempts = fetch_user_attempts(1)
print("User Attempts:", user_attempts)

# Save a coding attempt
save_coding_attempt(1, 101, "print('Hello World')")
print("Coding attempt saved successfully.")

# Close the connection
cursor.close()
conn.close()