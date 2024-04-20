


@echo off
wt -d "%CD%" powershell -NoExit -Command "code ."
timeout /t 4
taskkill /IM WindowsTerminal.exe /F









