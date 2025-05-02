from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='myuser',
        password='Pr@tik2305',
        database='coding_app'
    )

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

if __name__ == '__main__':
    app.run(debug=True, port=5001)