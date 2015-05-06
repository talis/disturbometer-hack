#!/bin/bash
cd ../
heroku git:remote -a talis-disturbometer-backend
git subtree push --prefix backend heroku master