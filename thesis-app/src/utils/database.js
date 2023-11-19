class DataBase {
    constructor() {

    }
    stop() {
        return new Promise((resolve, reject) => {

            // simulating a connection shutdown

            setTimeout(() => {
                console.log('DB closed.');
                resolve();
            }, 500); // 0.5s
            
        });
    }
    
}

module.exports = new DataBase();