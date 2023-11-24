@echo off
chcp 65001
echo Запуск развёртывания...
cd ASP.Net
rd /s /q wwwroot
mkdir wwwroot
cd ../Front
call yarn
call yarn build
cd ../ASP.Net
dotnet publish
cd ./bin/Release/net8.0/publish/
echo Развёртывание завершено!