# Cookly

Aplicación móvil construida con React Native y Expo que propone recetas según los ingredientes disponibles. Consume la API pública [TheMealDB](https://www.themealdb.com/api.php) y no requiere backend.

## Ejecutar el proyecto

1. Instala las dependencias con `npm install`.
2. Ejecuta `npm run web` para abrir la versión web o `npm start` para abrir Expo.
3. Añade ingredientes, elimina los que no quieras usar y toca **Buscar**.

## Funcionamiento

La app consulta una lista por cada ingrediente y calcula en el cliente la intersección de recetas. Al seleccionar una receta se consulta su detalle, ingredientes y preparación.

## Tecnología

- React Native con Expo
- API REST TheMealDB
- JavaScript y StyleSheet

## Organización del código

- `App.js`: inicia la aplicación y muestra la pantalla principal.
- `src/screens/HomeScreen.jsx`: contiene el estado y el flujo principal de búsqueda.
- `src/components/`: reúne el ingreso de ingredientes, tarjetas y detalle de recetas.
- `src/services/mealService.js`: concentra las llamadas a TheMealDB.
- `src/config/api.js`: contiene la URL de la API y las sugerencias de ingredientes.
- `src/styles/`: reúne los colores y los estilos visuales de la app.

El catálogo gratuito de TheMealDB busca por un ingrediente en inglés. `mealService.js` convierte ingredientes comunes como pollo, arroz y huevo antes de consultar, y luego cruza los resultados en la app.
