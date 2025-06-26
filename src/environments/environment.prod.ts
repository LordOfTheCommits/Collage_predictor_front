// environment.prod.ts
export const environment = {
  production: true,
  apiBaseUrl: (window as any)["env"] && (window as any)["env"]["url"] ? (window as any)["env"]["url"] : "https://collage-predictor-back-5.onrender.com/api/wbjee/predict" // fallback to prod default
};
