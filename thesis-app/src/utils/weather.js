const weather = {
    
    request: {
      type: 'LatLon',
      query: 'Lat 44.49 and Lon 11.34',
      language: 'en',
      unit: 'm'
    },
    location: {
      name: 'Bologna',
      country: 'Italy',
      region: 'Emilia-Romagna',
      lat: '44.483',
      lon: '11.333',
      timezone_id: 'Europe/Rome',
      localtime: '2023-07-18 16:53',
      localtime_epoch: 1689699180,
      utc_offset: '2.0'
    },
    current: {
      observation_time: '02:53 PM',
      temperature: 36,
      weather_code: 113,
      weather_icons: [
        'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'
      ],
      weather_descriptions: [ 'Sunny' ],
      wind_speed: 9,
      wind_degree: 80,
      wind_dir: 'E',
      pressure: 1013,
      precip: 0,
      humidity: 45,
      cloudcover: 0,
      feelslike: 41,
      uv_index: 9,
      visibility: 10,
      is_day: 'yes'
    }
}

module.exports = {
    weather:weather
}