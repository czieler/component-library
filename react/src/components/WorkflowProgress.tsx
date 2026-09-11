import { useEffect, useRef, useState, type CSSProperties } from "react";

export type WorkflowProgressProps = {
  steps: string[];
  currentStep: number;
  primaryColor: string;
  highlightColor: string;
  ariaLabel?: string;
  className?: string;
};

export function WorkflowProgress({
  steps,
  currentStep,
  primaryColor,
  highlightColor,
  ariaLabel = "Workflow progress",
  className = "",
}: WorkflowProgressProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const safeCurrentStep = Math.min(Math.max(currentStep, 1), Math.max(steps.length, 1));
  const progressPercent = steps.length <= 1 ? 100 : ((safeCurrentStep - 1) / (steps.length - 1)) * 100;
  const style = {
    "--workflow-primary": primaryColor,
    "--workflow-highlight": highlightColor,
    "--workflow-progress-percent": `${progressPercent}%`,
  } as CSSProperties;

  const updateScrollState = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    setCanScrollBack(viewport.scrollLeft > 2);
    setCanScrollForward(viewport.scrollLeft < maxScrollLeft - 2);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const activeStep = stepRefs.current[safeCurrentStep - 1];
    if (!viewport || !activeStep) return;

    const positionActiveStep = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        viewport.scrollLeft = 0;
        updateScrollState();
        return;
      }

      const left = activeStep.offsetLeft - (viewport.clientWidth - activeStep.offsetWidth) / 2;
      viewport.scrollTo({ left: Math.max(0, left), behavior: "auto" });
      updateScrollState();
    };

    positionActiveStep();
    const observer = new ResizeObserver(positionActiveStep);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [safeCurrentStep, steps.length]);

  const scrollWindow = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: direction * viewport.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <nav className={`workflow-progress ${className}`.trim()} aria-label={ariaLabel} style={style}>
      <div className="workflow-progress__responsive-row">
        <button
          type="button"
          className="workflow-progress__nav workflow-progress__nav--back"
          onClick={() => scrollWindow(-1)}
          disabled={!canScrollBack}
          aria-label="Show previous workflow steps"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className="workflow-progress__viewport" ref={viewportRef} onScroll={updateScrollState}>
          <div className="workflow-progress__track">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isDone = stepNumber < safeCurrentStep;
              const isActive = stepNumber === safeCurrentStep;

              return (
                <div
                  className={`workflow-progress__step${isDone ? " workflow-progress__step--done" : ""}${isActive ? " workflow-progress__step--active" : ""}`}
                  key={`${stepNumber}-${step}`}
                  aria-current={isActive ? "step" : undefined}
                  ref={(node) => { stepRefs.current[index] = node; }}
                >
                  <div className="workflow-progress__marker-row">
                    <span className="workflow-progress__marker" aria-hidden="true">
                      {isDone ? "✓" : stepNumber}
                    </span>
                    {index < steps.length - 1 && <span className="workflow-progress__connector" aria-hidden="true" />}
                  </div>
                  <span className="workflow-progress__label">{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="workflow-progress__nav workflow-progress__nav--forward"
          onClick={() => scrollWindow(1)}
          disabled={!canScrollForward}
          aria-label="Show next workflow steps"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="workflow-progress__compact-status" aria-hidden="true">
        <span className="workflow-progress__bar"><span /></span>
        <span className="workflow-progress__count">Step {safeCurrentStep} of {steps.length}</span>
      </div>
    </nav>
  );
}
