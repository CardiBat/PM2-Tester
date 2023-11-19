# PM2-Tester

<br><br>
  <a href="http://pm2.keymetrics.io/" title="PM2 Keymetrics link">
      <img width=710px src="https://raw.githubusercontent.com/Unitech/pm2/master/pres/pm2-v4.png" alt="pm2 logo">
  </a>
<br><br>


## Overview

- Test app for most of PM2 features including Clustering, Load-Balancing, Hot-Reloading, Graceful Start/Stop and many more.
- In the first part it simulates high-CPU tasks running on Node, which are blocking the event loop, so the following requests can't be carried out until the end of the others.
- In the other part, it is demonstrated how PM2, with its features, solves this problem and it's useful for make safe and fault-tolerant apps.
- The simulation is done with Fibonacci Series, which represents CPU-Intensive operation like: computing radar images, high data aggregation, ... (In this weather example).

<br>
<br>



## Setup

### Prerequisites of the machine
- Node.js (recommended version: 20.9.0) and npm must be preinstalled
- Multi-core processor

### PM2 installation

Run the following line on any terminal window:

```
npm install pm2 -g
```
PM2 will be globally installed and ready to use.
See [PM2]([https://pm2.keymetrics.io/]) official page for full documentation.

<br>
<br>



## Usage

### Quick Start 
Go to thesis-app/src:
```
cd thesis-app/src
```
Run the following command:
```
pm2 start app.js --watch
```
Now the server is up on port 3000 of the local machine in normal (_fork_) mode.

Go to localhost:3000 and insert something on the input and press the button. At the end of the run, it will be displayed the exec time of 100 requests (10% blocking) on a green toast.

NOTE: _--watch_ is used for apply changes at every save. If you want to see changes also client-side (ex. JS scripts) you have to reload the page.

### How to test

To compare the same result with the _cluster_ mode, change the property 'instances' in ecosystem.config.js setting its value equal to the cores of your PC processor (-1, if necessary).
Now, run the following command:
```
pm2 start ecosystem.config.js
```
Repeat the first test to see the differences. Also inspect with Chrome to see how PM2 makes can resolve blocking requests in groups. Make % changes if necessary.


### Other PM2 features in the app

With this app is also possible to do other tests. All these featuers are placed in app.js and ecosystem.config.js
- Graceful Stop (same as Graceful Start): the app starts or stops without any conflicts with DB or so on.
- Hot reloading: the app is always reloaded pressing Ctrl+S, _also if it's running_. The Load balancer takes care of terminating the old instances after their requests have been completed
- Metrics Exposed and PM2-plus: with PM2 plus you can see custom metrics installed on the app

<br>
<br>

## Important notes

- All the tests are done on a MacBook Pro 13' 2019 with i5 2 GHz quad-core processor.
- Graceful Start/Stop are not available in Windows because it don't have signals to listen (they can be simulated instead).


