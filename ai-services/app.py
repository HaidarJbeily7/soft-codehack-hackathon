from flask import Flask, request, jsonify
from utils.addPost import add_post
from utils.addFreelancer import add_freelancer
from utils.addPostInteraction import add_post_interaction
from utils.inferTags import infer_tags
from utils.recommendPosts import recommend_posts
import nltk

app = Flask(__name__)

@app.route('/add_post', methods=['POST'])
def add_post_route():
    return jsonify(add_post(data=request.get_json()))

@app.route('/add_freelancer', methods=['POST'])
def add_freelancer_route():
    return jsonify(add_freelancer(data=request.get_json()))

@app.route('/add_post_interaction', methods=['POST'])
def add_post_interaction_route():
    return jsonify(add_post_interaction(data=request.get_json()))

@app.route('/infer_tags', methods=['GET'])
def infer_tags_route():
    return jsonify(infer_tags(data=request.get_json()))

@app.route('/recommend_posts', methods=['GET'])
def recommend_posts_route():
    return jsonify(recommend_posts(data=request.get_json()))

if __name__ == '__main__':
    nltk.download('stopwords', quiet=True)
    app.run(debug=True)
