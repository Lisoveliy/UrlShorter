@echo off
echo Запуск развёртывания...
cd ASP.Net
rd /s /q wwwroot
mkdir wwwroot
cd ../Front
call yarn
call yarn build
cd ../ASP.Net
dotnet publish
echo Развёртывание завершено!
