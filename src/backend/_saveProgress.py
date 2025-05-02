from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='myuser',
        password='Pr@tik2305',
        database='coding_app'
    )

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

if __name__ == '__main__':
    app.run(debug=True, port=5002)  # Adjust the port as necessary