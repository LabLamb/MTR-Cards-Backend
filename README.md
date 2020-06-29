# MTR-Cards-Backend
A Node backend server that queries the [MTR](https://en.wikipedia.org/wiki/MTR) API and broadcast it with WebSocket.

# Usage
## Socket.io server url
`https://mtr-cards.herokuapp.com/`

## APIs
### How to get all the avalible lines
`https://mtr-cards.herokuapp.com/lines`
### How to get all the stations in a certain line
`https://mtr-cards.herokuapp.com/stations/${line}` <br>
e.g. `https://mtr-cards.herokuapp.com/stations/WRL`
