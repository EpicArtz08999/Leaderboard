![leaderboard logo](https://github.com/nathancashmore/Leaderboard/blob/master/app/assets/images/leaderboard.png "Leaderboard Logo")

This project has been created to provide a leaderboard for your Minecraft server.  
This is calculated by assigning points to each achievement gained within Minecraft.

## Setup ##

* Install [NodeJs](https://nodejs.org/en/) v6.1.0
* Clone this project
* Install dependencies

```
npm install
```

## Start up - Quick ##
To start the application which will run on a default port of **```25566```** and looks for a server in the directory **```../MinecraftServer```**

```
npm run watch
```

## Start up - Custom ##
You can change any of the run parameters on the command line at startup:
```
MC_SERVER_PATH="../MyNewShinyServer/" PORT=25575 BASE_PATH="/leaderboard" npm run watch
```

## Use ##
View the leaderboard by going to the hostname and port it started on.

[http://127.0.0.1:25566/](http://127.0.0.1:25566/)

## Config ##

* Points for the achievements can be changed by altering ```app/assets/json/points.json```
* Banner on the leaderboard can be changed by changing ```app/assets/images/banner.png```

## Testing (UNIX / Mac OSX) ##

```
npm test
```
