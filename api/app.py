import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from open_ai_helper import get_book_recommendations
from bson import ObjectId
import certifi

# MongoDB connection
client = MongoClient("mongodb+srv://ahanaful11:ahanaf11@leafit.hfttk.mongodb.net/?retryWrites=true&w=majority&appName=LeafIt", tlsCAFile=certifi.where())
db = client.book_app
users_collection = db.users
recommendations_collection = db.recommendations

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the user data model
class UserData(BaseModel):
    genres: list[str] = []
    reading_goal: str = ""
    favorite_authors: list[str] = []
    reading_habits: str = ""

# Define the request model for getting recommendations
class UserRequest(BaseModel):
    user_id: str

@app.get("/")
async def home():
    return {"message": "Welcome to the Book Recommendation API. Use '/save-user' or '/get-recommendations' for operations."}

# Route to save user data (e.g., preferences, profile)
@app.post("/save-user")
async def save_user(user_data: UserData):
    try:
        user_dict = user_data.dict()
        # Log all the data to ensure it's being received properly
        print("Received user data:", user_dict)

        result = users_collection.insert_one(user_dict)
        print("Data inserted into MongoDB with ID:", result.inserted_id)
        return {"message": "User data saved successfully!", "id": str(result.inserted_id)}
    except Exception as e:
        print("Error saving user data:", e)
        raise HTTPException(status_code=500, detail=f"Failed to save user data: {str(e)}")

# Route to get book recommendations based on user preferences
"""@app.post("/get-recommendations")
async def get_recommendations(request: UserRequest):
    try:
        # Fetch user data from MongoDB using the provided user ID
        user = users_collection.find_one({"_id": ObjectId(request.user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found!")

        # Get preferences from the user data and log them
        preferences = {
            "genres": user.get("genres", []),
            "reading_goal": user.get("reading_goal", ""),
            "favorite_authors": user.get("favorite_authors", []),
            "reading_habits": user.get("reading_habits", "")
        }
        print("User preferences:", preferences)  # Log the preferences

        # Get book recommendations using the OpenAI API
        recommendations = get_book_recommendations(preferences)

        # Save the recommendations in MongoDB and log it
        recommendations_collection.insert_one({
            "user_id": request.user_id,
            "recommendations": recommendations
        })
        print("Recommendations saved for user:", request.user_id)

        return {"message": "Recommendations generated and saved!", "recommendations": recommendations}
    except Exception as e:
        print("Error getting recommendations:", e)  # Log the error
        raise HTTPException(status_code=500, detail=f"Failed to get recommendations: {str(e)}")
"""
@app.post("/get-recommendations")
async def get_recommendations(request: UserRequest):
    try:
        # Fetch user data from MongoDB
        user = users_collection.find_one({"_id": ObjectId(request.user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found!")

        # Fetch all fields and log them
        preferences = {
            "genres": user.get("genres", []),
            "reading_goal": user.get("reading_goal", ""),
            "favorite_authors": user.get("favorite_authors", []),
            "reading_habits": user.get("reading_habits", "")
        }
        print("User preferences:", preferences)

        # Get book recommendations based on preferences
        recommendations = get_book_recommendations(preferences)
        print("Recommendations generated:", recommendations)

        # Save recommendations in MongoDB
        recommendations_collection.insert_one({
            "user_id": request.user_id,
            "recommendations": recommendations
        })

        return {"message": "Recommendations generated and saved!", "recommendations": recommendations}
    except Exception as e:
        print("Error fetching recommendations:", e)
        raise HTTPException(status_code=500, detail=f"Failed to get recommendations: {str(e)}")

# Route to test MongoDB connection
@app.get("/test-db")
async def test_db():
    try:
        # Test MongoDB connection
        db_status = db.command("ping")
        return {"message": "MongoDB connected", "status": db_status}
    except Exception as e:
        return {"error": str(e)}

# Main entry point (for running the app using Uvicorn)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", port=8000, reload=True)

