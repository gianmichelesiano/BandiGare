import requests


messaggio = "ci siamo"

url = "https://api.ionic.io/push/notifications"
payload = "{\r\n    \"tokens\": [\"d0MoD54VLK8:APA91bE38Ha3SFhNf6BtcH4c6QwlXrTNGAwDleg3aPowlD2WynWXzK5GTt3un_H20LNrF1WwfP9uow0goQF_UZT2wqjLb5KxyBOBPF3sVwUP1RaVrWD0DK5VCGRJKQUu3i0lH7WyOBgL\"],\r\n    \"profile\": \"bandigare\",\r\n    \"notification\": {\r\n        \"message\": \" "+messaggio+" \"\r\n    }\r\n}"
headers = {
    'content-type': "application/json",
    'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MjFjYzc5Ny01M2JjLTRlZjItOTI0OC1iMGI0YTMzMDFkNTYifQ.C3jsIy1LsZacFLpEELNCVWIhhYazdhiksnq4AZgBoB8",
    'cache-control': "no-cache",
    #'postman-token': "2f920d9d-ed26-5478-afcc-26363d0e9f65"
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
