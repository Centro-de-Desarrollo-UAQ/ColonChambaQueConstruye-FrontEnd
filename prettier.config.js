/** @type {import('prettier').Config} */
module.exports = {
  semi: true, // Usa punto y coma al final de las líneas
  singleQuote: true, // Usa comillas simples en lugar de dobles
  tabWidth: 2, // Dos espacios por indentación
  trailingComma: 'all', // Coma final donde sea válido
  printWidth: 100, // Máximo 100 caracteres por línea
  bracketSpacing: true, // Espacios entre llaves { like this }
  arrowParens: 'always', // Siempre usa paréntesis en funciones flecha
  endOfLine: 'lf', // Usa line feed (LF) para fin de línea (Unix)
  plugins: ['prettier-plugin-tailwindcss'], // Formato para Tailwind CSS
};
