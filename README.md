# Serverless Middlen
A middle layer for serverless node apps

## Build the base Docker Image

build an image with the tag `node_app`
```
docker build -t node_app .
```
## Check on our images
```
docker images
```
> we should now see that there is a `node_app` image

## Run the image as a Container
- run a container (this is fast)
- choose a random port
```
docker run --rm -p 8125:3000 -v $(pwd)/john/foo:/app/route node_app
open http://localhost:8125
```

Now we can forward requests to this running image!

The `docker run` command can be configured and run in realtime using process.exec spawn

```
const { spawn } = require('child_process');
... express app scaffolding

let nextPort = 8124

app.all('/:user/:function', (req, res)=>{
    nextPort++
    let appPort = nextPort
    const container = spawn('docker', ['run', '--rm', '-p',`${appPort}:3000`, '-v', `${__dirname}/${req.params.user}/${req.params.function}:/app/route node_app`]);

    container.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        // check for "listening on" message
        // then forward req via `request` or `superagent` module
        // to localhost:${appPort}
        // listen for response and forward back out through res
    });

    container.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    });

    container.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    });
})
```

or you could run the containers as soon as the functions are created and forward requests to them while leaving them alive