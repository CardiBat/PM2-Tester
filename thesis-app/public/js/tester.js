// async blocking code for performing 20 times the same run


async function processRequests() {
    for(let j = 0; j < 20; j++){
        let requests = [];
        const startTime = Date.now();

        // load test
        for (let i = 1; i <= 100; i++) {
            // promises
            let request = {}

            // $.get puts inside request a promise which will be resolved in the future
            if(i%10==0){
                // CPU-Intensive request --> A
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

        // wait for all requests to complete before proceeding
        await Promise.all(requests);

        // ending time count
        const totalTime = Date.now() - startTime;
        console.log("Total time for processing requests: "+ totalTime + 'ms');

        // repeat
        console.log(j);
    }
}

processRequests();
