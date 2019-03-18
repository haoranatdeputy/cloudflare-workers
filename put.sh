#!/bin/bash

# Parse .env file
export $(egrep -v '^#' .env | xargs)

echo curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/script" -H \
	"X-Auth-Email:$CLOUDFLARE_EMAIL" -H "X-Auth-Key:$CLOUDFLARE_AUTH_KEY" -H \
	"Content-Type:application/javascript" --data-binary "@worker-script.js"