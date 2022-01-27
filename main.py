from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/page=<number>')
def page(number=None):
    return f"you are on page {number}!"
