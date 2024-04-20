' Dim objShell
' Set objShell = CreateObject("WScript.Shell")

' objShell.Run "c:\Users\pc-815\Desktop\number-analizer\init-vscode.bat", 0
' WScript.Sleep 5000
' objShell.Run "c:\Users\pc-815\Desktop\number-analizer\init-proyect.bat", 0

Dim objShell
Set objShell = CreateObject("WScript.Shell")

' Get the directory of the current script
Dim currentDirectory
currentDirectory = Left(WScript.ScriptFullName, InStrRev(WScript.ScriptFullName, "\"))

' Run init-vscode.bat from the current directory
objShell.Run currentDirectory & "init-vscode.bat", 0
WScript.Sleep 5000

' Run init-proyect.bat from the current directory
objShell.Run currentDirectory & "init-proyect.bat", 0