# UKIS Hackathon Feature

## Problem owner metadata

Every problem must declare the organisation whose challenge it represents through `problemOwnerId` in [`lib/data.ts`](./lib/data.ts). Problem owners can be government departments, companies or institutions. Current owners are registered in [`lib/problem-owners.ts`](./lib/problem-owners.ts), with government department details maintained in [`lib/departments.ts`](./lib/departments.ts).

The problem owner is the organisation presenting the challenge and available for domain conversations or introductions facilitated by UKIS. It is separate from the optional `sponsor` field, which identifies a company or programme providing financial, technical or operational support.

When adding a problem:

1. Select exactly one existing `ProblemOwnerId` as the problem owner.
2. Add a missing government department to `lib/departments.ts`, or another organisation to `lib/problem-owners.ts`.
3. Use an official organisation URL. Leave `url` unset when no verified URL has been supplied.
4. Keep organisation logos optional. Add them only from official, reusable assets and preserve their original aspect ratios.

## Current problem owners

| Problem | Problem owner |
| --- | --- |
| P-001 Government Knowledge Repository | Information Technology Development Agency (I.T.D.A) |
| P-002 DPR and RFP Generation | Budget Department |
| P-003 Beneficiary Data Governance | Social Welfare Department |
| P-004 Civic Cleanliness and Encroachment | State Water & Sanitation Mission |
| P-005 Traffic, Parking and Congestion | Transport Department |
| P-006 Public Infrastructure Hazards | Public Works Department |
| P-007 Crowd and Event Safety | Police Department |
| P-008 Disaster and Infrastructure Assessment | Disaster Mitigation and Management Centre (DMMC) |
| P-009 Forest Health and Fire | Forest Department |
| P-010 Wildlife and Human-Conflict | Forest Department |
| P-011 Mountain Disaster Early Warning | Disaster Mitigation and Management Centre (DMMC) |
| P-012 Geospatial Urban Planning | Town and Country Planning Department |

## Uttarakhand department directory

This directory was supplied for use when categorising hackathon problems. Entries marked "Not supplied" intentionally have no URL in the runtime directory.

| Department | Official website |
| --- | --- |
| Agriculture Department, Uttarakhand | https://agriculture.uk.gov.in/ |
| Animal Husbandry Department, Uttarakhand | https://ahd.uk.gov.in/ |
| Board of Revenue Department, Uttarakhand | https://bor.uk.gov.in/ |
| Budget Department, Uttarakhand | https://budget.uk.gov.in/ |
| Cane Development and Sugar Industry Department, Uttarakhand | https://sugarcane.uk.gov.in/ |
| Co-operative Department, Uttarakhand | https://cooperative.uk.gov.in/ |
| Dairy Development Department, Uttarakhand | https://dairyvikasuttarakhand.in/ |
| Directorate of Departmental Accounts, Uttarakhand | https://dda.uk.gov.in/ |
| Directorate of Training & Employment, Uttarakhand | https://rojgar.uk.gov.in/ |
| Disaster Mitigation and Management Centre (DMMC), Uttarakhand | Not supplied |
| Entertainment Tax Department, Uttarakhand | Not supplied |
| Excise Department, Uttarakhand | https://excise.uk.gov.in/ |
| Fisheries Department, Uttarakhand | https://fisheries.uk.gov.in/ |
| Food, Civil Supplies & Consumer Affairs Department, Uttarakhand | https://fcs.uk.gov.in/ |
| Forest Department, Uttarakhand | Not supplied |
| Higher Education Department, Uttarakhand | https://he.uk.gov.in/ |
| Information Technology Development Agency (I.T.D.A), Uttarakhand | Not supplied |
| Information and Public Relation Department, Uttarakhand | https://uttarainformation.gov.in/ |
| Irrigation Department, Uttarakhand | https://irrigation.uk.gov.in/ |
| Labour Department, Uttarakhand | https://labour.uk.gov.in/ |
| Medical Education Department, Uttarakhand | https://medicaleducation.uk.gov.in/ |
| Medical Health and Family Welfare Department, Uttarakhand | https://health.uk.gov.in/ |
| Minor Irrigation Department, Uttarakhand | https://minorirrigation.uk.gov.in/ |
| Minority Welfare Department, Uttarakhand | https://minoritywelfare.uk.gov.in/ |
| Panchayati Raj Department, Uttarakhand | https://ukpanchayat.in/ |
| Police Department, Uttarakhand | Not supplied |
| Prison Department, Uttarakhand | https://prison.uk.gov.in/ |
| Public Works Department, Uttarakhand | https://pwd.uk.gov.in/ |
| Registrar of Firms, Societies and Chits, Uttarakhand | https://society.uk.gov.in/ |
| Renewable Energy Development Agency, Uttarakhand | https://ureda.uk.gov.in/ |
| Rural Development Department, Uttarakhand | https://ukrdd.uk.gov.in/ |
| Rural Works Department, Uttarakhand | https://res.uk.gov.in/ |
| Sanskrit Education Department, Uttarakhand | https://sanskriteducation.uk.gov.in/ |
| School Education Department, Uttarakhand | https://schooleducation.uk.gov.in/ |
| Secretariat Administration Department, Uttarakhand | https://sad.uk.gov.in/ |
| Sericulture Department, Uttarakhand | https://silk.uk.gov.in/ |
| Social Welfare Department, Uttarakhand | https://socialwelfare.uk.gov.in/ |
| Sports Department, Uttarakhand | https://sports.uk.gov.in/ |
| Stamps and Registration Department, Uttarakhand | https://registration.uk.gov.in/ |
| State Council for Science and Technology, Uttarakhand | https://ucost.uk.gov.in/ |
| State Horticulture Mission, Uttarakhand | https://shm.uk.gov.in/ |
| State Tax Department, Uttarakhand | https://comtax.uk.gov.in/ |
| State Water & Sanitation Mission, Uttarakhand | https://swsm.uk.gov.in/ |
| Tourism Department, Uttarakhand | Not supplied |
| Town and Country Planning Department, Uttarakhand | https://tcp.uk.gov.in/ |
| Transport Department, Uttarakhand | https://transport.uk.gov.in/ |
| Twenty Point Programme, Uttarakhand | https://20pt.uk.gov.in/ |
| Uttarakhand Jal Sansthan Department, Uttarakhand | https://ujs.uk.gov.in/ |
| Vigilance Establishment, Uttarakhand | https://vigilance.uk.gov.in/ |
| Women Empowerment and Child Development Department, Uttarakhand | https://wecd.uk.gov.in/ |