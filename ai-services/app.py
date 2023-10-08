from flask import Flask, request
from inferTags import infer_tags
from addPostInteraction import add_post_interaction
from addPost import add_post
import nltk

app = Flask(__name__)

@app.route('/infer_tags', methods=['POST'])
def infer_tags_route():
    data = request.get_json()
    return infer_tags(data, max_tags=5)

@app.route('/add_post', methods=['POST'])
def add_post_route():
    data = request.get_json()
    return add_post(data)

@app.route('/add_post_interaction', methods=['POST'])
def add_post_interaction_route():
    data = request.get_json()
    return add_post_interaction(data)

if __name__ == '__main__':
    nltk.download('stopwords', quiet=True)
    app.run(debug=True)
