# MTR-Cards-Backend
A Node backend server that queries the [MTR](https://en.wikipedia.org/wiki/MTR) APIs and broadcast it with WebSocket. The package contains the time of arrival of the next train.

## APIs
### How to get all the avalible lines
`https://mtr-cards.herokuapp.com/lines`
### How to get all the stations in a certain line
`https://mtr-cards.herokuapp.com/stations/${line}` <br>
e.g. https://mtr-cards.herokuapp.com/stations/WRL

## Event names
### How to get an update of a station
`${line}_${station}_UPDATE` <br>
e.g. WRL_YUL_UPDATE

## JSON Spec
https://opendata.mtr.com.hk/doc/Next_Train_DataDictionary_v1.6.pdf (page 8)
