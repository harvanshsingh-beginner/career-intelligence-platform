from flask import Blueprint, request, jsonify

from flask_bcrypt import Bcrypt

from database.db import connection, cursor

import jwt
import datetime


auth = Blueprint("auth", __name__)

bcrypt = Bcrypt()

SECRET_KEY = "career_intelligence_secret"


@auth.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data["name"]

    email = data["email"]

    password = data["password"]

    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")

    query = """
    INSERT INTO users (name, email, password)
    VALUES (%s, %s, %s)
    """

    values = (
        name,
        email,
        hashed_password
    )

    cursor.execute(query, values)

    connection.commit()

    return jsonify({
        "message": "User registered successfully"
    })


@auth.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]

    password = data["password"]

    query = """
    SELECT * FROM users
    WHERE email = %s
    """

    cursor.execute(query, (email,))

    user = cursor.fetchone()

    if not user:
        return jsonify({
            "error": "Invalid email"
        }), 401

    stored_password = user[3]

    if not bcrypt.check_password_hash(
        stored_password,
        password
    ):
        return jsonify({
            "error": "Invalid password"
        }), 401

    token = jwt.encode(
        {
            "user_id": user[0],
            "exp": datetime.datetime.utcnow()
            + datetime.timedelta(hours=24)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login successful",
        "token": token
    })