#!/bin/bash
echo "Starting JSON Server..."
echo "Make sure you have json-server installed globally: npm install -g json-server"
echo "Starting server on http://localhost:3001"
json-server --watch db.json --port 3001 --delay 500
