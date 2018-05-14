# Bowling

Added bowling api with following routes:

POST -> Add new game : '/api/new/game'

GET -> List of all games: '/api/game'

POST -> Add new player: '/api/new/:gameid/:playername'

GET -> List all players in a game: '/api/:gameid/players'

POST -> Throw pins: '/api/:gameid/:playername/throw/:pins'

GET -> Total Score: '/api/score/:gameid/:playername'

Only REST API added and need to handle scenario for last frame.

Run Server

npm run server

Run Client

npm run client

Run Both concurrently

npm run dev
