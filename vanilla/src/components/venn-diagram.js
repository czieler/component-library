const NS = "http://www.w3.org/2000/svg";
const defaults = [
  { fill: "rgba(201, 45, 45, .16)", stroke: "#c92d2d" },
  { fill: "rgba(79, 93, 107, .15)", stroke: "#4f5d6b" },
  { fill: "rgba(201, 145, 30, .16)", stroke: "#b47b00" },
];
const pairKey = (a, b) => [a, b].sort().join("|");
const svgNode = (tag, attrs = {}) => {
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
  return node;
};

export function createVennDiagram({ items, sharedAllCount, pairCounts = {}, ariaLabel = "Capability overlap Venn diagram", className = "" }) {
  if (!Array.isArray(items) || (items.length !== 2 && items.length !== 3)) throw new Error("VennDiagram requires exactly 2 or 3 items.");
  const three = items.length === 3;
  const circles = three
    ? [{ cx: 255, cy: 150, r: 105 }, { cx: 385, cy: 150, r: 105 }, { cx: 320, cy: 245, r: 105 }]
    : [{ cx: 270, cy: 190, r: 115 }, { cx: 370, cy: 190, r: 115 }];
  const callouts = three
    ? [{ x1:205,y1:82,x2:115,y2:38,tx:108,ty:33,anchor:"end" }, { x1:435,y1:82,x2:525,y2:38,tx:532,ty:33,anchor:"start" }, { x1:320,y1:330,x2:382,y2:354,tx:390,ty:359,anchor:"start" }]
    : [{ x1:225,y1:90,x2:115,y2:42,tx:108,ty:37,anchor:"end" }, { x1:415,y1:90,x2:525,y2:42,tx:532,ty:37,anchor:"start" }];

  const figure = document.createElement("figure");
  figure.className = `venn-diagram ${className}`.trim();
  const svg = svgNode("svg", { viewBox: "0 0 640 370", role: "img", "aria-label": ariaLabel, class: "venn-diagram__svg" });

  items.forEach((item, index) => {
    const c = circles[index], p = defaults[index];
    svg.append(svgNode("circle", { cx:c.cx, cy:c.cy, r:c.r, fill:item.fill || p.fill, stroke:item.stroke || p.stroke, "stroke-width":2 }));
  });
  items.forEach((item, index) => {
    const l = callouts[index], p = defaults[index];
    svg.append(svgNode("line", { x1:l.x1,y1:l.y1,x2:l.x2,y2:l.y2,stroke:item.stroke || p.stroke,"stroke-width":1.5 }));
    svg.append(svgNode("circle", { cx:l.x1,cy:l.y1,r:3,fill:item.stroke || p.stroke }));
    const label = svgNode("text", { x:l.tx,y:l.ty,"text-anchor":l.anchor,class:"venn-diagram__label" });
    label.textContent = item.label; svg.append(label);
  });
  if (three) {
    [{a:0,b:1,x:320,y:125},{a:0,b:2,x:270,y:230},{a:1,b:2,x:370,y:230}].forEach(({a,b,x,y}) => {
      const value = pairCounts[pairKey(items[a].id, items[b].id)];
      if (value == null) return;
      const label = svgNode("text", { x,y,"text-anchor":"middle",class:"venn-diagram__pair-count" }); label.textContent = value; svg.append(label);
    });
  }
  if (sharedAllCount != null) {
    const count = svgNode("text", { x:320,y:three?190:185,"text-anchor":"middle",class:"venn-diagram__shared-count" }); count.textContent = sharedAllCount; svg.append(count);
    const label = svgNode("text", { x:320,y:three?210:205,"text-anchor":"middle",class:"venn-diagram__shared-label" }); label.textContent = "shared by all"; svg.append(label);
  }
  figure.append(svg);
  return figure;
}
