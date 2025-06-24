ffmpeg -f pulse -i default \
       -c:a libmp3lame -b:a 128k \
       -f mp3 http://localhost:8000/live.mp3
