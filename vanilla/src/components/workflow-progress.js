export function createWorkflowProgress({
  steps,
  currentStep,
  primaryColor,
  highlightColor,
  ariaLabel = "Workflow progress",
  className = "",
  markerSize,
}) {
  const root = document.createElement("nav");
  root.className = `workflow-progress ${className}`.trim();
  root.setAttribute("aria-label", ariaLabel);
  root.style.setProperty("--workflow-primary", primaryColor);
  root.style.setProperty("--workflow-highlight", highlightColor);
  if (Number.isFinite(markerSize) && markerSize > 0) {
    root.style.setProperty("--workflow-marker-size", `${markerSize}px`);
  }

  const safeCurrentStep = Math.min(Math.max(Number(currentStep) || 1, 1), Math.max(steps.length, 1));
  const progressPercent = steps.length <= 1 ? 100 : ((safeCurrentStep - 1) / (steps.length - 1)) * 100;
  root.style.setProperty("--workflow-progress-percent", `${progressPercent}%`);

  const responsiveRow = document.createElement("div");
  responsiveRow.className = "workflow-progress__responsive-row";

  const back = document.createElement("button");
  back.type = "button";
  back.className = "workflow-progress__nav workflow-progress__nav--back";
  back.setAttribute("aria-label", "Show previous workflow steps");
  back.innerHTML = '<span aria-hidden="true">‹</span>';

  const viewport = document.createElement("div");
  viewport.className = "workflow-progress__viewport";
  const track = document.createElement("div");
  track.className = "workflow-progress__track";
  const stepElements = [];

  steps.forEach((step, index) => {
    const stepNumber = index + 1;
    const isDone = stepNumber < safeCurrentStep;
    const isActive = stepNumber === safeCurrentStep;
    const stepElement = document.createElement("div");
    stepElement.className = `workflow-progress__step${isDone ? " workflow-progress__step--done" : ""}${isActive ? " workflow-progress__step--active" : ""}`;
    if (isActive) stepElement.setAttribute("aria-current", "step");

    const markerRow = document.createElement("div");
    markerRow.className = "workflow-progress__marker-row";
    const marker = document.createElement("span");
    marker.className = "workflow-progress__marker";
    marker.setAttribute("aria-hidden", "true");
    marker.textContent = isDone ? "✓" : String(stepNumber);
    markerRow.append(marker);

    if (index < steps.length - 1) {
      const connector = document.createElement("span");
      connector.className = "workflow-progress__connector";
      connector.setAttribute("aria-hidden", "true");
      markerRow.append(connector);
    }

    const label = document.createElement("span");
    label.className = "workflow-progress__label";
    label.textContent = step;
    stepElement.append(markerRow, label);
    track.append(stepElement);
    stepElements.push(stepElement);
  });

  viewport.append(track);

  const forward = document.createElement("button");
  forward.type = "button";
  forward.className = "workflow-progress__nav workflow-progress__nav--forward";
  forward.setAttribute("aria-label", "Show next workflow steps");
  forward.innerHTML = '<span aria-hidden="true">›</span>';

  const compactStatus = document.createElement("div");
  compactStatus.className = "workflow-progress__compact-status";
  compactStatus.setAttribute("aria-hidden", "true");
  compactStatus.innerHTML = `<span class="workflow-progress__bar"><span></span></span><span class="workflow-progress__count">Step ${safeCurrentStep} of ${steps.length}</span>`;

  const updateScrollState = () => {
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    back.disabled = viewport.scrollLeft <= 2;
    forward.disabled = viewport.scrollLeft >= maxScrollLeft - 2;
  };

  const positionActiveStep = () => {
    const activeStep = stepElements[safeCurrentStep - 1];
    if (!activeStep) return;
    if (window.matchMedia("(min-width: 1024px)").matches) {
      viewport.scrollLeft = 0;
    } else {
      const left = activeStep.offsetLeft - (viewport.clientWidth - activeStep.offsetWidth) / 2;
      viewport.scrollTo({ left: Math.max(0, left), behavior: "auto" });
    }
    updateScrollState();
  };

  back.addEventListener("click", () => viewport.scrollBy({ left: -viewport.clientWidth * 0.82, behavior: "smooth" }));
  forward.addEventListener("click", () => viewport.scrollBy({ left: viewport.clientWidth * 0.82, behavior: "smooth" }));
  viewport.addEventListener("scroll", updateScrollState, { passive: true });

  responsiveRow.append(back, viewport, forward);
  root.append(responsiveRow, compactStatus);

  requestAnimationFrame(positionActiveStep);
  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(positionActiveStep);
    observer.observe(viewport);
  }

  return root;
}
