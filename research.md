---
layout: default
title: Research
description: Research themes and current aims for RCP Lab.
permalink: /research/
---

# Research

The RCP Lab studies natural behavior through the Resource-rational Context-dependent POMDP
framework. The central question is how agents act adaptively when the world is only partially
observable, goals or environments can change, and optimal solutions are computationally expensive.

## Framework

Natural behavior depends on three linked computations:

- **Perception:** inferring hidden causes of sensory observations.
- **Learning:** updating internal models from feedback and experience.
- **Planning:** choosing actions that maximize expected future utility.

We study these computations as part of one adaptive inference system, constrained by context,
uncertainty, and limited computational resources.

## Aim 1: Perception and Learning

Natural scenes contain many objects whose depth, support, grouping, and motion relationships must be
inferred from noisy cues. This aim asks how learned object relationships guide perception, how inferred
perceptual structure guides learning, and how these processes scale as scenes become more complex.

The work uses multi-cue scenes and structure-dependent illusions to test how new statistical
expectations shape percepts, and how cue agreement or conflict changes the learning of latent
relations.

## Aim 2: Perception and Planning

Perception provides the beliefs on which actions rely, but actions can also refine those beliefs. This
aim studies reaching and control tasks where targets or cursors are hidden, forcing participants to
integrate uncertain evidence and choose actions that can reduce uncertainty.

The long-term goal is to understand how people jointly infer hidden state, context, and the value of
information-seeking actions.

## Aim 3: Learning and Planning

Learning builds the internal models that support action, and planning shapes the future experience
from which learning proceeds. This aim studies structured motor environments with multiple local
contexts and changing dynamics.

The work asks how learned memories are composed for flexible planning, how active exploration
accelerates learning, and how people detect and localize changes in a structured environment.

## Applications

The research program is designed to generate testable neural predictions, clinical markers for altered
inference and control, machine-learning benchmarks for active sensing and continual learning, and
industrial applications in robotics and adaptive control.

<p class="note">
  The detailed six-page research proposal is available here:
  <a href="{{ site.proposal_pdf | relative_url }}">Research_statement_iitgn.pdf</a>.
</p>
