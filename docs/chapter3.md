# Middleware

Middleware es el concepto base detrás del routing y procesamiento de peticiones en Express. Comprende un número arbitrario de funciones que son invocadas por la capa de routing de Express antes que sea invocado el manejador de peticiones final. De ahí su nombre, de ser una capa media entre la petición en bruto y la ruta final. Se le suele añadir el término stack (middleware stack) debido a que una característica importante es que se ejecutan las diferentes capas en el orden en el que son añadidas.
