import { HSVtoRGB } from "./colorUtils";

export const spec = {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  description: "A basic histogram.",
  width: 200,
  height: 500,
  padding: 0,
  autosize: "pad",
  title: { text: "Main Memory" },
  marks: [
    {
      type: "rect",
      from: { data: "table" },
      encode: {
        enter: {
          x: { scale: "xscale", value: 0 },
          x2: { scale: "xscale", value: 8 },
          y: { scale: "yscale", field: "y" },
          y2: { scale: "yscale", field: "y2" },
          fill: { field: "colorr" },
          opacity: { field: "opacity" },
        },
        update: {
          x: { scale: "xscale", value: 0 },
          x2: { scale: "xscale", value: 8 },
          y: { scale: "yscale", field: "y" },
          y2: { scale: "yscale", field: "y2" },
          fill: { field: "colorr" },
          opacity: { field: "opacity" },
        },
      },
    },
  ],

  data: [
    {
      name: "table",
      values: Array(256)
        .fill(0)
        .map((_, i) => {
          var rgb = HSVtoRGB(((i % 16) / 16) * 0.85, 1, 1);
          return {
            y: i,
            y2: i + 1,
            colorr: "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")",
            opacity: 0.1,
          };
        }),
    },
  ],

  scales: [
    {
      name: "xscale",
      type: "linear",
      range: "width",
      nice: true,
      domain: [0, 8],
    },
    {
      name: "yscale",
      type: "linear",
      range: "height",
      nice: true,
      domain: [0, 256],
    },
  ],

  axes: [
    { scale: "xscale", orient: "bottom", values: [0, 8] },
    {
      scale: "yscale",
      orient: "left",
      values: Array(17)
        .fill(0)
        .map((_, i) => i * 16),
    },
  ],
};

export var spec1 = JSON.parse(JSON.stringify(spec));
spec1.title.text = "Direct Mapped Cache"
spec1.height = 100;
spec1.axes[1] = { scale: "yscale", orient: "left", values: Array(17) .fill(0).map((_, i) => i * 16)};
spec1.scales[1] = { name: "yscale", type: "linear", range: "height", nice: true, domain: [0, 16]};

spec1.data = [
  {
    name: "table",
    values: Array(16)
      .fill(0)
      .map((_, i) => {
        var rgb = HSVtoRGB(((i % 16) / 16) * 0.85, 1, 1);
        return {
          y: i,
          y2: i + 1,
          colorr: "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")",
          opacity: 0.1,
        };
      }),
  },
];
