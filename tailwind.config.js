/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  plugins: [
    // ...
    // eslint-disable-next-line no-undef
    require("flowbite/plugin"),
  ],
};
