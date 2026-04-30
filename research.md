---
layout: default
title: Research
description: Research framework for RCP Lab.
permalink: /research/
---

# Research

The RCP Lab studies natural behavior through the Resource-rational Context-dependent POMDP
framework (RCP Framework). The central question is how agents act adaptively when the world is only partially
observable, goals or environments can change, and optimal solutions are computationally expensive.

## RCP Framework

<img class="research-figure" src="{{ '/resources/research_proposal.png' | relative_url }}" alt="RCP framework">

Natural behavior depends on three linked computations:

- **Perception:** inferring hidden causes of sensory observations.
- **Learning:** updating internal models from feedback and experience.
- **Planning:** choosing actions that maximize expected future utility.

Behavior requires these computations in order to tackle three central challenges that the brain faces:

- **Behavior under uncertainty:** the world is only partially observable, so agents must infer hidden
  states from noisy and incomplete observations. POMDPs provide a formal language for studying how
  beliefs guide action under uncertainty.
- **Behavior under non-stationarity:** environments, goals, and task rules change over time, so
  agents must infer which context is active and adapt their internal models accordingly. Contextual
  inference provides a way to study flexible behavior in changing environments.
- **Behavior under limited computational resources:** exact solutions are often too expensive, so
  agents must balance performance with computational, energetic, and representational costs.
  Resource-rational models ask which approximations are useful, and why.

The lab brings these ideas together to study how perception, learning, and planning interact as one
adaptive inference system.

## Applications

The research program is designed to generate testable neural predictions, behavioral differences in clinical populations, and robust machine-learning algorithms.
