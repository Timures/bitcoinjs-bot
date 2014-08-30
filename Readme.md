
mongod --dbpath btc
to start Mongo database on local

mongo
to start queirying the database


Querying the db:

db.tweets.find()[0]
db.tweets.find({sentiment: {$lt: 0}}).length()


ps -eaf|grep node
kill -9 process_id