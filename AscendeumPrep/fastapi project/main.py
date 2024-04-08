from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def index():
    return {'data': {'name': "Arjun"}}

@app.get('/about')
def about():
    return {'data':{'about page'}}