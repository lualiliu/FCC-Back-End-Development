# Timestamp Microservice

This timestamp microservice takes a unix timestamp or a human readable timestamp (in the format MMM DD, YYYY - although it'll do its best to convert whatever you throw at it), and return a simple JSON object that looks like this:

```javascript
{
    'unix': 1234567890,
    'natural': 'April 15, 2016'
}
```

Use this API by appending either `/<unix-time-stamp>` or `/<month-name> <date>, <year>` to the root path.

It runs on Node and Express, and requires queryString to parse natural, human readable dates passed to it.

This software is released under the ☺ licence by Visual Idiot.