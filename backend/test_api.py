import requests

url = "https://career-intelligence-platform-xoqm.onrender.com/upload-resume"

files = {
    "resume": open("RESUME HARVANSH.pdf", "rb")
}

response = requests.post(url, files=files)

print(response.json())