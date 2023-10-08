from collections import Counter
from nltk.corpus import stopwords

def infer_tags(post_data: dict, max_tags=5):

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

    tags = {
        'inferred_tags': extract_keywords(post_data.get('title'), post_data.get('post_description'), max_tags=5)
    }

    return tags