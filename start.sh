code .
firefox "http://127.0.0.1:8080/asteroids" &
x-terminal-emulator --tab -e "http-server .."
x-terminal-emulator --tab -e "tsc --watch"
