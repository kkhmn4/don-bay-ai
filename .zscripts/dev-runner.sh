#!/bin/bash
# Persistent dev server runner
LOG=/home/z/my-project/dev.log
NEXT=/home/z/my-project/node_modules/.bin/next
cd /home/z/my-project

while true; do
  echo "[$(date '+%H:%M:%S')] Starting next dev..." >> $LOG
  $NEXT dev -p 3000 >> $LOG 2>&1
  EXIT=$?
  echo "[$(date '+%H:%M:%S')] Next exited with $EXIT, respawning in 2s..." >> $LOG
  sleep 2
done
