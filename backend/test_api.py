import requests

url = "http://127.0.0.1:5000/upload-resume"

files = {
    "resume": open("RESUME HARVANSH.pdf", "rb")
}

response = requests.post(url, files=files)

print(response.json())