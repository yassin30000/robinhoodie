
<h1 align='center'> <img height="30" src='https://github.com/yassin30000/robinhoodie/assets/117422078/f89e499d-7e70-45b8-a5ef-799c08f7f231' />  robinhoodie</h1>

<h3 align='center'>Commission-free investing platform for ordinary individuals to start investing easily and efficiently with little money.</h3>

<h3>Portfolio Home</h3>

<h3>Stock Details</h3>

<h3>Buy/Sell a Stock</h3>

<h3>Add Watchlists</h3>

### Getting Started

1. Clone this repository

```
git clone https://github.com/yassin30000/robinhoodie.git
```
   
2. Install backend dependencies, including python server. In the root folder:

```
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
   flask run

```
5. Start frontend server. In the react-app folder:
```
npm start
```

6. Create your own account and start investing!

### Application Architecture

robinhoodie is built on React and Redux front end with a Python Flask backend, using PostgresSQL as a database. 

