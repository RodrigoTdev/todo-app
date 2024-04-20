


@echo off
start firefox "http://localhost:3012/" -WindowStyle Maximized -WindowPosition Left
start firefox "http://localhost:5173/" -WindowStyle Maximized -WindowPosition Left
wt -d "%CD%/frontend" PowerShell -NoExit -Command "npm run dev"; split-pane -d "%CD%/backend" PowerShell -NoExit -Command "npm run dev"









