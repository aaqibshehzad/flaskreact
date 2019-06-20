from flask import Blueprint

view = Blueprint("view", __name__)

from api.view import controller
