/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, 
    'autoprefixer': {}, // ตัวที่เราเพิ่งติดตั้งไปจะถูกเรียกใช้ที่นี่
  },
};

export default config;