import pandas as pd

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
    try: 
        f = open(csv_file_path, 'a')
        pd.DataFrame([new_row]).to_csv(f, header=False, index=False)
    except Exception as e:
        print(e)
        fail = {
            "message": e
        }
        return fail
    finally:
        success = {
            "message": "New post interaction was recorded successfully"
        }
        return success
