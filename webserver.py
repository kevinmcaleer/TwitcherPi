# webserver

import json
from flask import Flask, render_template, jsonify, request
from flask.helpers import make_response
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

@app.route('/image', methods= ['GET'])
def get_image():
    global data
    image_id = request.args.get('id')
    print("image_id is:", image_id)
    img = data.get_by_id(image_id)
    print(img)
    response = make_response(img)
    response.headers.set('Content-Type', 'image/jpeg')
    response.headers.set('Content-Disposition', 'attachment',filename=id+'.jpg')
    return response

@app.route('/ids', methods = ['GET'])
def get_ids():
    global data
    ids = data.get_ids()
    return jsonify(ids)
    
def main():
    """ main event loop """
    print("Starting TwitcherPi Database Server")
    app.run(host='0.0.0.0', port=2222)

if __name__ == "__main__":
    main()