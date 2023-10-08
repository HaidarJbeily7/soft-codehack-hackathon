import pandas as pd
from flask import Flask, request, jsonify

csv_file_path = './data/posts.csv'

def add_post(data):
 
    post_id = data.get('post_id', '')
    title = data.get('title', '')
    post_description = data.get('post_description', '')
    post_tags = data.get('post_tags', '')
    post_publishing_date = data.get('post_publishing_date', '')

    new_post = {
        'post_id': post_id,
        'title': title,
        'post_description': post_description,
        'post_tags': post_tags,
        'post_publishing_date': post_publishing_date,
    }

    # Append the new row to the CSV file
    with open(csv_file_path, 'a') as f:
        pd.DataFrame([new_post]).to_csv(f, header=False, index=False)

    return jsonify({'message': 'New post added successfully'})
