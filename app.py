import requests
import os
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from validator import validate_inputs

app = Flask(__name__, static_folder='client/build', static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/postgres' if os.environ.get(
    'FLASK_ENV') == 'development' else os.environ.get('DATABASE_URL').replace("://", "ql://", 1)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
cors = CORS(app)


class PriceLists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    identifier = db.Column(db.String)
    item = db.Column(db.String)

    def __init__(self, identifier, item):
        self.identifier = identifier
        self.item = item


class Reservations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    identifier = db.Column(db.String)
    route = db.Column(db.String)
    price = db.Column(db.String)
    travel_time = db.Column(db.String)
    company_name = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    def __init__(self, route, price, travel_time, company_name, first_name, last_name, identifier):
        self.identifier = identifier
        self.route = route
        self.price = price
        self.travel_time = travel_time
        self.company_name = company_name
        self.first_name = first_name
        self.last_name = last_name

    def to_json(self):
        return {
            'identifier': self.identifier,
            'route': self.route,
            'price': self.price,
            'travel_time': self.travel_time,
            'company_name': self.company_name,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }


@app.route('/api/priceList')
@cross_origin()
def price_list():
    url = os.environ.get('API_URL')
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    count = PriceLists.query.count()
    item = PriceLists.query.filter_by(identifier=data['id']).first()

    if item is None:
        if count < 15:
            entry = PriceLists(data['id'], response.text)
            db.session.add(entry)
            db.session.commit()
        else:
            db.session.delete(PriceLists.query.first())
            entry = PriceLists(data['id'], response.text)
            db.session.add(entry)
            db.session.commit()

    return data


@app.route('/api/reservations', methods=['POST'])
def reservations():
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    is_valid = validate_inputs(first_name, last_name)

    if not is_valid:
        return jsonify({'status': 'error'}), 400

    identifier = request.form.get('priceListId')
    route = request.form.get('route')
    price = request.form.get('price')
    travel_time = request.form.get('travel_time')
    company_name = request.form.get('company_name')

    entry_exists = Reservations.query.filter(Reservations.identifier == identifier, Reservations.route == route, Reservations.price == price, Reservations.travel_time ==
                                             travel_time, Reservations.company_name == company_name, Reservations.first_name == first_name, Reservations.last_name == last_name).first()
    if entry_exists:
        return jsonify({'status': 'error'}), 409

    entry = Reservations(identifier=identifier, route=route, price=price, travel_time=travel_time,
                         company_name=company_name, first_name=first_name, last_name=last_name)
    db.session.add(entry)
    db.session.commit()
    return jsonify({'status': 'ok'})


@app.route('/api/reservationHistory')
def reservationHistory():
    reservations = Reservations.query.join(
        PriceLists, Reservations.identifier == PriceLists.identifier).all()
    expired_reservations = Reservations.query.join(
        PriceLists, Reservations.identifier == PriceLists.identifier, isouter=True).filter(PriceLists.identifier == None).all()
    for reservation in expired_reservations:
        db.session.delete(reservation)
    db.session.commit()

    return jsonify([reservation.to_json() for reservation in reservations])


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0', debug=True)
