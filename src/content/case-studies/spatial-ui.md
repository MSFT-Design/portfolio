## Context

As part of Microsoft Teams core design, he led spatial design for the first Teams experience on Apple Vision Pro. This work extended beyond adapting existing UI. It required defining how a widely used collaboration product behaves within a spatial computing environment.

The effort built on an established design system foundation within Teams. That foundation made it possible to translate existing interaction patterns into spatial equivalents without fragmenting the experience.

He operated as the primary design lead within a cross-functional team of engineers and product partners, defining system-level principles that guided both implementation and future platform expansion.

## Problem

Traditional interface models do not translate directly into spatial environments. Concepts such as windows, layering, and navigation require reinterpretation when content exists in three-dimensional space.

The challenge was to create a system that:
- Feels native to spatial computing
- Preserves familiarity for existing Teams users
- Scales across multiple scenarios without introducing inconsistency

## Approach

The work began with defining first principles rather than designing screens.

Key areas of exploration:
- Spatial hierarchy and depth relationships
- Focus and peripheral awareness
- Motion and transition behavior
- Accessibility in three-dimensional environments

These principles were tested through rapid prototyping and alignment sessions with engineering to ensure feasibility and consistency.

## System Design

A layer-based model was established to structure all spatial interactions:

**Content Layer**  
Primary focus area for tasks such as meetings, chat, and collaboration

**Utility Layer**  
Persistent controls that remain accessible without interrupting focus

**Peripheral Layer**  
Secondary information that supports awareness without competing for attention

A compatibility layer was introduced to translate existing 2D components into spatial equivalents. This avoided duplication and ensured alignment with the broader Teams system.

Accessibility constraints were defined at the system level, including depth pairing rules to maintain readability and reduce visual strain.

## Outcome

The experience shipped at Apple Vision Pro launch.

The system enabled:
- Consistent spatial behavior across features
- Reduced ambiguity during engineering implementation
- Faster iteration through shared principles

The model has since informed additional teams exploring spatial computing within Microsoft.

## Reflection

New platforms require systems, not isolated solutions. Establishing clear constraints early enabled the team to move quickly without compromising consistency.

Accessibility acted as a structural advantage. Defining it upfront improved every aspect of the experience.

Strong system definitions reduced coordination overhead and allowed teams to operate with greater autonomy.