/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/android-chrome-192x192.png", // Ruta del icono 192x192 para Android
        headers: [
          {
            key: "link", // Usamos el encabezado 'link' para indicar el icono de Android
            value:
              '<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">', // El valor es un enlace HTML al icono
          },
        ],
      },
      {
        source: "/android-chrome-512x512.png", // Ruta del icono 512x512 para Android
        headers: [
          {
            key: "link", // Usamos el encabezado 'link' para indicar el icono de Android
            value:
              '<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">', // El valor es un enlace HTML al icono
          },
        ],
      },
    ];
  },
};

export default nextConfig;
