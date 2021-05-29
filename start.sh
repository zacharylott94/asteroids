code .
firefox "http://127.0.0.1:8080/asteroids" &
x-terminal-emulator -e "http-server .." 
x-terminal-emulator -e "tsc --watch"
jest --watch --coverage ./build
