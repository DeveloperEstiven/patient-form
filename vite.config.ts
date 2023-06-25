import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      constants: "/src/constants",

      components: "/src/components",
      molecules: "/src/components/molecules",
      organisms: "/src/components/organisms",
      atoms: "/src/components/atoms",

      styles: "/src/styles",
      theme: "/src/theme",

      hooks: "/src/hooks",
      utils: "/src/utils",

      icons: "/src/assets/icons",
      images: "/src/assets/images",
      animations: "/src/assets/animations",
      fonts: "/src/assets/fonts",

      services: "/src/services",
      modules: "/src/modules",
      store: "/src/store",
      screens: "/src/screens",

      types: "/src/types",
      typings: "/src/typings",
    },
  },
});
