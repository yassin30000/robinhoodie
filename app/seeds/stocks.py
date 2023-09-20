from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text


def seed_stocks():
    apple = Stock(
        name='Apple', ticker='AAPL', details='Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other varieties of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. Its products and services include iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, AppleCare, iCloud, digital content stores, streaming, and licensing services. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak in April 1976 and is headquartered in Cupertino, CA. The listed name for AAPL is Apple Inc. Common Stock')
    nvidia = Stock(
        name='Nvidia', ticker='NVDA', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    paypal = Stock(
        name='Paypal', ticker='PYPL', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    tesla = Stock(
        name='Tesla', ticker='TSLA', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    amazon = Stock(
        name='Amazon', ticker='AMZN', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    ford = Stock(
        name='Ford', ticker='F', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    microsoft = Stock(
        name='Microsoft', ticker='MSFT', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    disney = Stock(
        name='Disney', ticker='DIS', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    uber = Stock(
        name='Uber', ticker='UBER', details='Uber Technologies, Inc. is a technology platform, which engages in the development and operation of technology applications, network, and product to power movement from point A to point B. The firm offers ride services and merchants delivery service providers for meal preparation, grocery and other delivery services. It operates through the following segments: Mobility, Delivery and Freight. The Mobility segment refers to products that connect consumers with Mobility Drivers who provide rides in a variety of vehicles, such as cars, auto rickshaws, motorbikes, minibuses, or taxis. The Delivery segment offers consumers to search for and discover local restaurants, order a meal, and either pick-up at the restaurant or have the meal delivered and, in certain markets, Delivery also includes offerings for grocery, alcohol and convenience store delivery and other goods. The Freight segment leverages proprietary technology, brand awareness, and experience revolutionizing industries to connect carriers with shippers on Uber’s platform, and gives carriers upfront, transparent pricing and the ability to book a shipment. The company was founded by Oscar Salazar Gaitan, Travis Kalanick and Garrett Camp in 2009 and is headquartered in San Francisco, CA. The listed name for UBER is Uber Technologies, Inc.')
    meta = Stock(
        name='Meta', ticker='META', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    lucid = Stock(
        name='Lucid', ticker='LUCID', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    netflix = Stock(
        name='Netflix', ticker='NFLX', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    alphabet = Stock(
        name='Alphabet', ticker='GOOGL', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    snap = Stock(
        name='Shapchat', ticker='SNAP', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    rivian = Stock(
        name='Rivian', ticker='RIVN', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    alibaba = Stock(
        name='Alibaba', ticker='BABA', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')
    bofa = Stock(
        name='Bank of America', ticker='BAD', details='Consectetur est consectetur et sint. Do elit cillum veniam ea occaecat aute magna nostrud id sint nisi. Dolor occaecat incididunt nisi officia consectetur culpa.')

    stocks = [apple, nvidia, paypal, tesla, amazon, ford, microsoft, disney, uber, meta, lucid, netflix, alphabet, snap, rivian, alibaba, bofa]

    for s in stocks:
        db.session.add(s)
    
    db.session.commit()



def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))
        
    db.session.commit()