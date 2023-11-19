
// Only for display
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



// jQuery DOCUMENT
// ------------------------------------------------------------------------------------------------------
$(document).ready(function() {

    console.log('JS loaded client side')

    // include letters and the space
    let letters = /^[A-Za-z ]+$/

    // if button is clicked --> important #
    $('#searchButton').click( () => {

        // clear the error message
        $("#result").hide('slow').empty()

        // save the value
        let value = $('#cityToSearch').val()
        
        // checks (58 is max length of a city)
        if(value.length<58 && value.match(letters)){

            // success toast info
            $.toast({
                heading: 'Success',
                text: 'Please wait while the forecast is being provided',
                showHideTransition: 'slide',
                bgColor: '#91A6FF',
                textColor: 'white',
                loaderBg: '#89909F',
                hideAfter: 2000,
                position: 'bottom-center',
                icon: 'success'
            })

            // AJAX call 
            // $.ajax({
			// 	type: 'GET',
			// 	url: "http://localhost:3000/weather",
			// 	data: {
            //         cityToSearch: value
            //     },
			// 	contentType: 'application/x-www-form-urlencoded',
			// 	success: (weather) => {

            //         // callback

            //         // cleaning other result
            //         $('#weather-card').empty()
                    
            //         // assigning a class to div to start a rendering from css
            //         $('#weather-card').attr({class:'weather-card'})

            //         // adding the name
            //         let $divLocation = $("<div>", {"class": "location"}).text(
            //             weather.location.name + 
            //             ", " + 
            //             weather.location.country
            //         )

            //         $('#weather-card').append($divLocation)

            //         // adding the infos
            //         $.each(weather.current, function(key, value) {

            //             // div with desc and value
            //             let $divInfo = $('<div>', {"class" : "weather-info"})
            //             var $label = $('<label>')
            //             var $span = $('<span>')

            //             // exclusive chain of ifs
            //             if(key==='temperature'){
            //                 $label.text('Temperature:')
            //                 $span.text(value + '°C')
            //             }
            //             else if(key==='weather_descriptions'){
            //                 //array
            //                 $label.text('Weather Descriptions:')
            //                 let text = ''
            //                 for(let description of value){
            //                     text+=description
            //                 }
            //                 $span.text(text)
            //             }
            //             else if(key==='humidity'){
            //                 $label.text('Humidity:')
            //                 $span.text(value + ' %')
            //             }
            //             else if(key==='wind_speed'){
            //                 $label.text('Wind Speed:')
            //                 $span.text(value + ' Km/h')
            //             }

            //             // 'finally'
            //             if($label.text() !== ''){ // if something was created above

            //                 $divInfo.append($label)
            //                 $divInfo.append($span)

            //                 $('#weather-card').append($divInfo)
            //             }
            //         });

            //     },
			// 	error: (errors) => {

            //         // raching server error
            //         $.toast({
            //             heading: 'Fatal error',
            //             text: 'Problems reaching the server',
            //             showHideTransition: 'slide',
            //             bgColor: '#FF5154',
            //             textColor: 'white',
            //             loaderBg: '#89909F',
            //             position: 'bottom-center',
            //             hideAfter:3000,
            //             icon: 'error'
            //         })
            //     } 
			// });

            // AJAX 100 call test
            // 10% of requests are CPU Intensive
            // --------------------------------------------------------------------------------
            
            const requests = [];
            const latencies = [];

            // starting time count
            const startTime = Date.now();

            // load test
            for (let i = 1; i <= 100; i++) {

                // promises
                let request = {}

                // $.get puts inside request a promise which will be resolved in the future
                if(i%10==0){
                    // CPU-Intensive request --> A
                    console.log(i)
                    request = $.get("http://localhost:3000/weather?cityToSearch=a")
                    .fail((jqXHR, textStatus, errorThrown) => {
                        console.error(`Request failed: ${textStatus}, ${errorThrown}`);
                    });
                }
                else{
                    // Normal request --> B
                    request = $.get("http://localhost:3000/weather?cityToSearch=b")
                    .fail((jqXHR, textStatus, errorThrown) => {
                        console.error(`Request failed: ${textStatus}, ${errorThrown}`);
                    });
                }
                requests.push(request);
            }

            // when all AJAX are done --> when all promises inside 'requests' are resolved
            $.when.apply($, requests).done(() => {

                // ending time count
                const totalTime = Date.now() - startTime;

                // toasting the result
                $.toast({
                    heading: 'Success',
                    text: "Total time for processing requests: "+ totalTime + 'ms',
                    showHideTransition: 'slide',
                    bgColor: '#138A36',
                    textColor: 'white',
                    loaderBg: '#89909F',
                    hideAfter: 5000,
                    position: 'bottom-center',
                    icon: 'success'
                })




                // Only for display something
                // callback

                // cleaning other result
                $('#weather-card').empty()

                // assigning a class to div to start a rendering from css
                $('#weather-card').attr({class:'weather-card'})

                // adding the name
                let $divLocation = $("<div>", {"class": "location"}).text(
                    weather.location.name +
                    ", " +
                    weather.location.country
                )

                $('#weather-card').append($divLocation)

                // adding the infos
                $.each(weather.current, function(key, value) {

                    // div with desc and value
                    let $divInfo = $('<div>', {"class" : "weather-info"})
                    var $label = $('<label>')
                    var $span = $('<span>')

                    // exclusive chain of ifs
                    if(key==='temperature'){
                        $label.text('Temperature:')
                        $span.text(value + '°C')
                    }
                    else if(key==='weather_descriptions'){
                        //array
                        $label.text('Weather Descriptions:')
                        let text = ''
                        for(let description of value){
                            text+=description
                        }
                        $span.text(text)
                    }
                    else if(key==='humidity'){
                        $label.text('Humidity:')
                        $span.text(value + ' %')
                    }
                    else if(key==='wind_speed'){
                        $label.text('Wind Speed:')
                        $span.text(value + ' Km/h')
                    }

                    // 'finally'
                    if($label.text() !== ''){ // if something was created above

                        $divInfo.append($label)
                        $divInfo.append($span)

                        $('#weather-card').append($divInfo)
                    }
                });

            });
                
            

            // --------------------------------------------------------------------------------
            
        }
        else{

            // error: parameters client-side
            $.toast({
                heading: 'Invalid city. Checks:',
                text: [
                    'Don\'t include special characters',
                    'Don\'t insert a long text'
                ],
                showHideTransition: 'slide',
                bgColor: '#FF5154',
                textColor: 'white',
                loaderBg: '#89909F',
                position: 'bottom-center',
                hideAfter:4000,
                icon: 'error'
            })

        }
    })
})
// ------------------------------------------------------------------------------------------------------


