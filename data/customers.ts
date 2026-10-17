/** Fictional customer brands used for logo walls and stories. */
export type LogoShape = "circle" | "triangle" | "square" | "diamond" | "hex" | "wave" | "ring" | "bolt";

export type CustomerLogo = {
  name: string;
  shape: LogoShape;
  style: "bold" | "serif" | "wide" | "mono" | "italic";
};

export const customerLogos: CustomerLogo[] = [
  { name: "Northwind", shape: "triangle", style: "bold" },
  { name: "Brightline", shape: "bolt", style: "wide" },
  { name: "Kestrel Labs", shape: "diamond", style: "mono" },
  { name: "Lumen & Co", shape: "circle", style: "serif" },
  { name: "Orbital Freight", shape: "ring", style: "bold" },
  { name: "Halcyon Health", shape: "wave", style: "italic" },
  { name: "Vantage Bank", shape: "square", style: "wide" },
  { name: "Juniper Studios", shape: "hex", style: "serif" },
  { name: "Atlas Motors", shape: "triangle", style: "wide" },
  { name: "Copperleaf", shape: "wave", style: "bold" },
  { name: "Meridian Air", shape: "ring", style: "italic" },
  { name: "Pinecrest University", shape: "hex", style: "serif" },
];
