import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def recommend_posts(data, n_posts=5):
    freelancers_csv_path = './data/freelancers.csv'
    posts_csv_path = './data/posts.csv'
    posts_interactions_csv_path = './data/posts_interactions.csv'

    freelancer_address = data.get('freelancer_address')

    freelancers_df = pd.read_csv(freelancers_csv_path)
    posts_df = pd.read_csv(posts_csv_path)
    posts_interactions_df = pd.read_csv(posts_interactions_csv_path)

    merged_df = pd.merge(posts_interactions_df, freelancers_df, on='freelancer_address', how='inner')
    merged_df = pd.merge(merged_df, posts_df[['post_id', 'post_tags']], on='post_id', how='inner')

    # Combine post tags and freelancer skillset for each interaction
    merged_df['combined_features'] = merged_df['post_tags'] + ', ' + merged_df['freelancer_skillset']

    # Initialize TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer()

    # Fit and transform the combined features
    tfidf_matrix = tfidf_vectorizer.fit_transform(merged_df['combined_features'])

    merged_df.drop(columns=['combined_features'])

    # Compute cosine similarity between the TF-IDF matrix rows
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    def get_top_n_post_ids_recommendations(freelancer_address, cosine_sim_matrix, n=n_posts):
        # Get the index of the freelancer's interactions in the cosine similarity matrix
        freelancer_index = merged_df[merged_df['freelancer_address'] == freelancer_address].index[0]

        # Get the similarity scores for this freelancer with all other freelancers
        similarity_scores = cosine_sim_matrix[freelancer_index]

        # Get the indices of posts sorted by similarity scores (in descending order)
        similar_posts_indices = np.argsort(similarity_scores)[::-1]

        # Exclude posts the freelancer has already interacted with
        already_interacted_posts = merged_df[merged_df['freelancer_address'] == freelancer_address]['post_id'].values
        top_n_recommendations_ids = [post_id for post_id in similar_posts_indices if post_id not in already_interacted_posts][:n]

        return merged_df['post_id'][top_n_recommendations_ids].values
    
    return get_top_n_post_ids_recommendations(freelancer_address=freelancer_address, cosine_sim_matrix=cosine_sim).tolist()