import openai
import os
from dotenv import load_dotenv

load_dotenv()

# Load OpenAI API key (you can also use dotenv here if needed)
openai.api_key = os.getenv("OPENAI_KEY")
def get_book_recommendations(preferences):
    try:
        # Create the chat completion request with GPT-3.5-turbo
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful book recommendation assistant. Based on user preferences, reading goals, and interests, recommend relevant books."
                },
                {
                    "role": "user",
                    "content": f"""
                    The following are the user's preferences:
                    - Favorite genres: {', '.join(preferences['genres']) if preferences['genres'] else 'Not specified'}
                    - Reading goals: {preferences['reading_goal'] if preferences['reading_goal'] else 'Not specified'}
                    - Reading habits: {preferences['reading_habits'] if preferences['reading_habits'] else 'Not specified'}

                    Recommend 5 books based on these preferences. Provide a brief summary of each book and explain why it’s a good match.
                    """
                }
            ]
        )

        # Extract and return the book recommendations from the response
        recommendations = response.choices[0].message['content']
        return recommendations

    except Exception as e:
        # Add error handling in case of API failure
        print(f"Error calling OpenAI API: {e}")
        return "Error fetching recommendations, please try again later."
    



    
    """response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a book recommendation assistant. Based on user preferences, interests, and reading goals, suggest books that are relevant."
            },
            {
                "role": "user",
                "content": """f"""
                The following are the user's preferences:
                - Favorite genres: {', '.join(preferences['genres'])}
                - Reading goals: {preferences['reading_goal']}
                - Reading habits: {preferences['reading_habits']}
                
                Based on these preferences, recommend 5 books, providing a brief summary for each, and explain why each book is a good match.
                """
    """)

    recommendations = response.choices[0].message['content']
    return recommendations
# - Favorite authors: {', '.join(preferences.get('favorite_authors', []))}"""
