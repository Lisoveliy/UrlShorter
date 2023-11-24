@echo off
chcp 65001
echo Запуск развёртывания...
cd ASP.Net
rm -rf wwwroot
mkdir wwwroot
cd ../Front
call yarn
call yarn build
cd ../ASP.Net
dotnet publish
echo Развёртывание завершено!