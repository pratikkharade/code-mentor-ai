from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import mysql.connector
# from datetime import datetime

app = Flask(__name__)
CORS(app)

####################################################################################################################################

# Run python code

@app.route('/run_code', methods=['POST'])
def run_code():
    code = request.json.get('code')

    if not code:
        return jsonify({'error': 'No code provided'}), 400

    try:
        result = subprocess.run(['python3', '-c', code], text=True, capture_output=True, check=True)
        return jsonify({'output': result.stdout, 'error': None}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({'output': e.stdout, 'error': e.stderr}), 400

####################################################################################################################################

# MySQL Database connection details

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='myuser',
        password='use-your-password-here',
        database='use-your-database-name-here'
    )

####################################################################################################################################

# Code for creating a new user

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    hints_available = data.get('hints_available')

    conn = get_db_connection()
    cursor = conn.cursor()

    # Query to check if the user exists
    cursor.execute("SELECT user_id, password_hash FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user:
        return jsonify({'message': 'Email already in use! Try logging in or use a different email'}), 401
    else:
        cursor.execute("INSERT into users (username, email, password_hash, hints_available) VALUES(%s, %s, %s, %s)", (username, email, password, hints_available))
        if cursor.rowcount > 0:
            conn.commit()
            return jsonify({'message': 'User created successfully! Try logging in.'}), 200
        else:
            return jsonify({'message': 'User created failed! Try again later.'}), 401
    cursor.close()
    conn.close()

####################################################################################################################################

# Code for user login

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Establish database connection
    conn = get_db_connection()
    cursor = conn.cursor()

    # Query to check if the user exists
    cursor.execute("SELECT user_id, password_hash FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user:
        stored_password = user[1]  # This should be the hashed password in a real case
        if stored_password == password:  # In a real app, you would hash the input password and compare it
            return jsonify({'message': 'Login successful!', 'user_id': user[0]}), 200
        else:
            return jsonify({'message': 'Invalid password!'}), 401
    else:
        return jsonify({'message': 'User does not exist!'}), 404

    cursor.close()
    conn.close()

####################################################################################################################################

# Code for fetching saved progress

@app.route('/fetch_saved_progress', methods=['POST'])
def fetch_saved_progress():
    data = request.get_json()
    username = data.get('username')

    # Establish database connection
    conn = get_db_connection()
    cursor = conn.cursor()

    # Query to check if the user exists
    cursor.execute("SELECT question_id, code FROM coding_attempts WHERE user_id = %s", (username,))
    saved_data = cursor.fetchall()

    if saved_data:
        # Convert the result to a list of dictionaries for easier JSON serialization
        progress = {}
        for row in saved_data:
            progress[row[0]] = row[1]
        
        return jsonify({
            'message': 'Saved data fetch successful!',
            'progress': progress
        }), 200
    else:
        return jsonify({
            'message': 'No saved progress found for this user!',
            'progress': {}
        }), 200
    cursor.close()
    conn.close()

####################################################################################################################################

# Code to save progress in MySQL Database

@app.route('/save_progress', methods=['POST'])
def save_progress():
    data = request.get_json()
    user_id = data.get('user_id')  # Get user_id from request
    question_id = data.get('question_id')  # Get question_id from request
    code = data.get('code')  # Get the user's code

    # Establish database connection
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if the attempt already exists
    try:
        cursor.execute("""
            SELECT COUNT(*) FROM coding_attempts 
            WHERE user_id = %s AND question_id = %s
        """, (user_id, question_id))
        
        exists = cursor.fetchone()[0] > 0

        if exists:
            # Update the existing record
            cursor.execute("""
                UPDATE coding_attempts 
                SET code = %s
                WHERE user_id = %s AND question_id = %s
            """, (code, user_id, question_id))
            message = 'Attempt updated successfully!'
        else:
            # Insert new attempt
            cursor.execute("""
                INSERT INTO coding_attempts (user_id, question_id, code) 
                VALUES (%s, %s, %s)
            """, (user_id, question_id, code))
            message = 'Attempt saved successfully!'

        conn.commit()  # Commit the transaction
        return jsonify({'message': message}), 201
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'message': 'Failed to save attempt!'}), 500
    finally:
        cursor.close()
        conn.close()

####################################################################################################################################

# Code to fetch data (stored progress) from MySQL Database

if __name__ == '__main__':
    app.run(debug=True)
