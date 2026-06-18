#!/bin/bash
trap 'echo "[$(date)] Got signal, ignoring..." >> /home/z/my-project/dev.log' TERM HUP INT
LOG=/home/z/my-project/dev.log
NEXT=/home/z/my-project/node_modules/.bin/next
cd /home/z/my-project

while true; do
  if ! ss -tlnp 2>/dev/null | grep -q ":3000 "; then
    echo "[$(date '+%H:%M:%S')] Starting next dev..." >> $LOG
    nohup $NEXT dev -p 3000 >> $LOG 2>&1 &
    NEXTPID=$!
    echo "[$(date '+%H:%M:%S')] Next PID=$NEXTPID" >> $LOG
    sleep 8
  fi
  sleep 5
done
