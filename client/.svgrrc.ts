export default {
  typescript: true,
  expandProps: "end",
  icon: false,
  svgProps: {
    fill: "currentColor",
  },
  prettier: true,
  replaceAttrValues: {
    "#000": "currentColor",
    "#000000": "currentColor",
  },
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "removeDimensions",
        active: true,
      },
      {
        name: "removeViewBox",
        active: false,
      },
    ],
  },
  jsxRuntime: "automatic",
};
