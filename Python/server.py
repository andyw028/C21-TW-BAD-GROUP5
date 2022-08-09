from flask import Flask, request, jsonify, render_template
import os
# from flask_cors import CORS
import json


#Set up Flaskstrong>:


UPLOAD_FOLDER = os.path.join("../uploads")
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#Set up Flask to bypass CORSstrong>:

# cors = CORS(app)

@app.route("/")
def connect():
    return("123")


#Create the receiver API POST endpoint:
@app.route('/upload', methods=["POST"])
def upload_file():
    if request.method == 'POST':
        file = request.files['the_file']
        print(file)
    # return render_template("main.html")


if __name__ == "__main__": 
    app.run(host="0.0.0.0", port=5000)
    app.run(debug=True)