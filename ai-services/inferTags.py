import pandas as pd
from collections import Counter
import nltk
from nltk.corpus import stopwords

def infer_tags(json, max_tags):
    data = pd.read_json(json, orient='records')

    def extract_keywords(title, description, max_tags=max_tags):
        # Combine title and description into a single text
        combined_text = title.lower() + ' ' + description.lower()

        # Tokenize and remove stopwords
        stop_words = set(stopwords.words('english'))
        words = [word for word in combined_text.split() if word not in stop_words]

        # Count word frequencies
        word_counts = Counter(words)

        # Sort words by frequency
        sorted_words = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)

        # Get the top words up to the max number of tags
        top_words = [word for word, count in sorted_words[:max_tags]]

        return ', '.join(top_words)

    # Apply the function to create the 'inferred_post_tags' column
    data['inferred_post_tags'] = data.apply(lambda row: extract_keywords(row['title'], row['post_description'], max_tags=5), axis=1)

    data = data.drop(columns=['title', 'post_description'])

    # Return data in json format (with records as orentation)
    return data.to_json(orient='records')