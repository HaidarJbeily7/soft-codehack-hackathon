import pandas as pd

csv_file_path = './data/freelancers.csv'

def add_freelancer(data):
 
    freelancer_address = data.get('freelancer_address', '')
    freelancer_skillset = data.get('freelancer_skillset', '')

    new_freelancer = {
        'freelancer_address': freelancer_address,
        'freelancer_skillset': freelancer_skillset,
    }

    try: 
        f = open(csv_file_path, 'a')
        pd.DataFrame([new_freelancer]).to_csv(f, header=False, index=False)
    except Exception as e:
        print(e)
        fail = {
            "message": e
        }
        return fail
    finally:
        success = {
            "message": "New freelancer information have been added successfully"
        }
        return success
