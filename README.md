# UrlShorter

## Развёртывание

### Зависимости:
    - Установленный nodejs и yarn
    - Установленный MySQL/MariaDB сервер
    - Установленный dotnet-sdk-8.0
### Настройка конфига:
Для работы back-end необходимо указать в конфиге ASP.Net строку подключения к базе данных. Конфиг находится по пути <code>./ASP.Net/appsettings.json</code>
    
    "ConnectionStrings": {
        "mysql": "Server=localhost; Database=urlshorter; Uid=aspnet; Password=Qwerty123" //Вставить свою строку
    }
Так же можно отрегулировать количество символов используемых для генерации ссылки в этом же месте

    "LinkGenerator": {
        "minLength": 8 //Количество символов для короткой ссылки
    }
Для правильного отображения ссылок и корректной работы front-end необходимо указать в конфиге Vite правильный адрес для ASP.Net (По умолчанию http://localhost:5000). Конфиг находится по пути <code>./Front/.env</code>
                    
    VITE_BackEndpoint = "http://localhost:5000" //Заметить на доменное имя
### Запуск развёртывания:
После этого можно запустить bash скрипт находящийся в корне каталога под названием <code>deploy.sh</code> (Для linux) или <code>deploy.cmd</code> (Для windows) И он скомпилирует всё необходимое.
## Запуск
После развёртывания готовый к запуску проект можно найти по пути <code>/ASP.Net/bin/Release/net8.0/publish/</code> и запустить командой

    ./UrlShorter\ \(ASP.Net\) // Для Linux
Или

    "UrlShorter (ASP.Net).exe" // Для Windows
