Several family members play a smartphone game that requires the player to find words of a specific length using given letters. This webapp offers some assistance when stuck.

## Getting Started
I run this on my local network in a docker container on my raspberry pi.

```
docker build -t word-puzzle-solver .
docker run -d -p80:80 word-puzzle-solver
```

Then put `localhost` into your browser and that should do it.

![word-puzzle-solver](https://user-images.githubusercontent.com/5093063/160261542-6c135144-6bfa-4cc9-9874-ca8d6376e3b6.png)
