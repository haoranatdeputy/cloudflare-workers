#!/bin/bash

# Parse .env file
export $(egrep -v '^#' .env | xargs)

# Get file from Cloudflare
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/script" -H \
	"X-Auth-Email:$CLOUDFLARE_EMAIL" -H "X-Auth-Key:$CLOUDFLARE_AUTH_KEY" 