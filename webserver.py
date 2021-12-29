# webserver

import json
from flask import Flask, render_template, jsonify, request
from dal import ImageDocument
from json import dumps, loads
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
data = ImageDocument()

@app.route('/')
def home(name=None):
    return render_template('home.html', name=name)

@app.route('/labels', methods = ['GET'])
def labels():
    global data
    my_labels = data.get_labels()
    print(type(my_labels))
    print("got labels:",my_labels)
    return jsonify(my_labels)

@app.route('/save', methods = ['POST'])
def save():
    global data
    save_data = request.get_json(force=True)
    print ("Data:",save_data)
    resp = jsonify(success=True)
    resp.status_code = 200
    return resp

@app.route('/get_one', methods = ['GET'])
def get_one():
    """ Get one image file from the data layer """
    global data
    image_data = data.get_one()
    return jsonify(image_data)

    
def main():
    """ main event loop """
    print("Starting TwitcherPi Database Server")
    app.run(host='0.0.0.0', port=2222)

if __name__ == "__main__":
    main()