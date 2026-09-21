# Roadmap

This repository grows when a reusable pattern emerges from real application work and is worth maintaining in both implementations.

## Near-term

- Add interaction-focused automated tests for the highest-value responsive components.
- Add more accessibility regression coverage as interactive patterns grow.
- Continue documenting cross-framework API differences when they are meaningful.

## Possible future exploration

- Evaluate whether a lightweight package build would improve reuse across projects.
- Evaluate an additional framework implementation only if a real project creates a reason to maintain it.
- Add CI when the automated test surface is large enough to provide useful signal.

Publishing and monorepo orchestration remain intentionally deferred until they solve a concrete reuse problem.


## Recently added
- Button primitive with consistent variants and loading state.
- Alert primitive for inline feedback.
- Card primitive for reusable surface treatment.
