# UrlShorter

## Развёртывание

### Зависимости:
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
### Запуск
Запуск производится командой <code>dotnet run</code>
## Тестирование
Откройте проект ASP.NET Test в Visual Studio и запустите тесты через Ctrl + R && Ctrl + A
