from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name}

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    author_to = db.relationship('Users', foreign_keys=[author_id])
    body = db.Column(db.String(600), nullable=False)
    date = db.Column(db.DateTime)
    image_url = db.Column(db.String())
    description = db.Column(db.String())

    def __repr__(self):
        return f'<Post: {self.title}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'title': self.title,
                'author_id': self.author_id,
                'body': self.body,
                'date': self.date,
                'description': self.description,
                'image_url': self.image_url}

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    author_to = db.relationship('Users', foreign_keys=[author_id])
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id])
    body = db.Column(db.String(300), nullable=False)
    date = db.Column(db.DateTime)
   

    def __repr__(self):
        return f'<Comment: {self.body}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'post_id': self.post_id,
                'author_id': self.author_id,
                'body': self.body,
                'date': self.date}

class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    diameter = db.Column(db.Float)

    def __repr__(self):
        return f'<Planet: {self.name}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                'diameter': self.diameter}

class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    home_world = db.Column(db.String, db.ForeignKey('planets.id'))
    planet_to = db.relationship('Planets', foreign_keys=[home_world])
    description = db.Column(db.String(300))
    name = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f'<Character: {self.name}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'home_world': self.home_world,
                'description': self.description,
                'name': self.name}

class Films(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    release = db.Column(db.DateTime)
    director = db.Column(db.String())
    name = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f'<Film: {self.name}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'release': self.release,
                'director': self.director,
                'name': self.name}

class Casts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    film_id = db.Column(db.String, db.ForeignKey('films.id'))
    film_to = db.relationship('Films', foreign_keys=[film_id])
    character_id = db.Column(db.String, db.ForeignKey('characters.id'))
    character_to = db.relationship('Characters', foreign_keys=[character_id])
    role = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f'<Casts: {self.role}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'film_id': self.film_id,
                'character_id': self.character_id,
                'role': self.role}

class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])
    def __repr__(self):
        return f'<Followers: {self.role}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'user_id': self.user_id}

class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    planet_to = db.relationship('Planets', foreign_keys=[user_id])
    def __repr__(self):
        return f'<PlanetFavorites: {self.role}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'user_id': self.user_id,
                'planet_id': self.planet_id}

class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_to = db.relationship('Characters', foreign_keys=[user_id])
    def __repr__(self):
        return f'<CharacterFavorites: {self.role}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'user_id': self.user_id,
                'character_id': self.character_id}
