require("babel-register")({
  presets: ["env", "react"],
  plugins: ["transform-object-rest-spread", "transform-class-properties"],
});
require("babel-polyfill");

require("./benchmarks.js");
