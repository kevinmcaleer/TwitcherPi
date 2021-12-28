# webserver

from flask import Flask, render_template, jsonify, make_response
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

def main():
    """ main event loop """
    print("Starting TwitcherPi Database Server")
    app.run(host='0.0.0.0', port=2222)

if __name__ == "__main__":
    main()