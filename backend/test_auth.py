import requests

url = "https://career-intelligence-platform-xoqm.onrender.com/login"

data = {
    "email": "bhaskar@gmail.com",
    "password": "123456"
}

response = requests.post(url, json=data)

print(response.json())