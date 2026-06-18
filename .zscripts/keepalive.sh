#!/bin/bash
while true; do
  if ! ss -tlnp 2>/dev/null | grep -q ":3000 "; then
    cd /home/z/my-project
    setsid ./node_modules/.bin/next dev -p 3000 >> /home/z/my-project/dev.log 2>&1 < /dev/null &
    disown
    sleep 10
  fi
  sleep 3
done
