from flask import Flask, jsonify
from dal2 import ImageDocument

app = Flask(__name__)

data = ImageDocument()

@app.route('/')
def home():
    return "<h1>hello world</h1>"

@app.route('/labels')
def labels():
    global data
    my_labels = data.get_labels()
    return jsonify(my_labels)

@app.route('/ids')
def get_ids():
    global data
    ids = data.get_ids()
    return jsonify(ids)

def main():
    app.run(host='0.0.0.0', port=2222)

if __name__ == "__main__":
    main()