


@echo off
start firefox "http://localhost:1234/api/data" -WindowStyle Maximized -WindowPosition Left
start firefox "http://localhost:5173/" -WindowStyle Maximized -WindowPosition Left
wt -d "%CD%/frontend" PowerShell -NoExit -Command "npm run dev"; split-pane -d "%CD%/backend" PowerShell -NoExit -Command "npm run dev"









