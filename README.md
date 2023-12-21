
<h1 align='center'> <img height="30" src='https://github.com/yassin30000/robinhoodie/assets/117422078/f89e499d-7e70-45b8-a5ef-799c08f7f231' />  robinhoodie</h1>
``
<h3>Description</h3>
<p>While Robinhood is a commission-free investing platform, Robinhoodie is a paper trading platform that allows ordinary individuals to try their hand in the stock market. Robinhood's user friendly experience is mirrored in Robinhoodie, allowing users to add funds to their portfolio, buy/sell stocks, and create watchlists. Robinhoodie leverages the Alpaca API to incorporate accurate financial data by updating stock values daily and updating users' daily portfolio values.</p>

<div align='center'> <a href='https://robinhoodie-9jff.onrender.com'>Demo Live Link</a> </div>

<h3>Portfolio Home</h3>

![Screenshot 2023-11-11 at 12 44 52 PM](https://github.com/yassin30000/robinhoodie/assets/117422078/f213b877-5b70-4462-8534-f16e0a4b9d58)

<h3>Stock Details</h3>

![Screenshot 2023-11-04 at 3 02 48 PM](https://github.com/yassin30000/robinhoodie/assets/117422078/93afdb95-ddf1-4bdb-a9b0-167fe6aed6eb)

<h3>Buy/Sell a Stock</h3>

![Screen Recording 2023-11-04 at 3 09 44 PM](https://github.com/yassin30000/robinhoodie/assets/117422078/d69db4b9-1e7f-4195-9506-c14c00cec916)

<h3>Add Watchlists</h3>

### Getting Started

1. Clone this repository

```
git clone https://github.com/yassin30000/robinhoodie.git
```
   
2. Install backend dependencies, including python server. In the root folder:

````
pipenv install
```

3. Install frontend dependencies. In the react-app folder:

```
npm install
```

4.  Set up database with seeders and run. In the root folder:

```
   pipenv shell
   flask db upgrade
   flask seed all
   flask run -p 5001

```
5. Start frontend server. In the react-app folder:
```
npm start
```

6. Create your own account and start investing!

### Application Architecture

robinhoodie is built on React and Redux front end with a Python Flask backend, using PostgresSQL as a database. 

### Technologies used
<div>
   <img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E' />
   <img src='https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue' />
   <img src='https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white' />
   <img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' />
   <img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white' />
   <img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white' />
   <img src='https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white' />
   <img src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' />
   <img src='https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white' />
</div>


