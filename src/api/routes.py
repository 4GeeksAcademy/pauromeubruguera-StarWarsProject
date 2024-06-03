"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from api.models import db, Users, Posts, Comments, Planets, Characters, Films, Casts


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/users', methods=['GET, POST'])
def handle_users():
    response_body = {}
    if request.method == 'GET':
        # Aqui tengo que hacer la logica para mostrar los usuarios que tengo en mi DB
        users = db.session.execute(db.select(Users)).scalars()
        users_list = [row.serialize() for row in users]  # Utilizo list comprehension
        response_body['data'] = users_list
        response_body['message'] = "Get de users"
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = "Este end point no es valido. Ud debe hacer un signup"
        return response_body, 200


@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(id):
    response_body = {}
    if request.method == 'GET':
        users = db.session.execute(db.select(Users).where(Users.id == id)).scalars()
        if user:
            response_body['data'] = user.serialize()
            response_body['message'] = "Usuario encontrado"
            return response_body, 200
        response_body['data'] = {}
        response_body['message'] = "Usuario inexistente"
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # TODO: validacion datos recibidos
        user = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.last_name = data['last_name']
            user.first_name = data['first_name']
            db.session.commit()
            response_body['data'] = user.serialize()
            response_body['message'] = "Datos del usuario actualizados"
            return response_body, 200
        response_body['data'] = {}
        response_body['message'] = "Usuario inexistente"
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
        if user:
            # db.session.delete(user)
            user.is_active = False
            db.session.commit()
            response_body['data'] = {}
            response_body['message'] = "Usuario eliminado"
            return response_body, 200
        response_body['data'] = {}
        response_body['message'] = "Usuario inexistente"
        return response_body, 404

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

