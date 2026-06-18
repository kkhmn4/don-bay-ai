#!/bin/bash
cd /home/z/my-project
while true; do
  echo "[$(date)] Starting next dev..."
  ./node_modules/.bin/next dev -p 3000 2>&1 | tee -a /home/z/my-project/dev.log
  echo "[$(date)] next dev exited with code $?, restarting in 3s..."
  sleep 3
done
