
export type VennItem = {
  id: string;
  label: string;
  fill?: string;
  stroke?: string;
};

export type VennDiagramProps = {
  items: [VennItem, VennItem] | [VennItem, VennItem, VennItem];
  sharedAllCount?: number;
  pairCounts?: Partial<Record<string, number>>;
  ariaLabel?: string;
  className?: string;
};

const defaults = [
  { fill: "rgba(201, 45, 45, .16)", stroke: "#c92d2d" },
  { fill: "rgba(79, 93, 107, .15)", stroke: "#4f5d6b" },
  { fill: "rgba(201, 145, 30, .16)", stroke: "#b47b00" },
];

const pairKey = (a: string, b: string) => [a, b].sort().join("|");

export function VennDiagram({
  items,
  sharedAllCount,
  pairCounts = {},
  ariaLabel = "Capability overlap Venn diagram",
  className = "",
}: VennDiagramProps) {
  const three = items.length === 3;
  const circles = three
    ? [
        { cx: 255, cy: 150, r: 105 },
        { cx: 385, cy: 150, r: 105 },
        { cx: 320, cy: 245, r: 105 },
      ]
    : [
        { cx: 270, cy: 190, r: 115 },
        { cx: 370, cy: 190, r: 115 },
      ];
  const callouts = three
    ? [
        { x1: 205, y1: 82, x2: 115, y2: 38, tx: 108, ty: 33, anchor: "end" as const },
        { x1: 435, y1: 82, x2: 525, y2: 38, tx: 532, ty: 33, anchor: "start" as const },
        { x1: 320, y1: 330, x2: 382, y2: 354, tx: 390, ty: 359, anchor: "start" as const },
      ]
    : [
        { x1: 225, y1: 90, x2: 115, y2: 42, tx: 108, ty: 37, anchor: "end" as const },
        { x1: 415, y1: 90, x2: 525, y2: 42, tx: 532, ty: 37, anchor: "start" as const },
      ];

  const pairLabels = three
    ? [
        { a: 0, b: 1, x: 320, y: 125 },
        { a: 0, b: 2, x: 270, y: 230 },
        { a: 1, b: 2, x: 370, y: 230 },
      ]
    : [];

  return (
    <figure className={`venn-diagram ${className}`.trim()}>
      <svg className="venn-diagram__svg" viewBox="0 0 640 370" role="img" aria-label={ariaLabel}>
        {items.map((item, index) => {
          const circle = circles[index];
          const palette = defaults[index];
          return (
            <circle
              key={item.id}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill={item.fill ?? palette.fill}
              stroke={item.stroke ?? palette.stroke}
              strokeWidth="2"
            />
          );
        })}

        {items.map((item, index) => {
          const line = callouts[index];
          const palette = defaults[index];
          return (
            <g key={`${item.id}-callout`}>
              <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke={item.stroke ?? palette.stroke} strokeWidth="1.5" />
              <circle cx={line.x1} cy={line.y1} r="3" fill={item.stroke ?? palette.stroke} />
              <text x={line.tx} y={line.ty} textAnchor={line.anchor} className="venn-diagram__label">{item.label}</text>
            </g>
          );
        })}

        {three && pairLabels.map(({ a, b, x, y }) => {
          const value = pairCounts[pairKey(items[a].id, items[b].id)];
          return value == null ? null : <text key={`${a}-${b}`} x={x} y={y} textAnchor="middle" className="venn-diagram__pair-count">{value}</text>;
        })}

        {sharedAllCount != null && (
          <g>
            <text x="320" y={three ? "190" : "185"} textAnchor="middle" className="venn-diagram__shared-count">{sharedAllCount}</text>
            <text x="320" y={three ? "210" : "205"} textAnchor="middle" className="venn-diagram__shared-label">shared by all</text>
          </g>
        )}
      </svg>
    </figure>
  );
}
