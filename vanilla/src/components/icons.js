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
  workflow: svg('<path d="M6 3v12"/><path d="M18 9v12"/><path d="M6 15h12"/><circle cx="6" cy="3" r="2"/><circle cx="18" cy="21" r="2"/>'),
  menu: svg('<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>', 22),
  close: svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', 22),
  chevronLeft: svg('<path d="m15 18-6-6 6-6"/>', 16),
  chevronRight: svg('<path d="m9 18 6-6-6-6"/>', 16),
  chevronDown: svg('<path d="m6 9 6 6 6-6"/>', 18),
  chevronUp: svg('<path d="m18 15-6-6-6 6"/>', 18),
  clear: svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', 18),
};

export const passwordIcons = {
  eye: svg('<path d="M2.062 12.348a1 1 0 0 1 0-.696C3.423 8.62 6.44 6.5 12 6.5s8.577 2.12 9.938 5.152a1 1 0 0 1 0 .696C20.577 15.38 17.56 17.5 12 17.5s-8.577-2.12-9.938-5.152Z"/><circle cx="12" cy="12" r="3"/>'),
  eyeOff: svg('<path d="m2 2 20 20"/><path d="M6.71 6.71C4.87 7.75 3.5 9.3 2.62 11.16a2 2 0 0 0 0 1.68C4.28 16.36 7.35 18.5 12 18.5c1.26 0 2.39-.16 3.4-.45"/><path d="M10.73 5.58A10.7 10.7 0 0 1 12 5.5c4.65 0 7.72 2.14 9.38 5.66a2 2 0 0 1 0 1.68 9.7 9.7 0 0 1-1.17 1.84"/><path d="M14.12 14.12A3 3 0 0 1 9.88 9.88"/>')
};
