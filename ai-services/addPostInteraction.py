import pandas as pd
from flask import Flask, request, jsonify

csv_file_path = './data/posts_interactions.csv'

def add_post_interaction(data):
    freelancer_address = data.get('freelancer_address', '')
    post_id = data.get('post_id', '')
    browsing_time = data.get('browsing_time', '')

    new_row = {
        'freelancer_address': freelancer_address,
        'post_id': post_id,
        'browsing_time': browsing_time,
    }

    # Append the new row to the CSV file
    with open(csv_file_path, 'a') as f:
        pd.DataFrame([new_row]).to_csv(f, header=False, index=False)

    return jsonify({'message': 'New post interaction was recorded successfully'})
