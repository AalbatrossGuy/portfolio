from flask import Flask, render_template
from Log import CustomLogger

logger = CustomLogger('MainLogger', 'logs/portfolio.log')
app = Flask(__name__)
logger.info("Website up and running!")

@app.route('/')
def home():
    try:
        return render_template('home.html')
    except:
        logger.error("Error occured while loading home page: ", exc_info=True)

@app.route('/about')
def aboutme():
    try:
        return render_template('about.html')
    except:
        logger.error("Error occured while loading about me page: ", exc_info=True)
