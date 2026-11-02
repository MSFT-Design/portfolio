## Context

At Achievers, he led product design and system architecture across a multi-product SaaS platform used by enterprise organizations including Barclays, General Motors, Samsung, and Scotiabank.

The platform supported recognition, rewards, surveys, and internal commerce. Each client required customization while maintaining a consistent and accessible experience.

This work reflects an early focus on design systems as infrastructure, shaping how products are built and scaled.

## Problem

The platform needed to balance flexibility and consistency.

Challenges included:
- Supporting multiple enterprise clients with different branding
- Maintaining accessibility across all configurations
- Reducing fragmentation across features and teams

## Approach

Decisions were grounded in both data and direct user feedback.

- Telemetry identified friction in high-frequency workflows
- Interviews with admins and employees validated behavioral patterns
- Prioritization focused on reducing friction rather than adding features

## System Design

A layered design system was introduced:

**Foundation Layer**  
Tokens defining color, spacing, and typography

**Semantic Layer**  
Mapped design intent to tokens, enabling theming and adaptability

**Component Layer**  
Reusable components designed for scalability across products

A theming system enforced accessibility constraints, ensuring all client configurations met contrast and usability standards.

## Key Features

**Reporting Experience**  
Redesigned to prioritize clarity over density. Data was structured to surface actionable insights quickly.

**Profile and Social Feed**  
Unified recognition history, feedback, and rewards. Feed ranking prioritized relevance based on proximity and engagement.

## Outcome

- Improved usability across core workflows
- Reduced system fragmentation
- Enabled consistent scaling across enterprise clients

## Reflection

Systems must balance flexibility with constraint. Without guardrails, customization leads to inconsistency.

Clear data presentation directly impacts decision quality.

Investing in system foundations compounds over time.