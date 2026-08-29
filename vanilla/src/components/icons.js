const svg = (paths, size = 18) => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${size}"
    height="${size}"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    ${paths}
  </svg>
`;

export const icons = {
  overview: svg('<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'),
  inputs: svg('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h4"/><path d="M7 17h6"/>'),
  table: svg('<path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 9v12"/>'),
  navigation: svg('<path d="M3 11l19-9-9 19-2-8-8-2z"/>'),
  menu: svg('<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>', 22),
  close: svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', 22),
  chevronLeft: svg('<path d="m15 18-6-6 6-6"/>', 16),
  chevronRight: svg('<path d="m9 18 6-6-6-6"/>', 16),
  chevronDown: svg('<path d="m6 9 6 6 6-6"/>', 18),
  chevronUp: svg('<path d="m18 15-6-6-6 6"/>', 18),
  clear: svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', 18),
};
