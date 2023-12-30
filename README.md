<img src="https://github.com/GuillermoFarias/ufacil-front/assets/11460907/5cfdd8fb-dfb8-4edb-a196-1f1e9c323686" width="40"  />
<img src="https://github.com/GuillermoFarias/ufacil-front/assets/11460907/c67e615c-2d3a-418e-bfb5-5463aafde603" width="100" height="40" />

### Convertidor UF a CLP web

> Ufacil is a demo app using AdonisJS Typescript and VueJS

## 🎨 Frontend - Web

Este es el repositorio del frontend de la aplicación, no es necesario tener docker instalado para ejecutarlo, solo es necesario tener instalado nodejs y yarn.

## 🎰 Backend - API

Este es el repositorio del backend de la aplicación https://github.com/GuillermoFarias/ufacil-back

## Instalación

1. Las instrucciones están hechas para Mac OS, pero deberían funcionar en cualquier sistema operativo basado en Unix/Linux/Ubuntu.

2. Se asume que ya se tiene instalado Git.

3. Se asume que ya se tiene instalado NodeJS y Yarn.

4. Se asume que ya se tiene corriendo el backend de la aplicación (https://github.com/GuillermoFarias/ufacil-back)

### Clonar el repositorio

```bash
git clone git@github.com:GuillermoFarias/ufacil-back.git
cd ufacil-back
```

### Instalar dependencias

```sh
yarn install
```

### Definir url del backend

```sh
cp .env.example .env
```

La variable de entorno `VUE_APP_API_URL` debe apuntar a la url del backend, por defecto es `http://localhost:3333`

### Compilar y ejecutar en modo desarrollo

```sh
yarn dev
```

### Compilar y ejecutar en modo producción

```sh
yarn build
```

### Lint con [ESLint](https://eslint.org/)

```sh
yarn lint
```
