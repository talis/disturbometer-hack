# Configuring your local environment

1. git clone git@github.com:talis/disturbometer-hack.git
2. cd backend
3. vagrant up
--- to be automated ---
4. vagrant ssh
5. cd /vagrant/disturbometer-hack/backend
6. npm install
7. npm start
--- --------------- ---

Now you will be able to get to the app via localhost:9080

# Deploying to heroku

1. Install the heroku command line tools - https://toolbelt.heroku.com/
2. run ./deploy.sh
3. Find your app at http://talis-disturbometer-backend.herokuapp.com/