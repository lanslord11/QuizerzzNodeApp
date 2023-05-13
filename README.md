
# Project Title
 Quizerzz-Node-Api


# Prerequisites
- Node.js
- MongoDB
# Installation
1. Clone the repository.
2. Run npm install to install dependencies.
3. Create a .env file with the following environment variables:
- PORT: port number for the server to listen on
- MONGO_URI: MongoDB connection string
4. Run npm start to start the server.
# Usage
#### API Endpoints
- POST /api/quizzez - Insert quiz
- GET /api/quizzez/active - Returns active quizes
- GET /api/quizes/all - Returns all quizes
- GET /api/quizes/:id/result - get quiz result by id

# Caching
This application uses node-cache for caching data. Cached data is automatically invalidated after a set amount of time (default: 5 minutes).

# Rate Limiting
This application uses express-rate-limit to limit the number of requests to the API. By default, the limit is set to 100 requests per hour.

## License
This project is licensed under the MIT License 
- Deployed at : https://odd-ruby-mite-hem.cyclic.app
