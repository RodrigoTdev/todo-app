
@echo off
@REM start firefox "http://localhost:3004/api/notes" -WindowStyle Maximized -WindowPosition Left
@REM start firefox "http://localhost:5173/" -WindowStyle Maximized -WindowPosition Left
wt -d "%CD%/frontend" PowerShell -NoExit -Command "pnpm install"; split-pane -d "%CD%/backend" PowerShell -NoExit -Command "pnpm install"