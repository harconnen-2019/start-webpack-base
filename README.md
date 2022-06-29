# start-webpack-base
## Особенности
* используется [Normalize](https://necolas.github.io/normalize.css/)
* используется препроцессор [SCSS](https://sass-lang.com/)
* используется [Autoprefixer](https://github.com/postcss/autoprefixer)
* после сборки CSS @media группируются в конце файла
* используется [Webpack](https://webpack.js.org/) для сборки JavaScript-модулей
* для CSS используется линтер [Stylelint](https://stylelint.io)
* для форматирования JS установлен [Prettier](https://prettier.io)
* для HTML установлен, но не подключен [Pug](https://pugjs.org/api/getting-started.html)
* **prettier** и **stylelint** установленны, но нужно настроить для работы в IDE отдельно

## Установка
* установка пакетов, введите команду: ```npm i``` (режим разработки)
* сборка, введите команду: ```npm run start``` (режим разработки)
* сборка, введите команду ```npm run dev``` (режим development)
* сборка, введите команду ```npm run build``` (режим production)

Режим сборки ```production``` предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер.

## Файловая структура

```
start-webpack-base
├── dist
├── src
│   ├── assets
│   ├── fonts
│   ├── img
│   ├── js
│   ├── scss
│   ├── templates
│   └── index.html
├── .babelrc.js
├── .prettierrc.js
├── .stylelintrc.json
├── postcss.config.js
├── webpack.config.js
├── package.json
└── .gitignore
```

* Папка ```src``` - используется во время разработки:
    * дополнительные файлы: ```src/assets```
    * * из этой папки файлы копируются в корень проекта 
    * шрифты: ```src/fonts```
    * изображения: ```src/img```
    * JS-файлы: ```src/js```
    * * функции проекта: ```src/js/lib```
    * * внешние библиотеки: ```src/js/vendor```
    * SCSS-файлы: ```src/scss```
    * HTML-файл: ```src/index.html```
    * для использования PUG: ```src/templates```
    
* Папка ```dist``` - папка, из которой запускается локальный сервер для разработки. После сборки, в этой папке будет готовый проект.


## Рекомендации по использованию
### Подключение PUG
* Препроцессор Pug для html установлен, но отключен
* чтобы его включить в файле ```webpack.config.js``` раскомментировать:
```html
// {
//     test: /\.pug$/,
//     loader: 'pug-loader',
// },
```
* и поменять местами закомментированные строки
```html
template: path.resolve(__dirname, './src/index.html'),
// template: path.resolve(__dirname, './src/index.pug'),
```
* файл ```index.html``` переименовать в ```index.pug```


### Шрифты
* шрифты находятся в папке ```src/fonts```
    * используются [форматы](https://caniuse.com/#search=woff) ```.woff``` и ```.woff2```
    * шрифты подключаются в файл ```src/scss/_fonts.scss```
    * конвертировать локальные шрифты можно с помощью [данного сервиса](https://onlinefontconverter.com/)

### Изображения
* изображения находятся в папке ```src/img```
    * изображения автоматически оптимизируются без потери качества

## Планируется добавить

https://www.npmjs.com/package/svg-sprite-loader
свг спрайты

Фавиконка
https://www.npmjs.com/package/favicons-webpack-plugin