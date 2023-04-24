import requests

### test for local host

url = 'http://localhost:3000/'
response = requests.get(url)
assert(response.status_code == 200)

url = 'http://localhost:3000/home'
response = requests.get(url)
assert(response.status_code == 200)

url = 'http://localhost:3000/menu'
response = requests.get(url)
assert(response.status_code == 200)

url = 'http://localhost:3000/login'
response = requests.get(url)
assert(response.status_code == 200)

url = 'http://localhost:3000/account'
response = requests.get(url)
assert(response.status_code == 200)
