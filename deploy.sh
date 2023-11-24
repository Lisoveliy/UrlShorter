#!/bin/bash
echo Запуск развёртывания...
cd ASP.Net
rm -rf wwwroot
mkdir wwwroot
cd ../Front
yarn
yarn build --emptyOutDir
cd ../ASP.Net
dotnet publish
echo Развёртывание завершено!
