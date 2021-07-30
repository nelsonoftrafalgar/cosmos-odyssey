import requests
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='client/build', static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/postgres'
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
    travelTime = db.Column(db.String)
    companyName = db.Column(db.String)
    firstName = db.Column(db.String)
    lastName = db.Column(db.String)

    def __init__(self, route, price, travelTime, companyName, firstName, lastName, identifier):
        self.identifier = identifier
        self.route = route
        self.price = price
        self.travelTime = travelTime
        self.companyName = companyName
        self.firstName = firstName
        self.lastName = lastName

    def to_json(self):
        return {
            'identifier': self.identifier,
            'route': self.route,
            'price': self.price,
            'travelTime': self.travelTime,
            'companyName': self.companyName,
            'firstName': self.firstName,
            'lastName': self.lastName,
        }


@app.route('/api/priceList')
@cross_origin()
def price_list():
    url = 'https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices'
    response = requests.get(url)
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
    entry = Reservations(*request.form.values())
    db.session.add(entry)
    db.session.commit()
    return jsonify(success=True)


@app.route('/api/reservationHistory')
def reservationHistory():
    reservations = Reservations.query.join(PriceLists,
                                           Reservations.identifier == PriceLists.identifier).all()
    expired_reservations = Reservations.query.join(PriceLists,
                                                   Reservations.identifier == PriceLists.identifier, isouter=True).filter(PriceLists.identifier == None).all()
    for i in expired_reservations:
        db.session.delete(i)
    db.session.commit()

    return jsonify([i.to_json() for i in reservations])


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0', debug=True)
