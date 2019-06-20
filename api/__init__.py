# server.py
from flask import Flask
from api.view import view


def create_app():
    app = Flask(
        __name__,
        static_url_path="",
        static_folder="./static",
        template_folder="./static",
    )
    app.register_blueprint(view)

    return app
