from flask import Flask, request, jsonify, render_template
# from flask_cors import CORS
import json


#Set up Flaskstrong>:

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#Set up Flask to bypass CORSstrong>:

# cors = CORS(app)

#Create the receiver API POST endpoint:
@app.route('/main')
def index():
    result = "123"
    return(result)
    # return render_template("main.html")


@app.route("/submitReceipt", methods=["POST"])

def testing():
    input_image = request.files['file']
    print(input_image)





if __name__ == "__main__": 
    app.run(host="0.0.0.0", port=8000)
    app.run(debug=True)