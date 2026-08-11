import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'
import { qrcode } from 'vite-plugin-qrcode';
=======
>>>>>>> 3aaae446b71b40f6d137d8d056658b38607dfd69

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
<<<<<<< HEAD
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    qrcode()
=======
    babel({ presets: [reactCompilerPreset()] })
>>>>>>> 3aaae446b71b40f6d137d8d056658b38607dfd69
  ],
})
