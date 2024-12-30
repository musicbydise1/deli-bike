# Используйте официальный образ Node.js
FROM node:16

# Установка рабочей директории
WORKDIR /usr/src/app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей без сборки скриптов
RUN npm install --build-from-source bcrypt

# Копирование остальных файлов проекта
COPY . .

# Открытие порта
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start:dev"]
