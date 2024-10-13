import openai
import os
from dotenv import load_dotenv

load_dotenv()

# Load OpenAI API key (you can also use dotenv here if needed)
openai.api_key = "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"

def get_book_recommendations(preferences):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a book recommendation assistant. Based on user preferences, interests, and reading goals, suggest books that are relevant."
            },
            {
                "role": "user",
                "content": f"""
                The following are the user's preferences:
                - Favorite genres: {', '.join(preferences['genres'])}
                - Reading goals: {preferences['reading_goal']}
                - Favorite authors: {', '.join(preferences.get('favorite_authors', []))}
                - Reading habits: {preferences['reading_habits']}
                
                Based on these preferences, recommend 5 books, providing a brief summary for each, and explain why each book is a good match.
                """
            }
        ]
    )

    recommendations = response.choices[0].message['content']
    return recommendations
