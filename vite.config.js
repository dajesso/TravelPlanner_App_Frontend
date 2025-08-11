import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        // login: "login.html", // Add login.html as an entry point
      },
    },
  },
});

//   plugins: [react()]
//   });

