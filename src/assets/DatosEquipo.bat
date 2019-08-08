@echo off
del DatosEquipo.txt
WMIC computersystem get username >>DatosEquipo.txt
WMIC csproduct get vendor >>DatosEquipo.txt
WMIC csproduct get name >>DatosEquipo.txt
WMIC csproduct get identifyingnumber >>DatosEquipo.txt
WMIC nicconfig where IPEnabled='true' get Description, IPAddress >>DatosEquipo.txt
exit
