import pandas as pd
from inferTags import infer_tags

csv_file_path = './data/posts.csv'

def add_post(data):
 
    post_id = data.get('post_id', '')
    title = data.get('title', '')
    post_description = data.get('post_description', '')
    post_tags = data.get('post_tags', '')
    post_publishing_date = data.get('post_publishing_date', '')
    inferred_tags = infer_tags(data)
    new_post = {
        'post_id': post_id,
        'title': title,
        'post_description': post_description,
        'post_tags': post_tags,
        'post_publishing_date': post_publishing_date,
        'inferred_tags': inferred_tags.get('inferred_tags')
    }

    try: 
        f = open(csv_file_path, 'a')
        pd.DataFrame([new_post]).to_csv(f, header=False, index=False)
    except Exception as e:
        print(e)
        fail = {
            "message": e
        }
        return fail
    finally:
        success = {
            "message": "New post added successfully"
        }
        return success
