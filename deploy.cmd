echo Запуск развёртывания...
cd ASP.Net
del -r wwwroot
mkdir wwwroot
cd ../Front
yarn
yarn build
cd ../ASP.Net
dotnet publish
echo Развёртывание завершено!
