# References — annotated bibliography for the paper

> **Companion to** [`PAPER_BRIEF.md`](PAPER_BRIEF.md). This document lists candidate citations for the IHC 2026 Relatos de Experiência submission, grouped by where in the paper they're likely to land. Each entry carries a relevance tag — `primary` (must-cite), `secondary` (likely cite), or `optional` (cite only if room) — and a one- or two-sentence note on WHY it earns its place.

> **What's in `referencias.bib` already.** Entries tagged `primary` or `secondary` whose bibliographic details were verified by the literature-search agents are pre-populated in [`../Referencias/referencias.bib`](../Referencias/referencias.bib) with the BibTeX keys shown here. Entries tagged `optional` or `verify` are listed here only; promote them into `referencias.bib` after confirming the citation against a primary source.

> **Sul Global / Brazilian-community emphasis.** The IHC 2026 rules ([`Regras para nao ser rejeitado o artigo.pdf`](Regras%20para%20nao%20ser%20rejeitado%20o%20artigo.pdf)) explicitly invite Brazilian-community references (IHC anais, JIS, SBIE). This bibliography is intentionally weighted toward SBC OpenLib (SOL) and JIS.

---

## 0. Cheat-sheet — what to cite where

| Paper section | Anchor references |
| --- | --- |
| **§1 Introduction** | [silveira2024praticas], [pereira2024grandihc], [silvajunior2024gc1], [nielsen2024tenheuristics] |
| **§2 Theoretical Background — active learning** | [bonwell1991active], [freeman2014active], [kolb1984experiential] |
| **§2 Theoretical Background — heuristic evaluation** | [nielsen1990heuristic], [nielsen1994heuristic], [nielsen1992finding], [nielsen2024tenheuristics], [abulfaraj2020detailed], [hertzum2003evaluator] |
| **§2 Theoretical Background — HCI teaching in Brazil** | [silveira2024praticas], [boscarioli2013hci], [boscarioli2014charting], [barbosa2010interacao] |
| **§3 Related Work — game-based / gamified HCI teaching (Brazil)** | [geremias2022desvendando] *(direct prior art)*, [sales2020jogosserios], [guimaraes2022avaliacao], [darin2019goople], [miranda2019gamificacao], [santos2025ihcweek], [palomino2024narrative] |
| **§3 Related Work — broader serious-game/gamification anchors** | [dutra2021mapeamento], [carvalho2022mapping], [hamari2014gamification] *(optional)* |
| **§5 Methodology — qualitative analysis** | [bardin2011], [braun2006thematic] |
| **§6 Cuidados Éticos** | [cns466_2012], [cns510_2016], [cns674_2022] |
| **§8 Discussion — alignment with GranDIHC-BR Desafio 1** | [silvajunior2024gc1], [pereira2024grandihc] |

---

## 1. Foundational sources on Nielsen's heuristics

### `nielsen1990heuristic` — Nielsen & Molich 1990 *(primary)*
- Nielsen, J.; Molich, R. *Heuristic Evaluation of User Interfaces.* CHI '90, ACM, pp. 249–256. https://doi.org/10.1145/97243.97281
- Original publication of the heuristic-evaluation method (initial 9-heuristic set). Must be cited when introducing heuristic evaluation as the inspection technique the game teaches.

### `nielsen1992finding` — Nielsen 1992 *(secondary)*
- Nielsen, J. *Finding Usability Problems Through Heuristic Evaluation.* CHI '92, ACM, pp. 373–380. https://doi.org/10.1145/142750.142834
- The novice-vs-specialist-vs-double-expert gap (novices found ~22%, specialists ~41%) — empirical anchor for the claim that learners need scaffolding.

### `nielsen1994heuristic` — Nielsen 1994 *(primary)*
- Nielsen, J. *Heuristic Evaluation.* In *Usability Inspection Methods* (J. Nielsen and R. L. Mack, eds.), John Wiley & Sons, pp. 25–62. ISBN 0-471-01877-5.
- The chapter where the **10-heuristic set** we teach was consolidated. Cite alongside `nielsen1990heuristic` whenever the 10 heuristics are first listed.

### `nielsen2024tenheuristics` — Nielsen 2024 (NN/g article) *(primary)*
- Nielsen, J. *10 Usability Heuristics for User Interface Design.* Nielsen Norman Group. Originally published 24 April 1994; updates 2020 (Moran & Liu) and 30 January 2024. https://www.nngroup.com/articles/ten-usability-heuristics/
- The canonical contemporary phrasing of the 10 heuristics (the version our game's reveal screens follow). Cite as the source of the wording.

---

## 2. Heuristic-evaluation pedagogy (international)

### `abulfaraj2020detailed` — Abulfaraj & Steele 2020 *(primary)*
- Abulfaraj, A.; Steele, A. *Detailed Usability Heuristics: A Breakdown of Usability Heuristics to Enhance Comprehension for Novice Evaluators.* HCII 2020 Late Breaking Papers, LNCS 12423, Springer, pp. 3–18. https://doi.org/10.1007/978-3-030-60114-0_1
- Demonstrates that novices systematically struggle with abstract heuristic descriptions (especially #3 and #7) and proposes more detailed rephrasings. Direct motivation for our paired bad/good scenarios — they are the concrete-example scaffolding their textual rephrasings hint at.

### `hertzum2003evaluator` — Hertzum & Jacobsen 2003 *(secondary)*
- Hertzum, M.; Jacobsen, N. E. *The Evaluator Effect: A Chilling Fact About Usability Evaluation Methods.* International Journal of Human–Computer Interaction, 15(1), 183–204. https://doi.org/10.1207/S15327590IJHC1501_14
- Wide between-evaluator variation when applying the same heuristics — motivates better preparation of learner-evaluators before they conduct inspections.

### `hvannberg2007heuristic` — Hvannberg, Law & Lárusdóttir 2007 *(secondary)*
- Hvannberg, E. Þ.; Law, E. L.-C.; Lárusdóttir, M. K. *Heuristic Evaluation: Comparing Ways of Finding and Reporting Usability Problems.* Interacting with Computers, 19(2), 225–240. https://doi.org/10.1016/j.intcom.2006.10.001
- One of the most cited empirical studies on how heuristic evaluation is taught and practised; flags evaluator training as a key factor influencing inspection outcomes.

---

## 3. HCI teaching in Brazil — non-game pedagogy

### `silveira2024praticas` — Silveira & Gasparini (Eds.) 2024 *(primary)*
- Silveira, M. S.; Gasparini, I. (Eds.). *Práticas de IHC em Sala de Aula.* Série Perspectivas e Práticas Contemporâneas em IHC. SBC, Porto Alegre. ISBN 978-85-7669-609-4. https://doi.org/10.5753/sbc.15609.4
- The advisor's edited collection of 18 classroom-tested HCI teaching practices. **Primary background reference** for any IHC-pedagogy paper from this group; cite as the doorway into the Brazilian HCI-teaching tradition.

### `boscarioli2013hci` — Boscarioli et al. 2013 *(primary)*
- Boscarioli, C.; Bim, S. A.; Silveira, M. S.; Prates, R. O.; Barbosa, S. D. J. *HCI Education in Brazil: Challenges and Opportunities.* HCII 2013, LNCS 8004, Springer, pp. 3–12. https://doi.org/10.1007/978-3-642-39232-0_1
- Consolidated picture of HCI teaching in Brazil (curriculum, WEIHC, community surveys). Doubles as an international and Sul-Global anchor.

### `boscarioli2014charting` — Boscarioli et al. 2014 *(secondary)*
- Boscarioli, C.; Silveira, M. S.; Prates, R. O.; Bim, S. A.; Barbosa, S. D. J. *Charting the Landscape of HCI Education in Brazil.* HCII 2014, LNCS 8510, Springer, pp. 177–186. https://doi.org/10.1007/978-3-319-07233-3_17
- Maps how HCI courses are configured nationally — situates where heuristic-evaluation teaching fits in Brazilian curricula.

### `melo2024praticasextensionistas` — Melo & Coleti (Eds.) 2024 *(secondary)*
- Melo, A. M.; Coleti, T. A. (Eds.). *Práticas de IHC em Sala de Aula: Ações Extensionistas em Pauta.* Série Perspectivas e Práticas Contemporâneas em IHC. SBC, Porto Alegre. ISBN 978-85-7669-618-6. https://doi.org/10.5753/sbc.16218.6
- Companion volume to Silveira & Gasparini 2024, focused on extension-based HCI teaching. Useful supplementary reference; one chapter (Palomino et al.) is directly adjacent to our work.

### `menezes2020ensino` — Menezes & Miranda 2020 *(secondary)*
- Menezes, B. C.; Miranda, L. C. *Ensino de Design de IHC: Um Panorama sobre a Análise e Modelagem de Usuários, Tarefas e Interação.* Anais Estendidos do XIX IHC (WEIHC), SBC, pp. 25–30. https://doi.org/10.5753/ihc.2020.14050
- Recent Brazilian survey of which HCI-design topics are actually taught — useful for situating heuristic evaluation in current course content.

### `barbosa2010interacao` — Barbosa & Silva 2010 *(secondary)*
- Barbosa, S. D. J.; Silva, B. S. *Interação Humano-Computador.* Série SBC. Elsevier / Campus, Rio de Janeiro. ISBN 978-85-352-3418-3.
- Brazilian-Portuguese reference textbook used in many IHC undergraduate courses, with a chapter on heuristic evaluation. Cite for what students typically encounter as the textbook treatment.

---

## 4. Game-based and gamified teaching of HCI — Brazilian community (the core of our related work)

### `geremias2022desvendando` — Geremias et al. 2022 *(primary)*
- Geremias, M. S.; Serpa, P. H.; Froehner, I. S.; Gasparini, I. *Desvendando as Heurísticas de Nielsen: Um Jogo Educacional como ferramenta para o ensino em IHC.* Anais do XIII WEIHC, SBC, pp. 1–6. https://doi.org/10.5753/weihc.2022.227550
- **Closest prior art — must-cite and must position against.** A Brazilian *board* game (Imagem-e-Ação style) for teaching Nielsen's heuristics. Our work occupies the same niche but as a *web/digital* artefact with paired interactive bad/good scenarios. Explicitly differentiate in Related Work.

### `sales2020jogosserios` — Sales & Silva 2020 *(primary)*
- Sales, A. B.; Silva, M. A. S. *Jogos Sérios no Processo de Ensino e Aprendizagem de Interação Humano-Computador.* Anais do XXXI SBIE, SBC, pp. 552–561. https://doi.org/10.5753/cbie.sbie.2020.552
- Systematic literature review of serious games for HCI teaching — establishes that the area is sparse, motivating new contributions like ours.

### `guimaraes2022avaliacao` — Guimarães et al. 2022 *(primary)*
- Guimarães, A. A.; Sales, A. B.; Santos, B. A.; Palmeira, E. G. Q. *Avaliação de Características de Usabilidade em Jogos Sérios em Interação Humano-Computador.* Anais do XXXIII SBIE, SBC, pp. 505–516. https://doi.org/10.5753/sbie.2022.225155
- Comparative usability evaluation of three Brazilian HCI-teaching serious games (MACteaching, UsabilityGame, UsabiliCity). Useful benchmark for positioning a new artefact in the same family.

### `darin2019goople` — Darin et al. 2019 *(primary)*
- Darin, T.; Rocha, F.; Motta, D.; Angelo, P. V. *Desafio de Design Goople: Um Jogo de Cartas para Apoio ao Ensino do Design de Interação e Conceitos Básicos de Interação Humano-Computador.* Anais Estendidos do XVIII IHC (WEIHC), SBC, pp. 100–105. https://doi.org/10.5753/ihc.2019.8408
- Brazilian IHC card game for teaching interaction design basics — parallel design + experience-report framing.

### `miranda2019gamificacao` — Miranda et al. 2019 *(primary)*
- Miranda, P.; Viana, J.; Nascimento, E.; Portela, C. *O Uso de Estratégias de Gamificação em uma Disciplina de IHC: Um Relato de Experiência.* Anais Estendidos do XVIII IHC (WEIHC), SBC, pp. 94–99. https://doi.org/10.5753/ihc.2019.8407
- Brazilian experience report on gamifying an HCI course — same venue type (Relatos / WEIHC) as our submission. Useful model for how to write the relato.

### `santos2025ihcweek` — Santos et al. 2025 *(primary)*
- Santos, J. K.; Oliveira, A. L.; Crisóstomo, T.; Florencio, D.; Rodrigues, L.; Fontes, G.; Darin, T. *IHC Week: Ensino de Conteúdos Teórico-Práticos de IHC por Meio de Workshops Gamificados.* Anais Estendidos do XXIV IHC, SBC, pp. 93–98. https://doi.org/10.5753/ihc_estendido.2025.13027
- Most recent (2025) Brazilian gamified HCI teaching initiative — shows ongoing community interest and provides a contemporary anchor.

### `rodrigues2025dossies` — Rodrigues et al. 2025 *(secondary)*
- Rodrigues, L.; Fontes, G.; Oliveira, A. L.; Florencio, D.; Crisóstomo, T.; Santos, J. K.; Darin, T. *Dossiês Investigativos no Ensino de IHC: O Uso de Materiais Físicos como Estratégia Lúdica.* Anais Estendidos do XXIV IHC, SBC, pp. 63–67. https://doi.org/10.5753/ihc_estendido.2025.13028
- Companion 2025 piece from the UFC/Darin group. Reinforces that playful/lúdico approaches are a current trend in BR-IHC pedagogy.

### `bim2019pontes` — Bim et al. 2019 *(secondary)*
- Bim, S. A.; Oliveira, O.; Stori Junior, G. *Construindo pontes entre academia, indústria e governo: uma experiência de sucesso no ensino de Avaliação em IHC.* Anais Estendidos do XVIII IHC (WEIHC), SBC, pp. 76–81. https://doi.org/10.5753/ihc.2019.8404
- Experience report on teaching the *Evaluation in HCI* topic specifically — same course-context as ours.

### `dutra2021mapeamento` — Dutra et al. 2021 *(secondary)*
- Dutra, T. C.; Tondorf, D. F.; Zils, T. A.; Ferreira, A. E. G.; Gasparini, I.; Hounsell, M. S.; Maschio, E. *Métodos de avaliação de IHC no contexto de Jogos Sérios Educacionais: Um Mapeamento Sistemático.* Anais do XXXII SBIE, SBC, pp. 564–575. https://doi.org/10.5753/sbie.2021.217450
- Mapping of how serious educational games are evaluated — supports our qualitative-first evaluation design choice.

### `carvalho2022mapping` — Carvalho et al. 2022 *(secondary)*
- Carvalho, C.; Teran, L.; Mota, M.; Pereira, R. *A Systematic Mapping Study on Digital Game Adaptation Dimensions.* IHC 2022, ACM. https://doi.org/10.1145/3554364.3559122
- The "systematic mapping on digital game adaptation dimensions" the IHC 2026 site itself flags as a useful anchor on dimensions of game adaptation.

### `palomino2024narrative` — Palomino & Isotani 2024 *(secondary)*
- Palomino, P.; Isotani, S. *Enhancing User Experience in Learning Environments: a Narrative Gamification Framework for Education.* Journal on Interactive Systems, 15(1), 478–489. https://doi.org/10.5753/jis.2024.4083
- Recent JIS paper framing narrative + gamification for learning. Supports our use of narrated scenarios + lightweight gamification as engagement scaffolding.

### `silva2023learners` — Silva, Guerino & Valentim 2023 *(secondary)*
- Silva, D. E. S.; Guerino, G. C.; Valentim, N. M. C. *Analyzing the Learners' Experience of an Experimental HCI Course in a Remote Context.* Journal on Interactive Systems, 14(1), 341–353. https://doi.org/10.5753/jis.2023.3243
- Brazilian JIS study on learner experience in an HCI course — methodological reference for qualitative evaluation of a teaching artefact.

### `juca2017g4h` — Jucá, Monteiro & Souza Filho 2017 *(optional)*
- Jucá, P. M.; Monteiro, I. T.; Souza Filho, J. C. *Game for Heuristic Evaluation (G4H): A Serious Game for Collaborative Evaluation of Systems.* In *Design, User Experience, and Usability* (A. Marcus, W. Wang, eds.), LNCS 10288, Springer, pp. 312–326. https://doi.org/10.1007/978-3-319-58071-5_26
- Brazilian-authored card game for *performing* heuristic evaluation (not teaching it). Useful contrast: G4H gamifies the evaluation activity, while our game teaches the heuristics that enable evaluation.

### `hamari2014gamification` — Hamari, Koivisto & Sarsa 2014 *(optional)*
- Hamari, J.; Koivisto, J.; Sarsa, H. *Does Gamification Work? — A Literature Review of Empirical Studies on Gamification.* HICSS-47, IEEE, pp. 3025–3034. https://doi.org/10.1109/HICSS.2014.377
- Single canonical international citation to ground the gamification framing if we want one non-Brazilian anchor for the gamification claim.

### `andrade2025testmemory` — Andrade et al. 2025 *(optional)*
- Andrade, F. A.; Lima, I.; Santos, W.; Rabelo, J. *Test Memory: Um Jogo para o Ensino de Testes de Software na Disciplina de Verificação e Validação da UFC Campus Russas.* Anais do XXIV SBGames, SBC, pp. 1898–1909. https://doi.org/10.5753/sbgames.2025.10350
- Adjacent CS-education experience report (software testing, not HCI) — uses MEEGA+ for evaluation. A possible methodological model if we expand evaluation in future work.

### *Verify* — `sommariva2011usabilitygame` *(verify before citing)*
- Sommariva, L.; Benitti, F. B. V.; Dalcin, T. *UsabilityGame: jogo simulador para apoio ao ensino de usabilidade.* IHC 2011 / CLIHC 2011. **Citation needs verification from a primary PDF source — the ResearchGate page was inaccessible.** Cited extensively in `sales2020jogosserios` and `guimaraes2022avaliacao`.
- Foundational Brazilian usability-teaching serious game; commonly grouped with UsabiliCity and MACteaching as the original family of BR HCI-teaching games.

### *Verify* — `brito2017macteaching` *(verify before citing)*
- Brito, R.; Fernandes, M.; Queiroz, W.; Souza, B.; Bonifácio, B.; Fernandes, P. *MACTeaching: Uma Abordagem para Enriquecer o Ensino do Método de Avaliação de Comunicabilidade.* WCBIE/CBIE 2017. https://www.br-ie.org/pub/index.php/wcbie/article/view/7378
- Brazilian serious game for teaching the Communicability Evaluation Method. Pages/year need confirmation from a primary source.

---

## 5. Active / experiential learning

### `bonwell1991active` — Bonwell & Eison 1991 *(primary)*
- Bonwell, C. C.; Eison, J. A. *Active Learning: Creating Excitement in the Classroom.* ASHE-ERIC Higher Education Report No. 1. The George Washington University, School of Education and Human Development. ERIC: ED336049.
- Canonical foundational definition of active learning in higher education. Safe historical anchor for the pedagogical framing of a game-based heuristics activity.

### `freeman2014active` — Freeman et al. 2014 *(secondary)*
- Freeman, S.; Eddy, S. L.; McDonough, M.; Smith, M. K.; Okoroafor, N.; Jordt, H.; Wenderoth, M. P. *Active Learning Increases Student Performance in Science, Engineering, and Mathematics.* PNAS, 111(23), 8410–8415. https://doi.org/10.1073/pnas.1319030111
- Large STEM meta-analysis showing measurable gains from active learning over lecturing. Pairs with Bonwell & Eison to bring the active-learning citation up to date.

### `kolb1984experiential` — Kolb 1984 *(secondary)*
- Kolb, D. A. *Experiential Learning: Experience as the Source of Learning and Development.* Prentice-Hall, Englewood Cliffs, NJ.
- The experience–reflection–conceptualisation–experimentation cycle. Cite if we frame the game as a concrete-experience anchor for subsequent reflection on heuristics (which is exactly what the narrator-after step is doing).

### `sharp2023interaction` — Sharp, Preece & Rogers 2023 *(optional)*
- Sharp, H.; Preece, J.; Rogers, Y. *Interaction Design: Beyond Human–Computer Interaction* (6th ed.). John Wiley & Sons. ISBN 978-1-119-90109-9.
- Canonical international HCI textbook. Useful for the "what students are typically asked to learn" framing if we need an international curricular anchor.

---

## 6. Grandes Desafios de IHC no Brasil (2025–2035)

### `pereira2024grandihc` — Pereira, Darin & Silveira 2024 *(primary)*
- Pereira, R.; Darin, T.; Silveira, M. S. *GranDIHC-BR: Grand Research Challenges in Human-Computer Interaction in Brazil for 2025-2035.* Anais do XXIII IHC, SBC, pp. 915–938. https://sol.sbc.org.br/index.php/ihc/article/view/32921
- The umbrella paper introducing all seven GranDIHC-BR challenges. Cite once when first mentioning the Grandes Desafios.

### `silvajunior2024gc1` — Silva Junior et al. 2024 (GC1) *(primary)*
- Silva Junior, D. P.; Alves, D. D.; Carneiro, N.; Matos, E. S.; Baranauskas, M. C. C.; Mendoza, Y. L. M. *GranDIHC-BR 2025-2035 — GC1: New Theoretical and Methodological Approaches in HCI.* Anais do XXIII IHC, SBC, pp. 939–968. https://sol.sbc.org.br/index.php/ihc/article/view/32922
- Calls for methodological experimentation in Brazilian HCI (phenomenological perspectives, multidisciplinary borrowing, new evaluation techniques). **Direct hook for our qualitative-first, game-based teaching report.** Cite explicitly in Discussion.

### `duarte2024gc6` — Duarte et al. 2024 (GC6) *(optional)*
- Duarte, E. F. et al. *GranDIHC-BR 2025-2035 — GC6: Implications of Artificial Intelligence in HCI.* Anais do XXIII IHC, SBC, pp. 1027–1045. https://sol.sbc.org.br/index.php/ihc/article/view/32926
- Only cite if the paper ends up framing AI-assisted teaching or AI-mediated reflection on heuristics. Default: omit.

---

## 7. Methodology — qualitative analysis

### `bardin2011` — Bardin 2011 *(primary)*
- Bardin, L. *Análise de Conteúdo.* Edições 70, São Paulo, 279 p. ISBN 978-85-62938-04-7.
- The default Brazilian reference for qualitative content analysis of textual data (pre-analysis, exploration, treatment/inference). Best fit for the methodology framing of our open-ended Google Form responses.

### `braun2006thematic` — Braun & Clarke 2006 *(secondary)*
- Braun, V.; Clarke, V. *Using Thematic Analysis in Psychology.* Qualitative Research in Psychology, 3(2), 77–101. https://doi.org/10.1191/1478088706qp063oa
- International canonical six-phase thematic-analysis protocol. Useful as a second anchor in an international HCI vocabulary.

### `hsieh2005three` — Hsieh & Shannon 2005 *(optional)*
- Hsieh, H.-F.; Shannon, S. E. *Three Approaches to Qualitative Content Analysis.* Qualitative Health Research, 15(9), 1277–1288. https://doi.org/10.1177/1049732305276687
- Disambiguates conventional / directed / summative content analysis. Cite only if the methodology section explicitly names "conventional content analysis" to justify inductive coding.

---

## 8. Ethics — for the Cuidados Éticos section

### `cns466_2012` — CNS Resolução 466/2012 *(primary)*
- Conselho Nacional de Saúde. *Resolução nº 466, de 12 de dezembro de 2012. Aprova as diretrizes e normas regulamentadoras de pesquisas envolvendo seres humanos.* Ministério da Saúde, Brasília, DF. https://bvsms.saude.gov.br/bvs/saudelegis/cns/2013/res0466_12_12_2012.html
- Baseline Brazilian ethics framework for any research involving humans.

### `cns510_2016` — CNS Resolução 510/2016 *(primary)*
- Conselho Nacional de Saúde. *Resolução nº 510, de 7 de abril de 2016. Dispõe sobre as normas aplicáveis a pesquisas em Ciências Humanas e Sociais.* Diário Oficial da União, 24 maio 2016. https://www.in.gov.br/materia/-/asset_publisher/Kujrw0TZC2Mb/content/id/22917581
- The specific ethics resolution for Humanities/Social Sciences research — the correct primary citation for an educational experience report with open-ended responses.

### `cns674_2022` — CNS Resolução 674/2022 *(primary)*
- Conselho Nacional de Saúde. *Resolução nº 674, de 6 de maio de 2022. Dispõe sobre a tipificação da pesquisa e a tramitação dos protocolos de pesquisa no Sistema CEP/Conep.* https://www.gov.br/conselho-nacional-de-saude/pt-br/atos-normativos/resolucoes/2022/resolucao-no-674.pdf
- Current rules for classifying research risk and routing protocols through CEP/Conep. Required citation in Cuidados Éticos.

---

## 9. Landscape summary — where our paper fits

Across the three searches, the literature landscape lines up cleanly with what `PAPER_BRIEF.md` predicts:

- **Foundational heuristic-evaluation references** (Nielsen 1990/1992/1994 + NN/g 2024) are well-defined and stable; cite the standard pair.
- **Heuristic-evaluation pedagogy** is comparatively thin internationally — a handful of papers (Nielsen 1992 on the novice gap; Hertzum & Jacobsen 2003 on the evaluator effect; Hvannberg et al. 2007 on training effects; Abulfaraj & Steele 2020 on rewording heuristics for novices) converge on "abstract heuristics are hard for novices", but the proposed fixes are textual rather than experiential. Our paired bad/good scenarios sit in the empirical gap their textual rephrasings hint at.
- **Brazilian HCI teaching pedagogy** has matured through two SBC OpenLib edited volumes (Silveira & Gasparini 2024; Melo & Coleti 2024), the Boscarioli/Silveira/Prates/Bim/Barbosa survey papers (2013, 2014), and ongoing WEIHC contributions — but most published practices target other topics (personas, design thinking, accessibility) rather than the 10 heuristics specifically.
- **Game-based / gamified teaching of HCI in Brazil** is a recognisable but still-thin niche. The closest direct prior art is `geremias2022desvendando` (a 2022 WEIHC board game for teaching the heuristics) — our paper must position against it explicitly. Around it sits a small canon (UsabilityGame, UsabiliCity, MACteaching, G4H) reviewed systematically in `sales2020jogosserios` and benchmarked in `guimaraes2022avaliacao`. The UFC/Darin group's recent 2024–2025 work (Santos et al. 2025, Rodrigues et al. 2025) confirms that playful artefacts for HCI teaching remain an active community thread.
- **Grandes Desafios alignment**: Desafio 1 (Novas Abordagens Teóricas e Metodológicas) is a strong, natural hook — methodological experimentation is exactly what this paper is. One Discussion paragraph is warranted; Desafio 6 (AI) is optional and only if we make AI a substantive part of the contribution.

The plausible gap our paper fills: **no published Brazilian experience report on a web-based, scenario-based educational game for Nielsen's heuristics, deployed in an actual evaluation course and qualitatively evaluated.** Existing artefacts are either physical (board/card games), target different HCI methods (MAC, requirements, design), or gamify the evaluation activity itself (G4H) rather than the heuristics behind it.

---

## 10. Open verification tasks before final submission

1. **`sommariva2011usabilitygame`** — confirm full citation (IHC 2011 vs CLIHC 2011 vs other; exact pages) from a primary PDF source. Currently cited indirectly through `sales2020jogosserios` and `guimaraes2022avaliacao`.
2. **`brito2017macteaching`** — confirm exact pages from br-ie.org; ensure the year (2017) is correct.
3. **`nielsen1994heuristic`** — confirm the page range (25–62) against a print/library copy of *Usability Inspection Methods* (Nielsen & Mack, eds., Wiley 1994). The page range we have matches multiple cited sources but is worth double-checking.
4. **`barbosa2010interacao`** — confirm publisher (Elsevier vs Campus; SBC série SBC). The book is sometimes listed under both imprints.
5. **`bardin2011`** — confirm the Brazilian edition's year (2011 is most commonly cited; some Brazilian works cite the 1977 French original; pick the edition our methodology section will actually quote from).
6. **`silveira2024praticas`** — when the paper is camera-ready and de-anonymised, verify whether the advisor wants to be cited as `Silveira, M. S. and Gasparini, I. (Eds.)` or with all chapter authors listed individually for specific chapter citations.
