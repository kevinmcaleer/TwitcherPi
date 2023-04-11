from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>hello world</h1>"

def main():
    app.run(host='0.0.0.0', port=2222)

if __name__ == "__main__":
    main()