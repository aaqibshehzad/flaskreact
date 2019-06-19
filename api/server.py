# server.py
from flask import Flask, render_template, jsonify

app = Flask(__name__, static_folder="../static/dist", template_folder="../static/dist")

@app.route("/")
def index():
    return render_template("index.html", data='Hello')

@app.route("/hello", methods=['POST'])
def hello():
    data = 'Flask React'
    return jsonify(data)

if __name__ == "__main__":
    app.debug=True
    app.run()
