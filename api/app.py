import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from open_ai_helper import get_book_recommendations
from bson import ObjectId
import certifi

# Load environment variables from .env file
load_dotenv()

# MongoDB connection
client = MongoClient("mongodb+srv://ahanaful11:ahanaf11@leafit.hfttk.mongodb.net/?retryWrites=true&w=majority&appName=LeafIt", tlsCAFile=certifi.where())
db = client.book_app
users_collection = db.users
recommendations_collection = db.recommendations

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Book Recommendation API. Use '/save-user' or '/get-recommendations' for operations."

# Route to save user data (e.g., preferences, profile)
@app.route('/save-user', methods=['POST'])
def save_user():
    try:
        user_data = request.json  # Assuming user data is sent in JSON format
        if not user_data:
            return jsonify({"error": "No data provided"}), 400

        # Remove '_id' if it's in the user_data, let MongoDB create it
        user_data.pop('_id', None)

        result = users_collection.insert_one(user_data)
        return jsonify({"message": "User data saved successfully!", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to get book recommendations based on user preferences
@app.route('/get-recommendations', methods=['POST'])
def get_recommendations():
    try:
        user_data = request.json  # Assuming this contains user preferences
        if not user_data or 'user_id' not in user_data:
            return jsonify({"error": "User ID is required"}), 400

        user_id = user_data["user_id"]

        # Fetch the user preferences from MongoDB
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"message": "User not found!"}), 404

        # Get preferences from the user data
        preferences = {
            "genres": user.get("genres", []),
            "reading_goal": user.get("reading_goal", ""),
            "favorite_authors": user.get("favorite_authors", []),
            "reading_habits": user.get("reading_habits", "")
        }

        # Get recommendations using the OpenAI API
        recommendations = get_book_recommendations(preferences)

        # Save recommendations in MongoDB
        recommendations_collection.insert_one({
            "user_id": user_id,
            "recommendations": recommendations
        })

        return jsonify({"message": "Recommendations generated and saved!", "recommendations": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Main entry point
if __name__ == "__main__":
    app.run(debug=True)