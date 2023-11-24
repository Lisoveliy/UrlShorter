echo Запуск развёртывания...
cd ASP.Net
del /F /s /q wwwroot
mkdir wwwroot
cd ../Front
yarn
yarn build
cd ../ASP.Net
dotnet publish
echo Развёртывание завершено!
