# iSpindel Relay

This is a simple relay/proxy for the [iSpindel floating hydrometer](https://www.ispindel.de/).

The iSpindel is great, but it only allows you to set one destination for the data. This is a simple relay that you can run on your local network and configure multiple destinations (services). It will then forward the data received from the iSpindel onto these services.

## Why did you write it?

It was a fun project for me. But mostly, I use the [Grainfather](https://community.grainfather.com/) brewing app. This is good, but the fermentation graph often lags a bit, and it does not show you your battery level (or signal strength).

## How do I run this?

You will need a server running on your home network (or the cloud). If you don't have one, this probably isn't for you. If you don't understand the following instructions, then this probably isn't for you and it's probably best to just use the many guides out there and use Ubidots.

### Run in docker (recommended)

You'll (obviously) need [docker](https://docs.docker.com/get-docker/) installed.
```bash
docker run -d --name ispindel-relay -p 3000:3000 -v "$(pwd)/config:/root" agentgonzo/ispindel-relay
```

If you want to use docker-compose, then the following can be added to your docker-compose file:
```yaml
services:
  ispindel-relay:
    image: agentgonzo/ispindel-relay
    ports:
      - '3000:3000'
    volumes:
      - ispindel:/root

volumes:
  ispindel:
```
This will then run on your machine and present the web interface on `http://server-name:3000`


### Run as a standalone project.

You'll need to have `git`, `npm` and `yarn` installed.
Run the following commands
```bash
git clone https://github.com/agentgonzo/ispindel-relay
cd ispindel-relay
yarn start
```
This will then run on your machine and present the web interface on `http://server-name:3000`

## Running the application

Navigate to http://<servername>:3000

The `Current Data` tab will show you the last received data from your iSpindel.

![Current Data](/images/data.png)
You can configure different services via the `Services` tab at the top.

![Services configuration](/images/services.png)

There are then instructions on how to configure your iSpindel on the `Instructions` tab.

# Why does it only support two types of services?

This is still a work in progress. I use InfluxDB and the Grainfather, so I only needed to implement these services for my needs. If you want to use a service that isn't supported, then raise as [Issue](https://github.com/agentgonzo/ispindel-relay/issues), or create a [Pull-Request](https://github.com/agentgonzo/ispindel-relay/pulls). You can also find me on [The Homebrew Forum](https://www.thehomebrewforum.co.uk/members/agentgonzo.43016/).
