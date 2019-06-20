from flask import render_template, jsonify
from api.view import view


@view.route("/")
def index():
    return render_template("index.html", data="Hello")


@view.route("/hello", methods=["POST"])
def hello():
    data = "Flask React v.20"
    return jsonify(data)
