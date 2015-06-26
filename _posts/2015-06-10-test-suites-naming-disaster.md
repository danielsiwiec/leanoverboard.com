---
title: 'Test suites naming disaster'
draft: true
category: programming
tags:
  - testing
  - consulting
---

At my last client, a multi-billion dollar healthcare organization, the landscape consisted of numerous recently created teams, together forming a bigger group within the IT department engaged in a replatforming initiative. Part of our job was to establish modern software practices within the group, including testing standards.

Some teams at the company have already been writing automated tests of various kind. Mostly they didn't differentiate between different kinds of tests like unit or contract, thus often misinterpreted their purpose. Other teams maintained a list of scenarios for manual execution, usually taking days of strenuous manual labor, often conducted by QAs external to the dev team. This state of automated testing caused a couple problems:

1. Lack of test kinds separation obstructs the meaning of test failure
2. Non comprehensive test coverage means little confidence and need for extensive manual tests
3. Lack of uniform QA approach across teams means custom development to production process and increased complexity from a program management perspective
4. Hindered communication between teams due to varying practices and non uniform vocabulary

The goal was to create guidelines for teams to follow and explain differences in purpose of all test kinds using examples based on existing codebase. As a by product, the group would gain a common vocabulary to discuss quality topics.


Otherwise nearly impossible task of retrofitting the whole testing infrastructure into new guidelines was made simpler thanks to the codebase being 'young' and still quite small (~5 kLOC/team).
