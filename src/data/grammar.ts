import { Continent, GrammarPoint, ExamLevel } from '../types';

// Raw EGP CSV Data
const RAW_CSV = `id,level,exam,category,categoryCn,icon,title,desc,example,tags
0,A1,KET,Tenses & Aspect,时态与体,⏱,Present Simple,"Habits, routines, facts, permanent states",She works in a hospital. I don't like coffee.,form; use; frequency
1,A1,KET,Tenses & Aspect,时态与体,⏱,Present Continuous,"Actions happening now, temporary situations",I'm reading a book right now.,now; temporary
2,A1,KET,Tenses & Aspect,时态与体,⏱,Past Simple (Regular),Completed actions in the past with regular -ed verbs,I walked to school yesterday.,regular; past
3,A1,KET,Tenses & Aspect,时态与体,⏱,Past Simple (Irregular),Completed past actions with common irregular verbs,She went to Paris last year.,irregular; past
4,A1,KET,Tenses & Aspect,时态与体,⏱,Imperative,"Commands, instructions, requests",Open the door. Don't touch that.,commands
5,A2,KET,Tenses & Aspect,时态与体,⏱,Past Continuous,"Actions in progress at a specific past time, background actions",I was sleeping when you called.,background; interrupted
6,A2,KET,Tenses & Aspect,时态与体,⏱,Present Perfect Simple (Introduction),"Experiences, unfinished time, recent past with just/already/yet",I've visited France. She hasn't arrived yet.,experience; result
7,A2,KET,Tenses & Aspect,时态与体,⏱,Future: will,"Predictions, spontaneous decisions, promises, offers",I'll help you. It will rain tomorrow.,prediction; decision
8,A2,KET,Tenses & Aspect,时态与体,⏱,Future: going to,"Plans, intentions, evidence-based predictions",I'm going to study medicine. Look — it's going to rain!,plan; intention
9,A2,KET,Tenses & Aspect,时态与体,⏱,Future: Present Continuous for arrangements,Fixed future arrangements,I'm meeting John at 6 tomorrow.,arrangement
10,B1,PET,Tenses & Aspect,时态与体,⏱,Present Perfect vs Past Simple,"Distinguishing finished vs unfinished time, relevance to now",I've lived here for 5 years vs I lived there in 2010.,contrast; time
11,B1,PET,Tenses & Aspect,时态与体,⏱,Present Perfect Continuous,"Duration of activity leading to now, recent activity with visible results",I've been waiting for an hour. She's been crying.,duration; recent
12,B1,PET,Tenses & Aspect,时态与体,⏱,Past Perfect Simple,"Action before another past action, narrative sequencing","When I arrived, she had already left.",sequence; narrative
13,B1,PET,Tenses & Aspect,时态与体,⏱,Used to / Would (past habits),Past habits and repeated actions that no longer happen,I used to smoke. We would play football every Saturday.,habit; nostalgia
14,B1,PET,Tenses & Aspect,时态与体,⏱,Future: will vs going to (nuanced),Detailed distinction between will and going to in context,I think it'll rain (opinion) vs It's going to rain (evidence).,contrast; nuance
15,B1,PET,Tenses & Aspect,时态与体,⏱,Future: Present Simple for timetables,Scheduled events with present simple,The train leaves at 9:15.,timetable; schedule
16,B2,FCE,Tenses & Aspect,时态与体,⏱,Past Perfect Continuous,"Duration before a past event, explaining cause of past state","She had been working all day, so she was exhausted.",duration; cause
17,B2,FCE,Tenses & Aspect,时态与体,⏱,Future Continuous,"Actions in progress at a specific future time, polite enquiry",This time tomorrow I'll be flying to Rome.,progress; polite
18,B2,FCE,Tenses & Aspect,时态与体,⏱,Future Perfect Simple,Completion before a future deadline,"By next year, I'll have finished my degree.",completion; deadline
19,B2,FCE,Tenses & Aspect,时态与体,⏱,Future Perfect Continuous,Duration up to a future point,"By June, I'll have been working here for 10 years.",duration; future
20,B2,FCE,Tenses & Aspect,时态与体,⏱,Narrative Tenses (combined),"Using past simple, continuous, and perfect together in storytelling",I was walking home when I saw a man who had been following me.,narrative; storytelling
21,C1,CAE,Tenses & Aspect,时态与体,⏱,Future in the Past,"was going to, would, was about to for unfulfilled plans",I was going to call you but I forgot.,unfulfilled; retrospective
22,C1,CAE,Tenses & Aspect,时态与体,⏱,Advanced Aspect Distinctions,Fine-grained choice between simple/continuous/perfect aspect,I've thought about it (= decided) vs I've been thinking about it (= ongoing).,nuance; aspect
23,C1,CAE,Tenses & Aspect,时态与体,⏱,Be to + infinitive,"Formal future: orders, destiny, announcements",The Prime Minister is to visit Paris next week.,formal; decree
24,C2,CPE,Tenses & Aspect,时态与体,⏱,Subtle Tense-Aspect Interaction,"Pragmatic/discourse effects of tense choice; hedging, politeness via tense",I was wondering if you could help (past continuous for politeness).,pragmatics; register
25,C2,CPE,Tenses & Aspect,时态与体,⏱,Historical Present & Dramatic Narrative,Using present tense for past events in journalism and storytelling,"In 1969, Armstrong steps onto the lunar surface.",rhetoric; journalism
26,A1,KET,Modal Verbs,情态动词,🔑,Can / Can't (Ability),Present ability and inability,I can swim. She can't drive.,ability
27,A1,KET,Modal Verbs,情态动词,🔑,Can / Could (Requests),Making polite requests,Can you help me? Could you open the window?,request; polite
28,A2,KET,Modal Verbs,情态动词,🔑,Must / Mustn't,Strong obligation and prohibition,You must wear a seatbelt. You mustn't smoke here.,obligation; prohibition
29,A2,KET,Modal Verbs,情态动词,🔑,Have to / Don't have to,External obligation and lack of necessity,I have to work on Saturdays. You don't have to come.,obligation; necessity
30,A2,KET,Modal Verbs,情态动词,🔑,Should / Shouldn't,Advice and mild obligation,You should see a doctor. You shouldn't eat so much sugar.,advice
31,A2,KET,Modal Verbs,情态动词,🔑,Would like,Polite wants and desires,"I'd like a coffee, please.",polite; desire
32,B1,PET,Modal Verbs,情态动词,🔑,Must vs Have to (nuanced),Internal obligation (must) vs external obligation (have to),I must remember to call her (personal) vs I have to wear a uniform (rule).,contrast; obligation
33,B1,PET,Modal Verbs,情态动词,🔑,May / Might (Possibility),Expressing present and future possibility,She might come to the party. It may rain later.,possibility
34,B1,PET,Modal Verbs,情态动词,🔑,Could (Past Ability & Possibility),Past general ability and present possibility,I could swim when I was 5. It could be true.,past ability; possibility
35,B1,PET,Modal Verbs,情态动词,🔑,Should have / Must have / Could have,"Modal perfects: past criticism, deduction, missed opportunity",You should have told me. She must have left. I could have helped.,past modal; deduction
36,B1,PET,Modal Verbs,情态动词,🔑,Had better,Strong advice with implied consequences,You'd better hurry or you'll miss the train.,advice; warning
37,B2,FCE,Modal Verbs,情态动词,🔑,Modal Verbs of Deduction (present),must/can't/could/may/might for logical deduction,She must be at home (certainty). He can't be serious (impossibility).,deduction; certainty
38,B2,FCE,Modal Verbs,情态动词,🔑,Modal Verbs of Deduction (past),must have / can't have / might have for past deduction,He must have forgotten. She can't have seen us.,deduction; past
39,B2,FCE,Modal Verbs,情态动词,🔑,Need (modal vs semi-modal),Need as modal (needn't) vs lexical verb (don't need to),You needn't worry. You don't need to bring anything.,necessity; formal
40,B2,FCE,Modal Verbs,情态动词,🔑,Needn't have vs Didn't need to,Unnecessary past action (done vs not done),I needn't have cooked (but I did) vs I didn't need to cook (so I didn't).,contrast; nuance
41,C1,CAE,Modal Verbs,情态动词,🔑,Dare (modal usage),Dare as modal verb in formal/literary contexts,Dare I say it? How dare you!,formal; literary
42,C1,CAE,Modal Verbs,情态动词,🔑,Shall (formal/legal),"Shall in legal, formal, and contractual contexts",The tenant shall pay rent monthly.,legal; formal
43,C1,CAE,Modal Verbs,情态动词,🔑,Be supposed to / Be bound to / Be due to,"Semi-modal expressions of expectation, certainty, schedule",He's supposed to arrive at 3. She's bound to pass.,expectation; certainty
44,C1,CAE,Modal Verbs,情态动词,🔑,Would (habitual past & hypothetical),Advanced uses of would for past habit and hypothetical meaning,He would sit for hours staring at the sea.,habit; hypothetical
45,C2,CPE,Modal Verbs,情态动词,🔑,Modal Stacking & Complex Modality,Layering modals with hedging for nuanced meaning,It might not necessarily have been what he would have wanted.,hedge; nuance
46,C2,CPE,Modal Verbs,情态动词,🔑,Epistemic vs Deontic Modality,Understanding and deploying the knowledge vs duty distinction,You must be tired (epistemic) vs You must leave (deontic).,linguistics; pragmatics
47,A1,KET,Conditionals & Hypothetical,条件句与虚拟语气,🔀,Zero Conditional (basic),Universal truths and general facts,"If you heat water to 100°C, it boils.",fact; truth
48,A2,KET,Conditionals & Hypothetical,条件句与虚拟语气,🔀,First Conditional,Real/likely future situations,"If it rains, I'll take an umbrella.",future; real
49,B1,PET,Conditionals & Hypothetical,条件句与虚拟语气,🔀,Second Conditional,Unreal/unlikely present or future situations,"If I won the lottery, I'd travel the world.",unreal; imaginary
50,B1,PET,Conditionals & Hypothetical,条件句与虚拟语气,🔀,Unless / As long as / Provided that,Conditional conjunctions beyond 'if',I'll go unless it rains. You can come as long as you behave.,conjunction; variation
51,B2,FCE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,Third Conditional,Unreal past situations and regrets,"If I had studied harder, I would have passed.",past; regret
52,B2,FCE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,Mixed Conditionals,Combining past condition with present result and vice versa,"If I had taken that job, I'd be living in London now.",mixed; complex
53,B2,FCE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,I wish / If only (present & past),Expressing regret and desires about present and past,I wish I knew the answer. If only I had listened.,regret; desire
54,C1,CAE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,Inverted Conditionals,Formal conditionals without 'if' using inversion,"Had I known, I would have helped. Were she here, she'd agree.",inversion; formal
55,C1,CAE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,But for / Were it not for,Formal conditional expressions,"But for your help, I'd have failed.",formal; literary
56,C1,CAE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,Suppose / Supposing / What if,Alternative conditional structures,Suppose you lost your job — what would you do?,alternative; hypothetical
57,C1,CAE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,It's (high) time + past subjunctive,Expressing overdue actions,It's time we left. It's high time you found a job.,subjunctive; urgency
58,C2,CPE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,If + will/would (politeness & willingness),Conditional will/would for requests and willingness,"If you will/would wait here, I'll get the manager.",politeness; will
59,C2,CPE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,Implied & Embedded Conditionals,"Conditionals without explicit 'if' clause, contextually inferred",A more experienced person would have known better.,implied; pragmatic
60,C2,CPE,Conditionals & Hypothetical,条件句与虚拟语气,🔀,Subjunctive in formal contexts,"Use of subjunctive mood in demands, suggestions, and formal clauses",It is essential that he be present. I demanded that she leave.,subjunctive; formal
61,A2,KET,Passive Voice,被动语态,🔄,Present Simple Passive,Passive in present simple tense,English is spoken here. Cars are made in Germany.,present; basic
62,A2,KET,Passive Voice,被动语态,🔄,Past Simple Passive,Passive in past simple tense,The window was broken. The Mona Lisa was painted by Da Vinci.,past; basic
63,B1,PET,Passive Voice,被动语态,🔄,Present Perfect Passive,Passive with present perfect,The report has been completed.,perfect; result
64,B1,PET,Passive Voice,被动语态,🔄,Future Passive (will),Passive with will for future,The bridge will be finished next year.,future
65,B1,PET,Passive Voice,被动语态,🔄,Modal Passive,Passive with modal verbs,This form must be signed. The issue can be resolved.,modal
66,B2,FCE,Passive Voice,被动语态,🔄,Past Perfect Passive,Passive with past perfect,The package had been delivered before noon.,past perfect
67,B2,FCE,Passive Voice,被动语态,🔄,Continuous Passive (progressive),Passive in continuous/progressive tenses,The road is being repaired. A new school was being built.,continuous; progressive
68,B2,FCE,Passive Voice,被动语态,🔄,Have / Get something done (Causative),Expressing arranging for someone else to do something,I had my hair cut. She got her car repaired.,causative; service
69,B2,FCE,Passive Voice,被动语态,🔄,It is said / believed / thought (Impersonal),Impersonal passive structures for reporting,It is believed that the earth is 4.5 billion years old.,impersonal; reporting
70,B2,FCE,Passive Voice,被动语态,🔄,Subject + is said to + infinitive,Personal passive reporting structure,He is said to be very wealthy.,reporting; personal
71,C1,CAE,Passive Voice,被动语态,🔄,Passive of Reporting Verbs (all forms),"Full range: alleged, claimed, considered, expected, known, reported, thought, understood",She is understood to have resigned. The suspect is alleged to have fled.,reporting; formal
72,C1,CAE,Passive Voice,被动语态,🔄,Advanced Causative Variations,Have/get + object + past participle/infinitive in various contexts,I'll have my assistant send the files. Don't get yourself arrested!,causative; nuance
73,C2,CPE,Passive Voice,被动语态,🔄,Passive in Formal & Academic Register,"Strategic use of passive for objectivity, impersonality, and information flow",It has been demonstrated that... The results were subsequently analysed.,academic; register
74,C2,CPE,Passive Voice,被动语态,🔄,Double Passive & Complex Passive Chains,Rare but formal constructions with nested passives,The building is expected to have been completed by then.,complex; formal
75,A2,KET,Reported Speech,间接引语,💬,Reported Speech (basic statements),Reporting what someone said with say/tell + tense backshift,'I'm tired' → She said she was tired.,say; tell; backshift
76,B1,PET,Reported Speech,间接引语,💬,Reported Questions,Reporting yes/no and wh-questions,'Where do you live?' → He asked me where I lived.,questions; word order
77,B1,PET,Reported Speech,间接引语,💬,Reported Commands & Requests,Reporting orders and requests with tell/ask + to + infinitive,'Sit down' → She told me to sit down.,commands; infinitive
78,B1,PET,Reported Speech,间接引语,💬,Tense Backshift Rules,Full system of tense changes in reported speech,"present → past, will → would, past → past perfect",backshift; rules
79,B1,PET,Reported Speech,间接引语,💬,Reported Speech: Time & Place Changes,Adapting time/place references in reporting,"today → that day, here → there, tomorrow → the following day",reference; deictic
80,B2,FCE,Reported Speech,间接引语,💬,Reporting Verbs (wide range),"admit, deny, suggest, recommend, warn, promise, refuse, offer, agree, threaten, insist, claim",She denied stealing it. He suggested going out.,verbs; patterns
81,B2,FCE,Reported Speech,间接引语,💬,Reporting Verb Patterns,"verb + -ing, verb + to + inf, verb + that, verb + obj + to + inf",She admitted making a mistake. He offered to help.,patterns; grammar
82,C1,CAE,Reported Speech,间接引语,💬,Optional Backshift & No Backshift,When backshift is optional (still-true statements) or not needed,'The earth is round' → He said the earth is round (no change needed).,optional; nuance
83,C1,CAE,Reported Speech,间接引语,💬,Reporting with Should/Subjunctive,"Reporting verbs + should / subjunctive (suggest, recommend, insist, demand)",She suggested that he (should) take a break.,subjunctive; formal
84,C2,CPE,Reported Speech,间接引语,💬,Sophisticated Reporting Strategies,"Hedging, attribution, discourse management in academic/journalistic reporting","According to sources, the minister is understood to have known.",academic; journalism
85,A1,KET,Questions & Negation,疑问句与否定,❓,Yes/No Questions (be & do),"Basic question formation with be, do, does",Are you a teacher? Do you like pizza?,basic; inversion
86,A1,KET,Questions & Negation,疑问句与否定,❓,Wh- Questions,"Who, what, where, when, why, how, how much/many",Where do you live? How much does it cost?,information; wh-
87,A1,KET,Questions & Negation,疑问句与否定,❓,Basic Negation (don't/doesn't/isn't/aren't),Making negative sentences in present tenses,I don't speak French. She isn't here.,negative; present
88,A2,KET,Questions & Negation,疑问句与否定,❓,Question Tags (basic),Common question tags for confirmation,"You're coming, aren't you? She left, didn't she?",tags; confirmation
89,A2,KET,Questions & Negation,疑问句与否定,❓,Negative Questions,"Questions with negation for surprise, confirmation",Don't you like it? Isn't she coming?,negative; surprise
90,B1,PET,Questions & Negation,疑问句与否定,❓,Indirect / Embedded Questions,Questions within statements; polite question forms,Could you tell me where the station is? I wonder if she's coming.,indirect; polite
91,B1,PET,Questions & Negation,疑问句与否定,❓,Subject vs Object Questions,Distinguishing who/what as subject vs object,Who called you? (object) vs Who called? (subject — no aux needed).,subject; object
92,B2,FCE,Questions & Negation,疑问句与否定,❓,Negative Adverbials + Inversion,"Never, rarely, seldom, hardly, scarcely, no sooner + inverted word order",Never have I seen such beauty. Rarely does she complain.,inversion; formal
93,B2,FCE,Questions & Negation,疑问句与否定,❓,Question Tags (advanced),"Tags with imperatives, modals, irregular patterns","Let's go, shall we? Don't do that, will you?",tags; advanced
94,C1,CAE,Questions & Negation,疑问句与否定,❓,Rhetorical Questions,"Questions not requiring an answer, used for emphasis",Who knows? What difference does it make?,rhetoric; emphasis
95,C1,CAE,Questions & Negation,疑问句与否定,❓,Echo Questions & Reply Questions,Repeating all or part of a statement as a question to express surprise,'I quit my job.' — 'You quit your job?!' / 'You did what?!',echo; surprise
96,C2,CPE,Questions & Negation,疑问句与否定,❓,Complex Negative Scope & Double Negation,"Understanding negation scope, litotes, and rhetorical double negation","Not unreasonably, she decided to leave. It's not impossible.",litotes; scope
97,A2,KET,Relative Clauses,定语从句,🔗,Defining Relative Clauses (who/which/that),Essential information about a noun,The woman who lives next door is a doctor.,defining; essential
98,A2,KET,Relative Clauses,定语从句,🔗,Relative Pronoun: where,Relative clauses of place,That's the restaurant where we had dinner.,place
99,B1,PET,Relative Clauses,定语从句,🔗,Non-defining Relative Clauses,Extra information with commas; who/which but NOT that,"My brother, who lives in London, is a lawyer.",non-defining; comma
100,B1,PET,Relative Clauses,定语从句,🔗,Omitting the Relative Pronoun,When who/which/that can be omitted (object position),The book (that) I bought is great.,omission; object
101,B1,PET,Relative Clauses,定语从句,🔗,Whose / Where / When in Relatives,Possessive and adverbial relative pronouns,The man whose car was stolen. The year when I graduated.,whose; when
102,B2,FCE,Relative Clauses,定语从句,🔗,Preposition + Relative Pronoun,Formal relative clauses with preposition fronting,The person to whom I spoke. The topic about which we argued.,preposition; formal
103,B2,FCE,Relative Clauses,定语从句,🔗,Quantifier + of which/whom,Relative clauses with quantifiers,"I have two brothers, both of whom live abroad.",quantifier; non-defining
104,C1,CAE,Relative Clauses,定语从句,🔗,Reduced Relative Clauses (Participle),Replacing relative clauses with present/past participles,The man (who was) standing at the door. The letter (which was) written by her.,participle; reduction
105,C1,CAE,Relative Clauses,定语从句,🔗,Which referring to whole clause,Non-defining 'which' referring to an entire preceding clause,"He passed the exam, which surprised everyone.",clause reference
106,C1,CAE,Relative Clauses,定语从句,🔗,What as relative pronoun,'What' meaning 'the thing that',What I need is a holiday. Tell me what you think.,nominal; what
107,C2,CPE,Relative Clauses,定语从句,🔗,Complex & Nested Relative Clauses,Multiple embedded relatives in academic/literary prose,"The theory, which was proposed by a scientist who had studied the phenomenon that was first observed in 1990, proved correct.",academic; complex
108,A1,KET,Articles & Determiners,冠词与限定词,📌,A / An (Indefinite Article),"First mention, one of many, jobs",She's a teacher. I'd like an apple.,indefinite; first mention
109,A1,KET,Articles & Determiners,冠词与限定词,📌,The (Definite Article — basic),"Known/specific reference, unique things",The sun is hot. Close the door.,definite; specific
110,A1,KET,Articles & Determiners,冠词与限定词,📌,This / That / These / Those,Demonstrative determiners for near/far reference,This book is mine. Those shoes are expensive.,demonstrative
111,A1,KET,Articles & Determiners,冠词与限定词,📌,My / Your / His / Her / Its / Our / Their,Possessive adjectives/determiners,That's my bag. Their house is big.,possessive
112,A2,KET,Articles & Determiners,冠词与限定词,📌,Some / Any,"Some in affirmative, any in negative/questions (basic rules)",I have some money. Do you have any questions?,quantity
113,A2,KET,Articles & Determiners,冠词与限定词,📌,No / None,Expressing zero quantity,There's no milk. None of them came.,zero; quantity
114,B1,PET,Articles & Determiners,冠词与限定词,📌,Zero Article,"When NOT to use articles: generalisations, uncountable nouns, institutions",Life is beautiful. She goes to school. Water is essential.,zero article; generalisation
115,B1,PET,Articles & Determiners,冠词与限定词,📌,The with geographical names,"Rules for the with rivers, oceans, countries, mountains, etc.","The Thames, the USA, but Mount Everest, Lake Victoria.",geography; rules
116,B1,PET,Articles & Determiners,冠词与限定词,📌,Some / Any (advanced uses),Some in offers/requests; any = 'it doesn't matter which',Would you like some tea? Any doctor will tell you.,nuance
117,B2,FCE,Articles & Determiners,冠词与限定词,📌,Articles with Abstract & Uncountable Nouns,When abstract/uncountable nouns take 'the' or zero article,The happiness I felt was overwhelming vs Happiness is important.,abstract; specific vs general
118,B2,FCE,Articles & Determiners,冠词与限定词,📌,Articles in Fixed Expressions,"Idiomatic uses: go to bed, go to the cinema, in the morning, at night, etc.",He's in hospital (BrE) vs He's in the hospital (AmE).,idiom; fixed
119,C1,CAE,Articles & Determiners,冠词与限定词,📌,Advanced Article Usage,"Subtle article choices: generic the, institutional the, zero article for emphasis",The tiger is an endangered species (generic). Television has changed the world.,generic; subtle
120,C1,CAE,Articles & Determiners,冠词与限定词,📌,Each / Every / Either / Neither,Distributive determiners: subtle distinctions in meaning,Each student received a book. Neither answer is correct.,distributive
121,C2,CPE,Articles & Determiners,冠词与限定词,📌,Article Choice in Academic Register,"Precise article use in formal, scientific, and literary contexts",A review of the literature reveals...; The use of such methods...,academic; precision
122,A1,KET,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Singular & Plural Nouns,Regular (-s/-es) and common irregular plurals,"cats, boxes, children, people, teeth",plural; regular; irregular
123,A1,KET,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Subject Pronouns,"I, you, he, she, it, we, they",She is a doctor. They live in Paris.,subject
124,A1,KET,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Object Pronouns,"me, you, him, her, it, us, them",Give it to me. I saw them yesterday.,object
125,A1,KET,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Possessive 's,Apostrophe-s for possession,John's car. My mother's house.,possessive; apostrophe
126,A2,KET,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Countable & Uncountable Nouns,"Distinguishing countable from uncountable; much/many, a lot of",How much water? How many books? A lot of information.,countable; uncountable
127,A2,KET,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Possessive Pronouns,"mine, yours, his, hers, ours, theirs",This is mine. Is that book yours?,possessive pronoun
128,B1,PET,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Reflexive Pronouns,"myself, yourself, himself, herself, itself, ourselves, themselves",I hurt myself. She taught herself French.,reflexive
129,B1,PET,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Indefinite Pronouns,"someone, anyone, everyone, no one, something, anything, etc.",Someone called. Is there anything I can do?,indefinite
130,B1,PET,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,One / Ones (substitution),Pronoun substitution to avoid repetition,Which shirt? The blue one. I like the big ones.,substitution
131,B2,FCE,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Reciprocal Pronouns,each other / one another,They love each other. We help one another.,reciprocal
132,B2,FCE,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Compound Nouns,Noun + noun combinations and stress patterns,"bus stop, water bottle, mother-in-law, passer-by",compound; word formation
133,B2,FCE,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,It as dummy/empty subject,"It for weather, time, distance, emphasis, extraposition",It's raining. It's important to study. It seems that...,dummy; extraposition
134,C1,CAE,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,There as dummy subject (advanced),There + be in complex constructions,There appears to have been a mistake. There remain several issues.,existential; formal
135,C1,CAE,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Generic Pronouns & Referencing,You/one/they for general reference; managing pronoun chains,One must be careful. They say it's going to rain.,generic; reference
136,C2,CPE,"Nouns, Pronouns & Possession",名词、代词与所有格,👤,Nominalisation,Converting verbs/adjectives into noun forms for academic register,investigate → investigation; develop → development; important → importance,academic; word formation
137,A1,KET,Adjectives & Adverbs,形容词与副词,🎨,Basic Adjectives (position & agreement),Adjectives before nouns and after be; no plural adjectives,A big house. The houses are big.,position; basic
138,A1,KET,Adjectives & Adverbs,形容词与副词,🎨,Adverbs of Frequency,"always, usually, often, sometimes, rarely, never + position",She always arrives early. I never eat meat.,frequency; position
139,A1,KET,Adjectives & Adverbs,形容词与副词,🎨,Comparative Adjectives,-er / more + adjective for comparison,She's taller than me. This is more expensive.,comparison
140,A1,KET,Adjectives & Adverbs,形容词与副词,🎨,Superlative Adjectives,-est / most + adjective,He's the tallest in the class. The most beautiful city.,superlative
141,A2,KET,Adjectives & Adverbs,形容词与副词,🎨,Adverbs of Manner,"How actions are done: quickly, slowly, carefully, well",She speaks English fluently. He drives carefully.,manner; -ly
142,A2,KET,Adjectives & Adverbs,形容词与副词,🎨,(Not) as ... as,Equal and unequal comparisons,She's as tall as her sister. It's not as cold as yesterday.,comparison; equality
143,A2,KET,Adjectives & Adverbs,形容词与副词,🎨,Too / Enough,Degree: excess and sufficiency with adjectives/adverbs,It's too hot. She's not old enough to drive.,degree
144,B1,PET,Adjectives & Adverbs,形容词与副词,🎨,Adjective Order,Opinion-size-age-shape-colour-origin-material-purpose,A beautiful small old round blue French wooden reading table.,order; rules
145,B1,PET,Adjectives & Adverbs,形容词与副词,🎨,Adverbs of Degree,"very, really, quite, fairly, rather, extremely, a bit",It's quite good. She's extremely talented.,degree; intensity
146,B1,PET,Adjectives & Adverbs,形容词与副词,🎨,Comparative & Superlative Adverbs,Forming comparatives/superlatives with adverbs,She runs faster than me. He works the hardest.,comparison; adverb
147,B1,PET,Adjectives & Adverbs,形容词与副词,🎨,-ed vs -ing Adjectives,"Participial adjectives: bored/boring, interested/interesting",I'm bored. The film is boring.,participle; feeling
148,B2,FCE,Adjectives & Adverbs,形容词与副词,🎨,Modifying Comparatives,a lot / far / much / slightly / a bit + comparative,It's far more complicated. She's slightly taller.,modifier; comparison
149,B2,FCE,Adjectives & Adverbs,形容词与副词,🎨,The ... the ... (double comparative),Parallel comparative structures,"The more I study, the more I learn.",parallel; correlation
150,B2,FCE,Adjectives & Adverbs,形容词与副词,🎨,Adverb Position & Focus,"Front, mid, and end position adverbs for emphasis and focus","Suddenly, the door opened. She quietly left the room.",position; emphasis
151,B2,FCE,Adjectives & Adverbs,形容词与副词,🎨,Gradable vs Non-gradable Adjectives,Distinguishing and using appropriate modifiers,very hot (gradable) vs absolutely boiling (non-gradable).,gradability; modifier
152,C1,CAE,Adjectives & Adverbs,形容词与副词,🎨,Intensifiers & Downtoners,"Sophisticated modification: utterly, thoroughly, somewhat, marginally",I'm utterly exhausted. The results are somewhat disappointing.,intensity; register
153,C1,CAE,Adjectives & Adverbs,形容词与副词,🎨,Compound Adjectives,Hyphenated adjective compounds for precise description,"a well-known actor, a time-consuming task, a thought-provoking film",compound; hyphen
154,C1,CAE,Adjectives & Adverbs,形容词与副词,🎨,Adjectives after Nouns (postmodification),When adjectives follow the noun in English,"something interesting, the people involved, the president elect",postmodification
155,C1,CAE,Adjectives & Adverbs,形容词与副词,🎨,Comment & Viewpoint Adverbs,Sentence adverbs expressing speaker attitude,"Fortunately, nobody was hurt. Surprisingly, she agreed.",sentence adverb; attitude
156,C2,CPE,Adjectives & Adverbs,形容词与副词,🎨,Evaluative & Stance Adjectives/Adverbs,Subtle evaluative language in academic/professional discourse,"It is arguably the most significant finding. Arguably, conceivably, purportedly.",academic; stance
157,A1,KET,Prepositions,介词,📍,Prepositions of Place (basic),"in, on, at, under, next to, between, behind, in front of",The book is on the table. She lives in London.,place; location
158,A1,KET,Prepositions,介词,📍,Prepositions of Time (basic),"in (months/years), on (days/dates), at (times)","at 3 o'clock, on Monday, in January, in 2024",time
159,A2,KET,Prepositions,介词,📍,Prepositions of Movement,"to, from, into, out of, through, across, along, towards, past",She walked across the bridge. He ran towards the car.,movement; direction
160,A2,KET,Prepositions,介词,📍,Prepositions of Time (extended),"for, since, during, before, after, until, by","I've lived here for 5 years, since 2019. We'll finish by Friday.",time; duration
161,B1,PET,Prepositions,介词,📍,Prepositions after Adjectives,Common adjective + preposition combinations,"afraid of, interested in, good at, responsible for, different from",collocation; adjective
162,B1,PET,Prepositions,介词,📍,Prepositions after Verbs,Common verb + preposition combinations,"depend on, believe in, listen to, look for, think about",collocation; verb
163,B1,PET,Prepositions,介词,📍,Prepositions after Nouns,Common noun + preposition combinations,"reason for, advantage of, solution to, effect on",collocation; noun
164,B2,FCE,Prepositions,介词,📍,Complex Prepositions,Multi-word prepositions,"in spite of, according to, due to, in addition to, as a result of",complex; multi-word
165,B2,FCE,Prepositions,介词,📍,Prepositional Phrases for Cohesion,Linking ideas with prepositional phrases,"In terms of, with regard to, in relation to, on behalf of",cohesion; linking
166,C1,CAE,Prepositions,介词,📍,Preposition Stranding vs Fronting,Who did you talk to? vs To whom did you speak?,The topic she spoke about (informal) vs The topic about which she spoke (formal).,register; formal
167,C1,CAE,Prepositions,介词,📍,Abstract/Metaphorical Prepositions,Prepositions in abstract/metaphorical contexts,"under pressure, beyond doubt, within reach, above suspicion",metaphor; abstract
168,C2,CPE,Prepositions,介词,📍,Preposition Nuance in Academic Writing,Precise preposition selection in formal contexts,"research into (not on), insight into, contribute to, consist of vs comprise",academic; precision
169,A1,KET,Conjunctions & Connectors,连词与连接词,🔗,And / But / Or / So / Because,Basic coordinating and subordinating conjunctions,I like tea and coffee. She's tired but happy. I left because it was late.,basic; coordination
170,A2,KET,Conjunctions & Connectors,连词与连接词,🔗,When / While / Before / After,Time conjunctions for sequencing,"When I arrived, she was cooking. After lunch, we went out.",time; sequence
171,A2,KET,Conjunctions & Connectors,连词与连接词,🔗,Although / However / But,Basic contrast connectors,"Although it rained, we had fun. It rained. However, we had fun.",contrast
172,B1,PET,Conjunctions & Connectors,连词与连接词,🔗,In addition / Moreover / Furthermore,Adding information connectors,"The hotel was cheap. Moreover, it was centrally located.",addition; formal
173,B1,PET,Conjunctions & Connectors,连词与连接词,🔗,Therefore / Consequently / As a result,Result and consequence connectors,"He didn't study. Therefore, he failed the exam.",result; cause
174,B1,PET,Conjunctions & Connectors,连词与连接词,🔗,Despite / In spite of,Concession with -ing or noun,"Despite being tired, she went to work. In spite of the rain, we played.",concession
175,B1,PET,Conjunctions & Connectors,连词与连接词,🔗,So that / In order to / To (purpose),Expressing purpose,I studied hard so that I could pass. I came to help.,purpose
176,B2,FCE,Conjunctions & Connectors,连词与连接词,🔗,Whereas / While (contrast),Formal contrast within a sentence,"She likes jazz, whereas I prefer rock. While I agree, I have concerns.",formal; contrast
177,B2,FCE,Conjunctions & Connectors,连词与连接词,🔗,Nevertheless / Nonetheless / Even so,Stronger concession connectors,"It was risky. Nevertheless, we decided to proceed.",concession; formal
178,B2,FCE,Conjunctions & Connectors,连词与连接词,🔗,Provided (that) / As long as / On condition that,Conditional connectors,You can go provided that you finish first.,condition
179,B2,FCE,Conjunctions & Connectors,连词与连接词,🔗,Not only ... but also / Both ... and / Either ... or / Neither ... nor,Correlative conjunctions,"Not only is she smart, but she's also kind.",correlative; emphasis
180,C1,CAE,Conjunctions & Connectors,连词与连接词,🔗,Notwithstanding / Inasmuch as / Insofar as,Formal and legal connectors,"Notwithstanding the risks, the project was approved.",formal; legal
181,C1,CAE,Conjunctions & Connectors,连词与连接词,🔗,Discourse Markers,"well, right, so, anyway, actually, basically, I mean, you know","Well, the thing is... Anyway, as I was saying...",spoken; discourse
182,C1,CAE,Conjunctions & Connectors,连词与连接词,🔗,Hedging & Qualifying Connectors,"to some extent, up to a point, in a sense, broadly speaking","In a sense, you're right. To some extent, this is true.",hedge; academic
183,C2,CPE,Conjunctions & Connectors,连词与连接词,🔗,Sophisticated Cohesive Devices,Complex text-level connectors for elegant prose,"Be that as it may, the evidence suggests otherwise. That said, there are caveats.",rhetoric; literary
184,A1,KET,Gerunds & Infinitives,动名词与不定式,⚙️,Verb + to + infinitive (basic),Common verbs followed by to + infinitive,I want to go. She needs to study. They decided to leave.,infinitive; basic
185,A1,KET,Gerunds & Infinitives,动名词与不定式,⚙️,Verb + -ing (basic),Common verbs followed by -ing form,I enjoy swimming. She likes reading.,gerund; basic
186,A2,KET,Gerunds & Infinitives,动名词与不定式,⚙️,Like / Love / Hate / Prefer + -ing or to,Verbs that accept both forms (with subtle differences),I like swimming / I like to swim.,both forms
187,B1,PET,Gerunds & Infinitives,动名词与不定式,⚙️,Verb + -ing vs Verb + to (different meaning),"Verbs where the form changes meaning: stop, remember, try, forget, regret",I stopped smoking (quit) vs I stopped to smoke (paused in order to).,meaning change; contrast
188,B1,PET,Gerunds & Infinitives,动名词与不定式,⚙️,Verb + object + to + infinitive,Patterns like: ask/tell/want/expect someone to do,She asked me to help. I want you to come.,object; infinitive
189,B1,PET,Gerunds & Infinitives,动名词与不定式,⚙️,Adjective + to + infinitive,It's + adj + to + inf; subject + be + adj + to + inf,It's easy to understand. She was happy to help.,adjective; infinitive
190,B1,PET,Gerunds & Infinitives,动名词与不定式,⚙️,Preposition + -ing,Gerund after prepositions,I'm interested in learning. She's good at cooking. Before leaving...,preposition; gerund
191,B2,FCE,Gerunds & Infinitives,动名词与不定式,⚙️,Complex Gerund & Infinitive Patterns,"Advanced patterns: admit, avoid, deny, consider, involve, suggest + -ing",He denied taking the money. The job involves travelling a lot.,advanced; patterns
192,B2,FCE,Gerunds & Infinitives,动名词与不定式,⚙️,Perfect Infinitive & Perfect Gerund,to have done / having done for past reference,"She seems to have left. Having finished the work, he went home.",perfect; past reference
193,B2,FCE,Gerunds & Infinitives,动名词与不定式,⚙️,Passive Infinitive & Passive Gerund,to be done / being done,I want to be told the truth. She hates being watched.,passive
194,C1,CAE,Gerunds & Infinitives,动名词与不定式,⚙️,Verbs + bare infinitive,"Make, let, help, had better, would rather + base form",She made me laugh. I'd rather stay home. Let me help.,bare infinitive
195,C1,CAE,Gerunds & Infinitives,动名词与不定式,⚙️,Subject Position Gerunds & Infinitives,Gerund/infinitive as subject of sentence,Swimming is good exercise. To err is human.,subject; formal
196,C2,CPE,Gerunds & Infinitives,动名词与不定式,⚙️,Nuanced Gerund/Infinitive Selection,Pragmatic and stylistic choice between gerund and infinitive in advanced contexts,Distinguishing habitual (gerund) vs specific occasion (infinitive) nuances.,pragmatics; style
197,A1,KET,Quantifiers & Determiners,量词与限定词,📊,A lot of / Lots of,Large quantity with countable and uncountable,There are a lot of people. She has lots of money.,quantity; basic
198,A1,KET,Quantifiers & Determiners,量词与限定词,📊,Much / Many,"Questions and negatives: much (uncountable), many (countable)",How much time? How many books? Not much water.,countable; uncountable
199,A2,KET,Quantifiers & Determiners,量词与限定词,📊,A few / A little,Small positive quantities,I have a few friends here. There's a little milk left.,positive; small quantity
200,A2,KET,Quantifiers & Determiners,量词与限定词,📊,Few / Little (without 'a'),Small quantity with negative emphasis,"Few people came (= not many, disappointing). Little progress was made.",negative; emphasis
201,B1,PET,Quantifiers & Determiners,量词与限定词,📊,All / Most / Some / Any / No,Quantifiers across the spectrum,All students passed. Most people agree. No one came.,spectrum; general
202,B1,PET,Quantifiers & Determiners,量词与限定词,📊,Both / Either / Neither,Quantifiers for two items,Both answers are correct. Neither option is ideal.,two; choice
203,B1,PET,Quantifiers & Determiners,量词与限定词,📊,Every / Each,Referring to all members individually,Every student has a book. Each room has a bathroom.,individual; universal
204,B2,FCE,Quantifiers & Determiners,量词与限定词,📊,Plenty of / A great deal of / A number of,Formal and varied quantity expressions,Plenty of time. A great deal of research. A number of factors.,formal; variety
205,B2,FCE,Quantifiers & Determiners,量词与限定词,📊,Whole / Entire / All of,Emphasising completeness,The whole team agreed. The entire building was evacuated.,completeness; emphasis
206,C1,CAE,Quantifiers & Determiners,量词与限定词,📊,Hardly any / Scarcely any / Barely any,Near-zero quantities with formal/emphatic tone,Hardly any seats were left. There's scarcely any evidence.,near-zero; formal
207,C1,CAE,Quantifiers & Determiners,量词与限定词,📊,Such / So + quantifier patterns,Emphasis structures with quantifiers,So few people came that we cancelled. Such a lot of work!,emphasis; pattern
208,C2,CPE,Quantifiers & Determiners,量词与限定词,📊,Partitive & Complex Quantification,"A proportion of, the bulk of, a fraction of, the overwhelming majority of",The bulk of the evidence suggests... A mere fraction of respondents...,academic; precise
209,A1,KET,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Simple Sentences (SVO),Subject + Verb + Object word order,I like music. She reads books.,basic; word order
210,A1,KET,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,There is / There are,Existential sentences for describing what exists,There is a book on the table. There are many parks in this city.,existential; description
211,A2,KET,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Compound Sentences,"Two main clauses joined by and, but, or, so","I was tired, so I went to bed.",compound; coordination
212,B1,PET,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Complex Sentences,"Main clause + subordinate clause (because, although, when, if)","Although she was tired, she continued working.",complex; subordination
213,B1,PET,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Time Clauses,"when, while, as, before, after, until, as soon as, once","As soon as I arrive, I'll call you.",time; subordination
214,B1,PET,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Reason & Result Clauses,"because, since, as, so ... that, such ... that","Since it was late, we decided to leave. She was so tired that she fell asleep.",reason; result
215,B2,FCE,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Cleft Sentences (It is/was ... that/who),Splitting a sentence for emphasis,It was John who broke the window. It's the noise that bothers me.,cleft; emphasis
216,B2,FCE,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,What-cleft (Pseudo-cleft),What ... is/was for emphasis on a particular element,What I need is a holiday. What happened was that the train was late.,pseudo-cleft; emphasis
217,B2,FCE,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Participle Clauses,Using present/past participles to shorten clauses,"Walking home, I saw a fox. Written in 1905, the book is still popular.",participle; reduction
218,C1,CAE,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Fronting / Preposing,Moving elements to the front of the sentence for emphasis/contrast,This I cannot accept. Into the room walked a tall man.,fronting; emphasis
219,C1,CAE,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Inversion for Emphasis,Subject-auxiliary inversion after negative/restrictive adverbials,Not until then did I realise. Only after the meeting did she understand.,inversion; formal
220,C1,CAE,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Extraposition,Moving heavy subjects/objects to the end,It seems unlikely that they'll agree (vs 'That they'll agree seems unlikely').,extraposition; weight
221,C1,CAE,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Ellipsis & Substitution,Omitting repeated words; using so/do/one as substitutes,I can swim and she can too. 'Is it raining?' 'I think so.',ellipsis; economy
222,C2,CPE,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Garden Path & Complex Embedding,Managing reader expectations in complex sentence structures,The horse raced past the barn fell. (garden path — reduced relative clause),complexity; parsing
223,C2,CPE,Sentence Structure & Clause Types,句子结构与从句类型,🏗️,Information Structure (Theme-Rheme),Controlling information flow through sentence position choices,Moving known information to the front and new information to the end for clarity.,information; discourse
224,A2,KET,Word Formation,构词法,🔤,"Basic Prefixes (un-, re-)",Common prefixes that change meaning,"happy → unhappy, do → redo, lucky → unlucky",prefix; basic
225,A2,KET,Word Formation,构词法,🔤,"Basic Suffixes (-er, -ly, -ful, -tion)",Common suffixes for changing word class,"teach → teacher, quick → quickly, use → useful, educate → education",suffix; basic
226,B1,PET,Word Formation,构词法,🔤,"Noun Suffixes (-ment, -ness, -ity, -ance/-ence)",Converting adjectives/verbs to nouns,"happy → happiness, develop → development, important → importance",nominalisation; suffix
227,B1,PET,Word Formation,构词法,🔤,"Adjective Suffixes (-able, -ous, -ive, -al)",Converting nouns/verbs to adjectives,"comfort → comfortable, danger → dangerous, create → creative",adjective; suffix
228,B1,PET,Word Formation,构词法,🔤,"Negative Prefixes (dis-, im-/in-/ir-/il-, mis-)",Full range of negative prefixes,"agree → disagree, possible → impossible, legal → illegal, understand → misunderstand",negative; prefix
229,B2,FCE,Word Formation,构词法,🔤,"Advanced Prefixes (over-, under-, pre-, post-, multi-, anti-)",Extended prefix range for nuanced meaning,"overwork, underestimate, prehistoric, postwar, multicultural, antisocial",prefix; advanced
230,B2,FCE,Word Formation,构词法,🔤,"Verb Formation (-ise/-ize, -ify, -en)",Suffixes that create verbs,"modern → modernise, simple → simplify, wide → widen",verb; suffix
231,C1,CAE,Word Formation,构词法,🔤,Nominalisation for Academic Writing,Systematic noun formation for formal register,We analysed → Our analysis of...; They responded → Their response to...,academic; formal
232,C1,CAE,Word Formation,构词法,🔤,Derivation Chains,Multiple derivations from a single root,employ → employer → employment → employable → unemployment,derivation; chain
233,C2,CPE,Word Formation,构词法,🔤,Productive Morphology & Neologisms,Understanding and creating new words through established patterns,"un-google-able, post-truth, micro-dose, de-platform",productive; creative
234,A2,KET,Phrasal Verbs,动词短语,🚀,Common Inseparable Phrasal Verbs,Verb + particle (cannot be separated),"look after, get up, look for, come back, go out",inseparable; basic
235,A2,KET,Phrasal Verbs,动词短语,🚀,Common Separable Phrasal Verbs,Verb + particle (can be separated by object),"turn on/off, pick up, put on, take off, give back",separable; basic
236,B1,PET,Phrasal Verbs,动词短语,🚀,Phrasal Verbs: Expanded Set,Wider range of common phrasal verbs,"bring up, carry on, deal with, figure out, give up, look forward to, put off, set up, take over, work out",intermediate; common
237,B1,PET,Phrasal Verbs,动词短语,🚀,Three-word Phrasal Verbs,Verb + adverb + preposition combinations,"look forward to, put up with, come up with, get on with, run out of",three-word
238,B2,FCE,Phrasal Verbs,动词短语,🚀,Phrasal Verbs: Business & Academic,Phrasal verbs common in professional contexts,"draw up (a plan), carry out (research), break down (analyse), lay off (dismiss), roll out (launch)",business; academic
239,B2,FCE,Phrasal Verbs,动词短语,🚀,Phrasal Verbs with Multiple Meanings,Understanding polysemous phrasal verbs,take off (1: remove clothes 2: plane departs 3: become popular 4: imitate someone),polysemy; meaning
240,C1,CAE,Phrasal Verbs,动词短语,🚀,Formal Equivalents of Phrasal Verbs,Single-word Latinate alternatives for formal register,"find out → discover, put off → postpone, bring about → cause, turn down → reject",formal; register
241,C1,CAE,Phrasal Verbs,动词短语,🚀,Idiomatic Phrasal Verbs,"Less transparent, highly idiomatic combinations","come across (seem), own up (confess), pull through (recover), see through (not be deceived by)",idiomatic; advanced
242,C2,CPE,Phrasal Verbs,动词短语,🚀,Phrasal Verb Nominalisation,Using phrasal verbs as nouns and adjectives,"a breakthrough, the takeoff, a setback, the outcome, a rundown, a grown-up",nominalisation; word class
243,A1,KET,Punctuation & Written Conventions,标点与书写规范,✏️,Capital Letters & Full Stops,"Sentence beginnings, proper nouns, end punctuation",My name is Anna. She lives in Paris.,basic; capital
244,A1,KET,Punctuation & Written Conventions,标点与书写规范,✏️,Question Marks & Exclamation Marks,Punctuating questions and exclamations,Where are you? That's amazing!,punctuation; basic
245,A2,KET,Punctuation & Written Conventions,标点与书写规范,✏️,Apostrophes (possession & contraction),Apostrophe for possession and contractions,"John's book. I'm, don't, she's, it's vs its",apostrophe; possession
246,B1,PET,Punctuation & Written Conventions,标点与书写规范,✏️,"Commas (lists, clauses, introductory)",Using commas for clarity in complex sentences,"After dinner, we went out. She bought milk, bread, and eggs.",comma; clarity
247,B2,FCE,Punctuation & Written Conventions,标点与书写规范,✏️,Colons & Semicolons,Using colons to introduce and semicolons to connect related clauses,"There was one problem: money. She was tired; however, she continued.",semicolon; colon
248,B2,FCE,Punctuation & Written Conventions,标点与书写规范,✏️,Reported Speech Punctuation,Punctuating direct and indirect speech correctly,"'I'm leaving,' she said. She said that she was leaving.",speech; quotation
249,C1,CAE,Punctuation & Written Conventions,标点与书写规范,✏️,"Dashes, Parentheses & Advanced Punctuation","Em-dashes, en-dashes, brackets for asides and parenthetical info",The result — quite surprising — was a success.,dash; parenthetical
250,C2,CPE,Punctuation & Written Conventions,标点与书写规范,✏️,Punctuation for Rhetorical Effect,"Strategic use of punctuation for pacing, emphasis, and style",Short sentence. Impact. Then — a longer one that builds the suspense.,rhetoric; style
251,B1,PET,"Style, Register & Discourse",文体、语域与语篇,🎭,Formal vs Informal Register (intro),Recognising differences between formal and casual language,Could you possibly → Can you; I would like to → I want to; Furthermore → Also,register; basic
252,B2,FCE,"Style, Register & Discourse",文体、语域与语篇,🎭,Linking & Cohesion Across Paragraphs,"Using reference, substitution, and connectors for text flow",This approach... Such findings... The former... The latter...,cohesion; text
253,B2,FCE,"Style, Register & Discourse",文体、语域与语篇,🎭,Written vs Spoken Grammar,Understanding grammatical differences between writing and speech,Written: 'The aforementioned' / Spoken: 'that thing I said before',modality; contrast
254,C1,CAE,"Style, Register & Discourse",文体、语域与语篇,🎭,Hedging & Vague Language,Softening claims and using deliberately imprecise language,"It seems that... It could be argued that... sort of, kind of, roughly",hedge; academic
255,C1,CAE,"Style, Register & Discourse",文体、语域与语篇,🎭,Formal Written Style (academic),"Impersonal constructions, nominalisation, passive for objectivity",It can be observed that... This analysis demonstrates...,academic; formal
256,C1,CAE,"Style, Register & Discourse",文体、语域与语篇,🎭,Emphasis & Focus Techniques,"Cleft, inversion, fronting, do-emphasis combined for effect",What matters is the result. Never have I seen such courage. I DO understand.,emphasis; rhetoric
257,C2,CPE,"Style, Register & Discourse",文体、语域与语篇,🎭,Pragmatic Competence,"Implicature, indirectness, irony, understatement as grammatical choice",'That\'s one way to put it' (understatement/irony),pragmatics; implicature
258,C2,CPE,"Style, Register & Discourse",文体、语域与语篇,🎭,Register Shifting,Deliberately moving between registers for effect,"The empirical data strongly suggests — basically, it works.",register; style
259,C2,CPE,"Style, Register & Discourse",文体、语域与语篇,🎭,Textual Coherence & Macro-structure,Organising ideas at the text/discourse level through grammar,"Topic sentences, thematic progression, given-new contract, paragraph cohesion.",discourse; structure`;

// Rules for generating realistic grammar quizzes based on triggers
const QUIZ_TRIGGERS = [
  { trigger: 'works', options: ['works', 'work', 'working', 'worked'] },
  { trigger: 'working', options: ['working', 'work', 'works', 'worked'] },
  { trigger: 'worked', options: ['worked', 'work', 'works', 'working'] },
  { trigger: 'walked', options: ['walked', 'walk', 'walks', 'walking'] },
  { trigger: 'reading', options: ['reading', 'read', 'reads', 'readed'] },
  { trigger: 'went', options: ['went', 'go', 'goes', 'gone'] },
  { trigger: 'go', options: ['go', 'goes', 'went', 'gone'] },
  { trigger: 'goes', options: ['goes', 'go', 'went', 'gone'] },
  { trigger: 'open', options: ['Open', 'Opening', 'Opened', 'Opens'] },
  { trigger: 'sleeping', options: ['sleeping', 'sleep', 'slept', 'sleeps'] },
  { trigger: 'visited', options: ['visited', 'visit', 'visits', 'visiting'] },
  { trigger: 'will', options: ['will', 'would', 'shall', 'should'] },
  { trigger: 'going to', options: ['going to', 'go to', 'went to', 'will'] },
  { trigger: 'used to', options: ['used to', 'use to', 'get used to', 'would'] },
  { trigger: 'would', options: ['would', 'will', 'should', 'could'] },
  { trigger: 'leaves', options: ['leaves', 'leave', 'left', 'leaving'] },
  { trigger: 'can\'t', options: ['can\'t', 'couldn\'t', 'mustn\'t', 'shouldn\'t'] },
  { trigger: 'can', options: ['can', 'could', 'must', 'should'] },
  { trigger: 'could', options: ['could', 'can', 'should', 'would'] },
  { trigger: 'must', options: ['must', 'mustn\'t', 'have to', 'should'] },
  { trigger: 'have to', options: ['have to', 'must', 'should', 'has to'] },
  { trigger: 'should', options: ['should', 'shall', 'would', 'must'] },
  { trigger: 'might', options: ['might', 'may', 'must', 'can'] },
  { trigger: 'may', options: ['may', 'might', 'must', 'can'] },
  { trigger: 'had better', options: ['had better', 'would better', 'should better', 'must better'] },
  { trigger: 'unless', options: ['unless', 'if', 'as long as', 'provided that'] },
  { trigger: 'wish', options: ['wish', 'hope', 'if only', 'want'] },
  { trigger: 'suppose', options: ['Suppose', 'If', 'Unless', 'Whether'] },
  { trigger: 'is spoken', options: ['is spoken', 'speaks', 'is speaking', 'was spoken'] },
  { trigger: 'was broken', options: ['was broken', 'broke', 'is broken', 'was breaking'] },
  { trigger: 'has been', options: ['has been', 'have been', 'was', 'is'] },
  { trigger: 'had been', options: ['had been', 'has been', 'was', 'is'] },
  { trigger: 'being', options: ['being', 'been', 'be', 'to be'] },
  { trigger: 'told', options: ['told', 'said', 'asked', 'explained'] },
  { trigger: 'said', options: ['said', 'told', 'asked', 'spoke'] },
  { trigger: 'asked', options: ['asked', 'said', 'told', 'ordered'] },
  { trigger: 'whom', options: ['whom', 'who', 'whose', 'which'] },
  { trigger: 'whose', options: ['whose', 'who', 'which', 'that'] },
  { trigger: 'which', options: ['which', 'who', 'whose', 'that'] },
  { trigger: 'who', options: ['who', 'which', 'whose', 'whom'] },
  { trigger: 'where', options: ['where', 'when', 'which', 'that'] },
  { trigger: 'when', options: ['when', 'where', 'which', 'while'] },
  { trigger: 'that', options: ['that', 'which', 'who', 'what'] },
  { trigger: 'what', options: ['what', 'which', 'that', 'who'] },
  { trigger: 'Some', options: ['Some', 'Any', 'No', 'Many'] },
  { trigger: 'some', options: ['some', 'any', 'no', 'many'] },
  { trigger: 'Any', options: ['Any', 'Some', 'No', 'Much'] },
  { trigger: 'any', options: ['any', 'some', 'no', 'much'] },
  { trigger: 'much', options: ['much', 'many', 'few', 'little'] },
  { trigger: 'many', options: ['many', 'much', 'few', 'little'] },
  { trigger: 'few', options: ['few', 'little', 'a few', 'a little'] },
  { trigger: 'little', options: ['little', 'few', 'a little', 'a few'] },
  { trigger: 'each other', options: ['each other', 'one another', 'themselves', 'ourselves'] },
  { trigger: 'too', options: ['too', 'enough', 'very', 'extremely'] },
  { trigger: 'enough', options: ['enough', 'too', 'very', 'fairly'] },
  { trigger: 'quite', options: ['quite', 'very', 'too', 'enough'] },
  { trigger: 'rather', options: ['rather', 'quite', 'very', 'too'] },
  { trigger: 'in spite of', options: ['in spite of', 'although', 'despite', 'however'] },
  { trigger: 'despite', options: ['despite', 'although', 'in spite of', 'however'] },
  { trigger: 'so that', options: ['so that', 'in order to', 'because', 'although'] },
  { trigger: 'whereas', options: ['whereas', 'while', 'although', 'however'] },
  { trigger: 'nevertheless', options: ['nevertheless', 'however', 'although', 'despite'] },
  { trigger: 'enjoy', options: ['enjoy', 'want', 'hope', 'decide'] },
  { trigger: 'swimming', options: ['swimming', 'to swim', 'swim', 'swam'] },
  { trigger: 'reading', options: ['reading', 'to read', 'read', 'reads'] },
  { trigger: 'interested in', options: ['interested in', 'interested on', 'interesting in', 'interest in'] },
  { trigger: 'good at', options: ['good at', 'good in', 'good on', 'well at'] },
  { trigger: 'look forward to', options: ['look forward to', 'look forward on', 'look forward with', 'looking to'] },
  { trigger: 'because', options: ['because', 'although', 'so', 'but'] },
  { trigger: 'although', options: ['although', 'because', 'however', 'despite'] },
  { trigger: 'however', options: ['however', 'although', 'because', 'so'] },
  { trigger: 'therefore', options: ['therefore', 'however', 'because', 'so'] },
  { trigger: 'Not only', options: ['Not only', 'But also', 'Neither', 'Either'] },
  { trigger: 'Seldom', options: ['Seldom', 'Never', 'Rarely', 'Often'] },
  { trigger: 'Rarely', options: ['Rarely', 'Seldom', 'Never', 'Usually'] },
  { trigger: 'Never', options: ['Never', 'Seldom', 'Rarely', 'Always'] },
];

// Simple deterministic random generator for grid vertex jittering
function seededRandom(c: number, r: number, seed: string): number {
  const sum = c * 12.9898 + r * 78.233 + seed.charCodeAt(0) * 1.5;
  const x = Math.sin(sum) * 43758.5453;
  return x - Math.floor(x);
}

// Function to parse CSV line correctly handling quotes
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Convert exam column to allowed type ExamLevel
function mapExamToLevel(exam: string): ExamLevel {
  const e = exam.toUpperCase().trim();
  if (e === 'KET') return 'KET';
  if (e === 'PET') return 'PET';
  if (e === 'FCE') return 'FCE';
  return 'IELTS'; // IELTS covers CAE and CPE advanced materials
}

// Generates shared curved boundary segments for adjacent territories to ensure seamless interlocking interlocking with zero gaps/overlaps
function getInterlockingCurve(from: { x: number; y: number }, to: { x: number; y: number }, seed: string): string {
  const [v1, v2] = from.x < to.x || (from.x === to.x && from.y < to.y) ? [from, to] : [to, from];
  
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  const s = seed + '_' + v1.x.toFixed(0) + '_' + v1.y.toFixed(0) + '_' + v2.x.toFixed(0) + '_' + v2.y.toFixed(0);
  const r = seededRandom(v1.x, v1.y, s) - 0.5;
  const offsetMag = dist * 0.14; // up to 14% wave-distortion for organic map look
  
  const px = -(dy / (dist || 1)) * r * offsetMag;
  const py = (dx / (dist || 1)) * r * offsetMag;
  
  return `Q ${(mx + px).toFixed(1)},${(my + py).toFixed(1)} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
}

function interpolateOffset(
  angle: number,
  offsets?: { x: number; y: number }[]
): { x: number; y: number } {
  if (!offsets || offsets.length === 0) return { x: 0, y: 0 };
  const numHandles = offsets.length;
  let normalizedAngle = angle % (2 * Math.PI);
  if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;
  
  const f = (normalizedAngle / (2 * Math.PI)) * numHandles;
  const kLeft = Math.floor(f) % numHandles;
  const kRight = (kLeft + 1) % numHandles;
  const t = f - Math.floor(f);
  
  // Smooth C1 cosine interpolation
  const w = (1 - Math.cos(t * Math.PI)) / 2;
  
  const dx = (1 - w) * offsets[kLeft].x + w * offsets[kRight].x;
  const dy = (1 - w) * offsets[kLeft].y + w * offsets[kRight].y;
  
  return { x: dx, y: dy };
}

// Generates a beautiful, organic, non-regular island polygon representing the coast
export function generateOrganicIslandPolygon(
  xMin: number,
  yMin: number,
  xMax: number,
  yMax: number,
  seed: string,
  numVertices: number = 40,
  roughnessFactor: number = 1.0,
  offsets?: { x: number; y: number }[]
): { x: number; y: number }[] {
  const cx = (xMin + xMax) / 2;
  const cy = (yMin + yMax) / 2;
  const rx = (xMax - xMin) / 2;
  const ry = (yMax - yMin) / 2;

  const vertices: { x: number; y: number }[] = [];

  const isPragmatics = seed.startsWith('pragmatics');

  if (isPragmatics) {
    // Generate a beautiful, smooth crescent peninsula on the right side using a warped ellipse!
    const r1 = seededRandom(1, 1, seed + '_poly1');
    const r2 = seededRandom(2, 2, seed + '_poly2');
    const r3 = seededRandom(3, 3, seed + '_poly3');
    
    for (let i = 0; i < numVertices; i++) {
      const angle = (i / numVertices) * 2 * Math.PI;
      
      // Perfectly continuous and smooth low-frequency noise wave (no jumps)
      const noise = 1.0 
        + 0.12 * roughnessFactor * Math.sin(2 * angle + r1 * 2 * Math.PI) 
        + 0.04 * roughnessFactor * Math.sin(3 * angle + r2 * 2 * Math.PI)
        + 0.015 * roughnessFactor * Math.cos(5 * angle + r3 * 2 * Math.PI);
      
      const x_ellipse = cx + rx * Math.cos(angle) * noise;
      const y_ellipse = cy + ry * Math.sin(angle) * noise;
      
      const normY = (y_ellipse - cy) / ry;
      const curveX = -140 * (1 - normY * normY); // Smooth quadratic warp to the left
      
      const base_x = x_ellipse + curveX;
      const base_y = y_ellipse;
      
      const offset = interpolateOffset(angle, offsets);
      const x = base_x + offset.x;
      const y = base_y + offset.y;
      
      vertices.push({ x, y });
    }
    return vertices;
  }

  // Phase shifts computed once outside the loop to keep the wave mathematically smooth and continuous!
  const r1 = seededRandom(1, 1, seed + '_poly1');
  const r2 = seededRandom(2, 2, seed + '_poly2');
  const r3 = seededRandom(3, 3, seed + '_poly3');

  for (let i = 0; i < numVertices; i++) {
    const angle = (i / numVertices) * 2 * Math.PI;
    
    // Combine safe, non-self-intersecting organic noise waves
    let amp1 = 0.12, amp2 = 0.04, amp3 = 0.015;
    
    if (seed.startsWith('structural')) {
      // Syntax Mainland: large, rugged but soft organic bumps
      amp1 = 0.16;
      amp2 = 0.06;
      amp3 = 0.02;
    } else if (seed.startsWith('modals')) {
      // Modal Highlands: soft horizontal ridge waves
      amp1 = 0.14;
      amp2 = 0.05;
      amp3 = 0.018;
    } else if (seed.startsWith('tenses')) {
      // Tense Island: a rounded gentle island
      amp1 = 0.11;
      amp2 = 0.04;
      amp3 = 0.012;
    }
    
    const noise = 0.90 
      + amp1 * roughnessFactor * Math.sin(3 * angle + r1 * 2 * Math.PI)
      + amp2 * roughnessFactor * Math.sin(5 * angle + r2 * 2 * Math.PI)
      + amp3 * roughnessFactor * Math.cos(7 * angle + r3 * 2 * Math.PI);
    
    // Calculate final vertex position
    const base_x = cx + rx * Math.cos(angle) * noise;
    const base_y = cy + ry * Math.sin(angle) * noise;
    
    const offset = interpolateOffset(angle, offsets);
    const x = base_x + offset.x;
    const y = base_y + offset.y;
    
    vertices.push({ x, y });
  }
  
  return vertices;
}

// Sutherland-Hodgman clipping of convex polygon against a perpendicular bisector of A and B
function clipPolygonByBisector(
  poly: { x: number; y: number }[],
  A: { x: number; y: number },
  B: { x: number; y: number }
): { x: number; y: number }[] {
  const mx = (A.x + B.x) / 2;
  const my = (A.y + B.y) / 2;
  const nx = B.x - A.x;
  const ny = B.y - A.y;

  const getD = (p: { x: number; y: number }) => (p.x - mx) * nx + (p.y - my) * ny;

  const result: { x: number; y: number }[] = [];
  const n = poly.length;
  if (n === 0) return result;

  for (let i = 0; i < n; i++) {
    const p1 = poly[i];
    const p2 = poly[(i + 1) % n];

    const d1 = getD(p1);
    const d2 = getD(p2);

    if (d1 <= 1e-5) {
      if (d2 <= 1e-5) {
        result.push(p2);
      } else {
        const denom = d2 - d1;
        const t = Math.abs(denom) < 1e-5 ? 0.5 : -d1 / denom;
        result.push({
          x: p1.x + t * (p2.x - p1.x),
          y: p1.y + t * (p2.y - p1.y),
        });
      }
    } else {
      if (d2 <= 1e-5) {
        const denom = d2 - d1;
        const t = Math.abs(denom) < 1e-5 ? 0.5 : -d1 / denom;
        result.push({
          x: p1.x + t * (p2.x - p1.x),
          y: p1.y + t * (p2.y - p1.y),
        });
        result.push(p2);
      }
    }
  }
  return result;
}

// Clean duplicate or extremely close vertices
function cleanPolygon(poly: { x: number; y: number }[]): { x: number; y: number }[] {
  const result: { x: number; y: number }[] = [];
  for (const p of poly) {
    if (result.length === 0) {
      result.push(p);
    } else {
      const last = result[result.length - 1];
      const distSq = (p.x - last.x) ** 2 + (p.y - last.y) ** 2;
      if (distSq > 0.05) {
        result.push(p);
      }
    }
  }
  if (result.length > 2) {
    const first = result[0];
    const last = result[result.length - 1];
    const distSq = (first.x - last.x) ** 2 + (first.y - last.y) ** 2;
    if (distSq <= 0.05) {
      result.pop();
    }
  }
  return result;
}

// Generates interlocking Voronoi cells inside a specific bounding box
function generateInterlockingGrid(
  points: GrammarPoint[],
  xMin: number,
  yMin: number,
  xMax: number,
  yMax: number,
  cols: number,
  rows: number,
  seed: string,
  scaleFactor: number = 0.72,
  roughnessFactor: number = 1.0,
  offsets?: { x: number; y: number }[]
): { points: GrammarPoint[]; mainlandPath: string } {
  const cellWidth = (xMax - xMin) / cols;
  const cellHeight = (yMax - yMin) / rows;

  const cx = (xMin + xMax) / 2;
  const cy = (yMin + yMax) / 2;

  // 1. Generate the beautiful organic island polygon coast vertices
  const islandPoly = generateOrganicIslandPolygon(xMin, yMin, xMax, yMax, seed, 40, roughnessFactor, offsets);

  // 2. Generate site points on a relaxed grid with natural jitter
  // We contract the sites slightly towards the center (using a scale factor of 0.72)
  // to guarantee they reside safely inside the organic island coast boundaries!
  const sitePoints: { x: number; y: number }[] = [];
  const isPragmatics = seed.startsWith('pragmatics');
  
  if (isPragmatics) {
    // Generate site points by warping a regular grid to the crescent ellipse shape!
    const rx = (xMax - xMin) / 2;
    const ry = (yMax - yMin) / 2;
    for (let i = 0; i < points.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const nominalX = xMin + (col + 0.5) * cellWidth;
      const nominalY = yMin + (row + 0.5) * cellHeight;

      // Organic jitter
      const jitterFactor = 0.45;
      const randX = seededRandom(col, row, seed + 'x');
      const randY = seededRandom(col, row, seed + 'y');

      const jitterX = (randX - 0.5) * cellWidth * jitterFactor;
      const jitterY = (randY - 0.5) * cellHeight * jitterFactor;

      const gridX = nominalX + jitterX;
      const gridY = nominalY + jitterY;

      // Contract slightly towards the center of the unwarped ellipse
      const sf = scaleFactor - 0.02;
      const x_unwarped = cx + (gridX - cx) * sf;
      const y = cy + (gridY - cy) * sf;

      // Warp with the same crescent formula!
      const normY = (y - cy) / ry;
      const curveX = -140 * (1 - normY * normY);
      const x = x_unwarped + curveX;

      sitePoints.push({ x, y });
    }
  } else {
    for (let i = 0; i < points.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const nominalX = xMin + (col + 0.5) * cellWidth;
      const nominalY = yMin + (row + 0.5) * cellHeight;

      // Organic jitter factor
      const jitterFactor = 0.45;
      const randX = seededRandom(col, row, seed + 'x');
      const randY = seededRandom(col, row, seed + 'y');

      const jitterX = (randX - 0.5) * cellWidth * jitterFactor;
      const jitterY = (randY - 0.5) * cellHeight * jitterFactor;

      // Contract towards the center of the island
      const gridX = nominalX + jitterX;
      const gridY = nominalY + jitterY;

      const sf = scaleFactor;
      const x = cx + (gridX - cx) * sf;
      const y = cy + (gridY - cy) * sf;

      sitePoints.push({ x, y });
    }
  }

  // 3. Compute Voronoi cells for each site point
  const mappedPoints = points.map((point, index) => {
    const site = sitePoints[index];

    // Start with the full island's organic polygon as the initial polygon!
    // This mathematically guarantees that the outer country boundaries trace the coast exactly!
    let poly = [...islandPoly];

    // Clip against the perpendicular bisectors of all other site points
    for (let j = 0; j < sitePoints.length; j++) {
      if (j === index) continue;
      poly = clipPolygonByBisector(poly, site, sitePoints[j]);
    }

    poly = cleanPolygon(poly);

    // If clipping failed or returned fewer than 3 vertices, fallback to a small box around the site
    if (poly.length < 3) {
      poly = [
        { x: site.x - 20, y: site.y - 20 },
        { x: site.x + 20, y: site.y - 20 },
        { x: site.x + 20, y: site.y + 20 },
        { x: site.x - 20, y: site.y + 20 },
      ];
    }

    // Convert polygon to straight-edged path.
    // The hand-drawn SVG filter will handle making it look naturally wavy and organic!
    const territoryPath = 'M ' + poly.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ') + ' Z';

    // Calculate center of the cell for label positioning
    let sumX = 0, sumY = 0;
    for (const p of poly) {
      sumX += p.x;
      sumY += p.y;
    }
    const centerX = sumX / poly.length;
    const centerY = sumY / poly.length;

    return {
      ...point,
      position: { x: centerX, y: centerY },
      territoryPath,
    };
  });

  // The mainland path is the exact same straight line tracing of the islandPoly!
  const mainlandPath = 'M ' + islandPoly.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ') + ' Z';

  return { points: mappedPoints, mainlandPath };
}

function isInsideMainland(x: number, y: number): boolean {
  // 1. Tense Island (upper-left): center (560, 790), rx:350, ry:350
  if (Math.hypot((x - 560) / 350, (y - 790) / 350) < 1.0) {
    return true;
  }

  // 2. Modal Highlands (upper-right): center (2168, 432), rx:500, ry:280
  if (Math.hypot((x - 2168) / 500, (y - 432) / 280) < 1.0) {
    return true;
  }

  // 3. Syntax Mainland (center): center (1280, 1049), rx:600, ry:500
  if (Math.hypot((x - 1280) / 600, (y - 1049) / 500) < 1.0) {
    return true;
  }

  // 4. Pragmatic Peninsula (right-side vertical): center (2177, 1049), rx:320, ry:480
  if (Math.hypot((x - 2177) / 320, (y - 1049) / 480) < 1.0) {
    return true;
  }

  // Also avoid the very edges of the map to keep them fully visible and beautiful
  if (x < 80 || x > 2587 || y < 80 || y > 1520) {
    return true;
  }

  return false;
}

function sortCoordinatesGeographically(coords: { x: number; y: number }[]): { x: number; y: number }[] {
  if (coords.length === 0) return [];
  const unvisited = [...coords];
  const sorted: { x: number; y: number }[] = [];

  // Start with the coordinate closest to the bottom-left corner of the map
  let current = unvisited.reduce((prev, curr) => {
    const dPrev = Math.hypot(prev.x - 65, prev.y - 1500);
    const dCurr = Math.hypot(curr.x - 65, curr.y - 1500);
    return dCurr < dPrev ? curr : prev;
  });

  sorted.push(current);
  unvisited.splice(unvisited.indexOf(current), 1);

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < unvisited.length; i++) {
      const d = Math.hypot(unvisited[i].x - current.x, unvisited[i].y - current.y);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIdx = i;
      }
    }
    current = unvisited[nearestIdx];
    sorted.push(current);
    unvisited.splice(nearestIdx, 1);
  }

  return sorted;
}

// Generates scattered circular micro-island paths for the Morph Archipelago
function generateArchipelagoIslands(
  points: GrammarPoint[],
  seed: string,
  islandSpread: number = 1.0
): GrammarPoint[] {
  const coords: { x: number; y: number }[] = [];
  let attempt = 0;

  // We want to generate exactly points.length coordinates across all sea areas of the map
  while (coords.length < points.length && attempt < 20000) {
    const rawX = 80 + seededRandom(attempt, 1, seed) * 2500;
    const rawY = 80 + seededRandom(attempt, 2, seed) * 1450;

    // Check if it overlaps with any mainlands
    if (!isInsideMainland(rawX, rawY)) {
      // Check if it's too close to already found coordinates in our pool
      let tooClose = false;
      for (const c of coords) {
        const dist = Math.hypot(rawX - c.x, rawY - c.y);
        if (dist < 85) { // Spaced out beautifully so they aren't crowded
          tooClose = true;
          break;
        }
      }

      if (!tooClose) {
        coords.push({ x: rawX, y: rawY });
      }
    }
    attempt++;
  }

  // Fallback in case we couldn't place enough with the 85px constraint (relax distance constraint iteratively)
  if (coords.length < points.length) {
    let relaxedDist = 70;
    while (coords.length < points.length && relaxedDist >= 30) {
      attempt = 0;
      while (coords.length < points.length && attempt < 5000) {
        const rawX = 120 + seededRandom(attempt + 15000, 1, seed) * 2160;
        const rawY = 120 + seededRandom(attempt + 15000, 2, seed) * 1360;
        if (!isInsideMainland(rawX, rawY)) {
          let tooClose = false;
          for (const c of coords) {
            const dist = Math.hypot(rawX - c.x, rawY - c.y);
            if (dist < relaxedDist) {
              tooClose = true;
              break;
            }
          }
          if (!tooClose) {
            coords.push({ x: rawX, y: rawY });
          }
        }
        attempt++;
      }
      relaxedDist -= 10;
    }
  }

  // Absolute fallback
  if (coords.length < points.length) {
    while (coords.length < points.length) {
      coords.push({
        x: 120 + Math.random() * 2160,
        y: 120 + Math.random() * 1360
      });
    }
  }

  // Sort them geographically using our nearest-neighbor path
  const sortedCoords = sortCoordinatesGeographically(coords);

  // Map each point to its sorted coordinate and create a beautiful island shape
  return points.map((point, index) => {
    const { x, y } = sortedCoords[index];

    // Create an irregular organic shape for the micro-island
    const islandRadius = (13 + seededRandom(index, 3, seed) * 7) * islandSpread;
    const steps = 6;
    let path = `M `;
    for (let s = 0; s < steps; s++) {
      const stepAngle = (s * 2 * Math.PI) / steps;
      const noise = 1 + (seededRandom(index, s + 4, seed) - 0.5) * 0.28;
      const rx = x + Math.cos(stepAngle) * islandRadius * noise;
      const ry = y + Math.sin(stepAngle) * islandRadius * noise;
      if (s === 0) {
        path += `${rx.toFixed(1)},${ry.toFixed(1)}`;
      } else {
        path += ` L ${rx.toFixed(1)},${ry.toFixed(1)}`;
      }
    }
    path += ' Z';

    return {
      ...point,
      position: { x, y },
      territoryPath: path,
    };
  });
}

// Auto-generates a quiz question for a grammar point if not manually defined
function createQuiz(point: Partial<GrammarPoint> & { name: string; description: string; examples: string[] }): GrammarPoint['quiz'] {
  const example = point.examples[0] || 'Learning English grammar is great.';
  
  // Split the example into individual sentences by . or ? or ! followed by space
  const sentences = example.split(/(?<=[.?!])\s+/).map(s => s.trim()).filter(Boolean);
  
  // Look for matching trigger in the sentences
  for (const rule of QUIZ_TRIGGERS) {
    const regex = new RegExp(`\\b${rule.trigger}\\b`, 'i');
    
    // Find which sentence contains the trigger. If multiple, prefer the first one.
    const matchingSentence = sentences.find(s => regex.test(s)) || sentences[0];
    if (matchingSentence && regex.test(matchingSentence)) {
      // Clean quotes and trailing punctuation of the matching sentence
      let cleanSentence = matchingSentence.replace(/^["']|["']$/g, '').trim();
      const endsWithPunct = /[.?!]$/.test(cleanSentence);
      let punct = '.';
      if (endsWithPunct) {
        punct = cleanSentence.slice(-1);
        cleanSentence = cleanSentence.slice(0, -1);
      }
      
      const match = cleanSentence.match(regex);
      if (match) {
        const matchedWord = match[0];
        const isCapitalized = matchedWord[0] === matchedWord[0].toUpperCase();

        const capitalizedOptions = rule.options.map(opt => {
          if (isCapitalized) {
            return opt.charAt(0).toUpperCase() + opt.slice(1);
          }
          return opt.toLowerCase();
        });

        // Determine correct answer index
        const correctIndex = capitalizedOptions.findIndex(
          opt => opt.toLowerCase() === matchedWord.toLowerCase()
        );

        return {
          question: cleanSentence.replace(matchedWord, '___') + punct,
          options: capitalizedOptions,
          answer: correctIndex !== -1 ? correctIndex : 0,
          explanation: `In this context, "${matchedWord}" is correct to satisfy the "${point.name}" grammar structure.`
        };
      }
    }
  }

  // Fallback dynamic quiz generator - use the first sentence (or the only sentence)
  const fallbackSentence = sentences[0] || example;
  let cleanSentence = fallbackSentence.replace(/^["']|["']$/g, '').trim();
  const endsWithPunct = /[.?!]$/.test(cleanSentence);
  let punct = '.';
  if (endsWithPunct) {
    punct = cleanSentence.slice(-1);
    cleanSentence = cleanSentence.slice(0, -1);
  }

  const words = cleanSentence.split(/\s+/);
  let targetWord = '';
  let targetIdx = -1;

  // Find a reasonably long word that is not a pronoun/common word
  for (let i = 0; i < words.length; i++) {
    const w = words[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
    if (w.length > 4 && w !== 'there' && w !== 'their' && w !== 'about' && w !== 'would') {
      targetWord = words[i];
      targetIdx = i;
      break;
    }
  }

  if (targetIdx === -1 && words.length > 0) {
    targetWord = words[Math.floor(words.length / 2)];
  }

  const cleanTarget = targetWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  const isCapitalized = cleanTarget.length > 0 && cleanTarget[0] === cleanTarget[0].toUpperCase();

  const options = [
    cleanTarget,
    cleanTarget + 'ing',
    cleanTarget + 'ed',
    cleanTarget + 's',
  ].map((opt, idx) => {
    let cleanOpt = opt.replace(/eeding$/, 'eding').replace(/iing$/, 'ing');
    if (isCapitalized) {
      return cleanOpt.charAt(0).toUpperCase() + cleanOpt.slice(1);
    }
    return cleanOpt.toLowerCase();
  });

  return {
    question: cleanSentence.replace(targetWord, '___') + punct,
    options,
    answer: 0,
    explanation: `"${cleanTarget}" fits the structure perfectly to mean: "${point.description}".`
  };
}

export function translateTitleToChinese(title: string): string {
  const dict: { [key: string]: string } = {
    "Present Simple": "一般现在时",
    "Present Continuous": "现在进行时",
    "Past Simple (Regular)": "一般过去时(规则)",
    "Past Simple (Irregular)": "一般过去时(不规则)",
    "Imperative": "祈使句",
    "Past Continuous": "过去进行时",
    "Present Perfect Simple (Introduction)": "现在完成时(初识)",
    "Future: will": "将来时(will)",
    "Future: going to": "将来时(going to)",
    "Future: Present Continuous for arrangements": "现在进行时表计划",
    "Present Perfect vs Past Simple": "现在完成时 VS 一般过去时",
    "Present Perfect Continuous": "现在完成进行时",
    "Past Perfect Simple": "过去完成时",
    "Used to / Would (past habits)": "过去习惯(used to/would)",
    "Future: will vs going to (nuanced)": "将来时(will VS going to)",
    "Future: Present Simple for timetables": "一般现在时表时间表",
    "Past Perfect Continuous": "过去完成进行时",
    "Future Continuous": "将来进行时",
    "Future Perfect Simple": "将来完成时",
    "Future Perfect Continuous": "将来完成进行时",
    "Narrative Tenses (combined)": "叙事时态(综合运用)",
    "Future in the Past": "过去将来时",
    "Advanced Aspect Distinctions": "高级体态辨析",
    "Be to + infinitive": "be to + 动词原形",
    "Subtle Tense-Aspect Interaction": "时态与体微末互动",
    "Historical Present & Dramatic Narrative": "历史现在时与戏剧化叙事",
    "Can / Can't (Ability)": "Can/Can't(能力)",
    "Can / Could (Requests)": "Can/Could(请求)",
    "Must / Mustn't": "Must/Mustn't(义务与禁止)",
    "Have to / Don't have to": "Have to/Don't have to",
    "Should / Shouldn't": "Should/Shouldn't(建议)",
    "Would like": "Would like(意愿)",
    "Must vs Have to (nuanced)": "Must VS Have to(辨析)",
    "May / Might (Possibility)": "May/Might(可能性)",
    "Could (Past Ability & Possibility)": "Could(过去能力/推测)",
    "Should have / Must have / Could have": "情态动词+have done",
    "Had better": "Had better(最好)",
    "Modal Verbs of Deduction (present)": "情态动词推测(现在)",
    "Modal Verbs of Deduction (past)": "情态动词推测(过去)",
    "Need (modal vs semi-modal)": "Need(情态/实义)",
    "Needn't have vs Didn't need to": "Needn't have VS Didn't need to",
    "Dare (modal usage)": "Dare(情态用法)",
    "Shall (formal/legal)": "Shall(正式/法律用法)",
    "Be supposed to / Be bound to / Be due to": "应该/必定/预定",
    "Would (habitual past & hypothetical)": "Would(过去习惯/假设)",
    "Modal Stacking & Complex Modality": "多重情态表达",
    "Epistemic vs Deontic Modality": "认识与道义情态",
    "Zero Conditional (basic)": "零条件句(基础)",
    "First Conditional": "第一条件句",
    "Second Conditional": "第二条件句",
    "Unless / As long as / Provided that": "条件连词(unless等)",
    "Third Conditional": "第三条件句",
    "Mixed Conditionals": "混合条件句",
    "I wish / If only (present & past)": "I wish/If only虚拟",
    "Inverted Conditionals": "条件句倒装",
    "But for / Were it not for": "要不是/若非(虚拟)",
    "Suppose / Supposing / What if": "设想/要是...会怎么样",
    "It's (high) time + past subjunctive": "It's time + 过去时",
    "If + will/would (politeness & willingness)": "If + will/would(委婉)",
    "Implied & Embedded Conditionals": "暗含与嵌入式条件句",
    "Subjunctive in formal contexts": "正式文体中的虚拟语气",
    "Present Simple Passive": "一般现在时被动语态",
    "Past Simple Passive": "一般过去时被动语态",
    "Present Perfect Passive": "现在完成时被动语态",
    "Future Passive (will)": "一般将来时被动语态(will)",
    "Modal Passive": "情态动词被动语态",
    "Past Perfect Passive": "过去完成时被动语态",
    "Continuous Passive (progressive)": "进行时被动语态",
    "Have / Get something done (Causative)": "使役用法(have/get done)",
    "It is said / believed / thought (Impersonal)": "人们说/认为(非人称被动)",
    "Subject + is said to + infinitive": "主语 + is said to + 不定式",
    "Passive of Reporting Verbs (all forms)": "汇报动词被动语态",
    "Advanced Causative Variations": "使役动词高级变体",
    "Passive in Formal & Academic Register": "正式/学术语体被动",
    "Double Passive & Complex Passive Chains": "双重被动与复杂被动链",
    "Reported Speech (basic statements)": "间接引语(基本陈述)",
    "Reported Questions": "间接引语(疑问句)",
    "Reported Commands & Requests": "间接引语(命令与请求)",
    "Tense Backshift Rules": "时态回退规则",
    "Reported Speech: Time & Place Changes": "间接引语(时间地点转换)",
    "Reporting Verbs (wide range)": "汇报动词(多样化选择)",
    "Reporting Verb Patterns": "汇报动词句型结构",
    "Optional Backshift & No Backshift": "无需时态回退的情况",
    "Reporting with Should/Subjunctive": "汇报动词+should/虚拟",
    "Sophisticated Reporting Strategies": "间接引语高级叙事策略",
    "Yes/No Questions (be & do)": "一般疑问句(be & do)",
    "Wh- Questions": "特殊疑问句",
    "Basic Negation (don't/doesn't/isn't/aren't)": "基本否定句",
    "Question Tags (basic)": "反义疑问句(基础)",
    "Negative Questions": "否定疑问句",
    "Indirect / Embedded Questions": "间接/嵌入式疑问句",
    "Subject vs Object Questions": "主语VS宾语疑问句",
    "Negative Adverbials + Inversion": "否定副词引起的倒装",
    "Question Tags (advanced)": "反义疑问句(高级)",
    "Rhetorical Questions": "修辞性疑问句/反问句",
    "Echo Questions & Reply Questions": "回声疑问句与回应疑问句",
    "Complex Negative Scope & Double Negation": "复杂否定与双重否定",
    "Defining Relative Clauses (who/which/that)": "限制性定语从句",
    "Relative Pronoun: where": "关系副词: where",
    "Non-defining Relative Clauses": "非限制性定语从句",
    "Omitting the Relative Pronoun": "关系代词的省略",
    "Whose / Where / When in Relatives": "whose/where/when引导定从句",
    "Preposition + Relative Pronoun": "介词 + 关系代词",
    "Quantifier + of which/whom": "数量词 + of which/whom",
    "Reduced Relative Clauses (Participle)": "简缩定语从句(分词)",
    "Which referring to whole clause": "which指代整个主句",
    "What as relative pronoun": "what引导名词性从句",
    "Complex & Nested Relative Clauses": "复杂与嵌套定语从句",
    "A / An (Indefinite Article)": "不定冠词: a / an",
    "The (Definite Article — basic)": "定冠词: the (基础)",
    "This / That / These / Those": "指示代词: this/that等",
    "My / Your / His / Her / Its / Our / Their": "物主代词: my/your等",
    "Some / Any": "some / any 的用法",
    "No / None": "no / none (零数量)",
    "Zero Article": "零冠词",
    "The with geographical names": "the 与地理名词",
    "Some / Any (advanced uses)": "some / any 高级用法",
    "Articles with Abstract & Uncountable Nouns": "抽象/不可数名词冠词",
    "Articles in Fixed Expressions": "固定表达中的冠词",
    "Advanced Article Usage": "高级冠词用法",
    "Each / Every / Either / Neither": "每一/任一/都不",
    "Article Choice in Academic Register": "学术语体中的冠词选择",
    "Singular & Plural Nouns": "单数与复数名词",
    "Subject Pronouns": "主格代词(I/you等)",
    "Object Pronouns": "宾格代词(me/you等)",
    "Possessive 's": "名词所有格's",
    "Countable & Uncountable Nouns": "可数与不可数名词",
    "Possessive Pronouns": "名词性物主代词",
    "Reflexive Pronouns": "反身代词",
    "Indefinite Pronouns": "不定代词",
    "One / Ones (substitution)": "代词 one/ones 的替代",
    "Reciprocal Pronouns": "相互代词(each other等)",
    "Compound Nouns": "复合名词",
    "It as dummy/empty subject": "It作形式/虚设主语",
    "There as dummy subject (advanced)": "There作形式主语(高级)",
    "Generic Pronouns & Referencing": "泛指代词与指代",
    "Nominalisation": "名词化",
    "Basic Adjectives (position & agreement)": "基本形容词位置",
    "Adverbs of Frequency": "频度副词",
    "Comparative Adjectives": "形容词比较级",
    "Superlative Adjectives": "形容词最高级",
    "Adverbs of Manner": "方式副词",
    "(Not) as ... as": "比较级 (not) as...as",
    "Too / Enough": "too / enough 的用法",
    "Adjective Order": "多个形容词修饰顺序",
    "Adverbs of Degree": "程度副词",
    "Comparative & Superlative Adverbs": "副词比较级与最高级",
    "-ed vs -ing Adjectives": "ed/ing形容词辨析",
    "Modifying Comparatives": "修饰比较级",
    "The ... the ... (double comparative)": "the... the...(双重比较)",
    "Adverb Position & Focus": "副词位置与焦点",
    "Gradable vs Non-gradable Adjectives": "可级与不可级形容词",
    "Intensifiers & Downtoners": "增强词与缓和词",
    "Compound Adjectives": "复合形容词",
    "Adjectives after Nouns (postmodification)": "形容词后置修饰",
    "Comment & Viewpoint Adverbs": "评注与观点副词",
    "Evaluative & Stance Adjectives/Adverbs": "评价与立场形副词",
    "Prepositions of Place (basic)": "方位介词(基础)",
    "Prepositions of Time (basic)": "时间介词(基础)",
    "Prepositions of Movement": "方向与运动介词",
    "Prepositions of Time (extended)": "时间介词(延伸用法)",
    "Prepositions after Adjectives": "形容词后的固定介词",
    "Prepositions after Verbs": "动词后的固定介词",
    "Prepositions after Nouns": "名词后的固定介词",
    "Complex Prepositions": "复合介词(in spite of等)",
    "Prepositional Phrases for Cohesion": "介词短语衔接",
    "Preposition Stranding vs Fronting": "介词悬空与前置",
    "Abstract/Metaphorical Prepositions": "抽象与比喻性介词",
    "Preposition Nuance in Academic Writing": "学术写作介词微末辨析",
    "And / But / Or / So / Because": "并列与原因连词",
    "When / While / Before / After": "时间连词",
    "Although / However / But": "让步与转折连词",
    "In addition / Moreover / Furthermore": "递进连词",
    "Therefore / Consequently / As a result": "因果连词",
    "Despite / In spite of": "让步连词(despite等)",
    "So that / In order to / To (purpose)": "目的连词/不定式",
    "Whereas / While (contrast)": "对比连词(whereas等)",
    "Never-theless / Nonetheless / Even so": "让步连接词",
    "Provided (that) / As long as / On condition that": "条件连词",
    "Not only ... but also / Both ... and / Either ... or / Neither ... nor": "关联连词",
    "Notwithstanding / Inasmuch as / Insofar as": "正式连接词",
    "Discourse Markers": "话语标记语",
    "Hedging & Qualifying Connectors": "限制与修饰连接词",
    "Sophisticated Cohesive Devices": "高级衔接手段",
    "Verb + to + infinitive (basic)": "动词+to不定式(基础)",
    "Verb + -ing (basic)": "动词+-ing动名词(基础)",
    "Like / Love / Hate / Prefer + -ing or to": "like/love后接ing或to",
    "Verb + -ing vs Verb + to (different meaning)": "接ing与to不同含义",
    "Verb + object + to + infinitive": "动词+宾语+to不定式",
    "Adjective + to + infinitive": "形容词+to不定式",
    "Preposition + -ing": "介词+-ing动名词",
    "Complex Gerund & Infinitive Patterns": "复杂动名词与不定式",
    "Perfect Infinitive & Perfect Gerund": "完成不定式与完成动名词",
    "Passive Infinitive & Passive Gerund": "被动不定式与被动动名词",
    "Verbs + bare infinitive": "动词+省to不定式",
    "Subject Position Gerunds & Infinitives": "动名词/不定式作主语",
    "Nuanced Gerund/Infinitive Selection": "动名词/不定式高级选择",
    "A lot of / Lots of": "a lot of/lots of 用法",
    "Much / Many": "much / many 用法",
    "A few / A little": "a few / a little 用法",
    "Few / Little (without 'a')": "few / little (否定含义)",
    "All / Most / Some / Any / No": "全称/特称代量词",
    "Both / Either / Neither": "两者及选择代词",
    "Every / Each": "every / each 辨析",
    "Plenty of / A great deal of / A number of": "大量/许多表达",
    "Whole / Entire / All of": "完整性限定词",
    "Hardly any / Scarcely any / Barely any": "几乎没有",
    "Such / So + quantifier patterns": "such/so+数量词句型",
    "Partitive & Complex Quantification": "部分与复杂数量表达",
    "Simple Sentences (SVO)": "简单句(SVO主谓宾)",
    "There is / There are": "There be 句型",
    "Compound Sentences": "并列复合句",
    "Complex Sentences": "主从复合句",
    "Time Clauses": "时间状语从句",
    "Reason & Result Clauses": "原因与结果状语从句",
    "Cleft Sentences (It is/was ... that/who)": "It 引导的分裂强调句",
    "What-cleft (Pseudo-cleft)": "What 引导的拟分裂强调句",
    "Participle Clauses": "分词状语从句",
    "Fronting / Preposing": "前置与倒装强调",
    "Inversion for Emphasis": "强调性倒装",
    "Extraposition": "外置(形式主语/宾语)",
    "Ellipsis & Substitution": "省略与替代",
    "Garden Path & Complex Embedding": "花园路径句与复杂嵌套",
    "Information Structure (Theme-Rheme)": "信息结构(主位-述位)",
    "Basic Prefixes (un-, re-)": "基本前缀(un-, re-)",
    "Basic Suffixes (-er, -ly, -ful, -tion)": "基本后缀(-er, -ly等)",
    "Noun Suffixes (-ment, -ness, -ity, -ance/-ence)": "名词后缀",
    "Adjective Suffixes (-able, -ous, -ive, -al)": "形容词后缀",
    "Negative Prefixes (dis-, im-/in-/ir-/il-, mis-)": "否定前缀",
    "Advanced Prefixes (over-, under-, pre-, post-, multi-, anti-)": "高级前缀",
    "Verb Formation (-ise/-ize, -ify, -en)": "动词后缀",
    "Nominalisation for Academic Writing": "学术写作名词化",
    "Derivation Chains": "派生词链",
    "Productive Morphology & Neologisms": "高产形态学与新词制造",
    "Common Inseparable Phrasal Verbs": "不可分短语动词",
    "Common Separable Phrasal Verbs": "可分短语动词",
    "Phrasal Verbs: Expanded Set": "常用短语动词扩充",
    "Three-word Phrasal Verbs": "三词短语动词",
    "Phrasal Verbs: Business & Academic": "商务与学术短语动词",
    "Phrasal Verbs with Multiple Meanings": "多义短语动词",
    "Formal Equivalents of Phrasal Verbs": "短语动词的正式单语替代",
    "Idiomatic Phrasal Verbs": "习语性短语动词",
    "Phrasal Verb Nominalisation": "短语动词名词化",
    "Capital Letters & Full Stops": "大写字母与句号",
    "Question Marks & Exclamation Marks": "问号与感叹号",
    "Apostrophes (possession & contraction)": "撇号(所有格与缩写)",
    "Commas (lists, clauses, introductory)": "逗号的用法",
    "Colons & Semicolons": "冒号与分号的用法",
    "Reported Speech Punctuation": "直接引语标点规范",
    "Dashes, Parentheses & Advanced Punctuation": "破折号/括号高级标点",
    "Punctuation for Rhetorical Effect": "修辞性标点效果",
    "Formal vs Informal Register (intro)": "正式与非正式语体初识",
    "Linking & Cohesion Across Paragraphs": "段落间衔接与连贯",
    "Written vs Spoken Grammar": "书面语与口语语法差异",
    "Hedging & Vague Language": "模糊限制语(Hedging)",
    "Formal Written Style (academic)": "学术/正式书面风格",
    "Emphasis & Focus Techniques": "强调与聚焦技术",
    "Pragmatic Competence": "语用能力",
    "Register Shifting": "语体转换",
    "Textual Coherence & Macro-structure": "语篇连贯与宏观结构"
  };

  if (dict[title]) return dict[title];
  
  // Try cleanups / fallback keyword mapping for variations
  let clean = title;
  clean = clean.replace("Passive Voice", "被动语态");
  clean = clean.replace("Reported Speech", "间接引语");
  clean = clean.replace("Phrasal Verbs", "短语动词");
  clean = clean.replace("Relative Clauses", "定语从句");
  
  return clean;
}

// Core processing to build all continents, points, grids, and dependencies
export function buildGrammarWorld(
  customSeed: string = '',
  scaleFactor: number = 0.60,
  roughnessFactor: number = 1.9,
  islandSpread: number = 1.2,
  customOffsets?: Record<string, { x: number; y: number }[]>
): Continent[] {
  const lines = RAW_CSV.split('\n').filter(l => l.trim() !== '');
  const headers = parseCSVLine(lines[0]); // header row

  const parsedPoints: (GrammarPoint & { rawCategory: string })[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    if (row.length < 9) continue;

    const id = row[0];
    const cefrLevel = row[1];
    const exam = row[2];
    const category = row[3];
    const categoryCn = row[4];
    const icon = row[5];
    const title = row[6];
    const desc = row[7];
    const example = row[8];
    const tags = row[9] ? row[9].split(';').map(t => t.trim()) : [];

    // Create partial point structure
    const partialPoint = {
      id: `gp-${id}`,
      name: title,
      chineseName: translateTitleToChinese(title),
      description: desc,
      examples: [example],
      levels: [mapExamToLevel(exam)],
    };

    const quiz = createQuiz(partialPoint);

    parsedPoints.push({
      ...partialPoint,
      quiz,
      position: { x: 0, y: 0 }, // Filled later by grid layout
      rawCategory: category,
      dependencies: [], // Built in secondary pass
    });
  }

  // Segment points into EGP aligned territorial bodies
  const tensesPoints = parsedPoints.filter(p => p.rawCategory === 'Tenses & Aspect');
  
  const modalsPoints = parsedPoints.filter(
    p => p.rawCategory === 'Modal Verbs' || p.rawCategory === 'Conditionals & Hypothetical'
  );
  
  const pragmaticsPoints = parsedPoints.filter(
    p => p.rawCategory === 'Punctuation & Written Conventions' || p.rawCategory === 'Style, Register & Discourse'
  );
  
  const structuralPoints = parsedPoints.filter(
    p =>
      p.rawCategory === 'Passive Voice' ||
      p.rawCategory === 'Reported Speech' ||
      p.rawCategory === 'Questions & Negation' ||
      p.rawCategory === 'Relative Clauses' ||
      p.rawCategory === 'Sentence Structure & Clause Types' ||
      p.rawCategory === 'Gerunds & Infinitives'
  );
  
  const lexicalPoints = parsedPoints.filter(
    p =>
      p.rawCategory === 'Articles & Determiners' ||
      p.rawCategory === 'Nouns, Pronouns & Possession' ||
      p.rawCategory === 'Adjectives & Adverbs' ||
      p.rawCategory === 'Prepositions' ||
      p.rawCategory === 'Conjunctions & Connectors' ||
      p.rawCategory === 'Quantifiers & Determiners' ||
      p.rawCategory === 'Word Formation' ||
      p.rawCategory === 'Phrasal Verbs'
  );

  // Generate perfect grid boundaries for each of the 4 big landmasses
  // Coordinates already include saved continent offsets
  const seedSuffix = customSeed;

  const { points: finalTenses, mainlandPath: tensesPath } = generateInterlockingGrid(
    tensesPoints,
    260,   // xMin (Northwest) - offset +60
    490,   // yMin - offset +440
    860,   // xMax - offset +60
    1090,  // yMax - offset +440
    6,     // cols
    5,     // rows
    'tenses' + seedSuffix,
    scaleFactor,
    roughnessFactor,
    customOffsets?.tenses
  );

  const { points: finalModals, mainlandPath: modalsPath } = generateInterlockingGrid(
    modalsPoints,
    1685,  // xMin (Northeast Highlands) - offset -15
    182,   // yMin - offset +132
    2652,  // xMax - offset -15
    682,   // yMax - offset +132
    7,     // cols
    5,     // rows
    'modals' + seedSuffix,
    scaleFactor,
    roughnessFactor,
    customOffsets?.modals
  );

  const { points: finalPragmatics, mainlandPath: pragmaticsPath } = generateInterlockingGrid(
    pragmaticsPoints,
    2094,  // xMin (Eastern Peninsula) - offset -6
    599,   // yMin - offset +49
    2661,  // xMax - offset -6
    1499,  // yMax - offset +49
    3,     // cols
    6,     // rows
    'pragmatics' + seedSuffix,
    scaleFactor,
    roughnessFactor,
    customOffsets?.pragmatics
  );

  const { points: finalStructural, mainlandPath: structuralPath } = generateInterlockingGrid(
    structuralPoints,
    700,   // xMin - moved right to 700
    574,   // yMin
    2000,  // xMax - adjusted for new rx
    1524,  // yMax
    10,    // cols
    8,     // rows
    'structural' + seedSuffix,
    scaleFactor,
    roughnessFactor,
    customOffsets?.structural
  );

  // Generate beautiful floating micro-islands for Lexical Archipelago (Morph Archipelago) in the South
  const finalLexical = generateArchipelagoIslands(
    lexicalPoints,
    'lexical' + seedSuffix,
    islandSpread
  );

  // Helper to build cohesive progressional prerequisite routes (lower levels act as triggers to next nodes)
  const applyDependencies = (list: GrammarPoint[]) => {
    for (let k = 1; k < list.length; k++) {
      const current = list[k];
      const prev = list[k - 1];
      current.dependencies = [prev.id];
    }
  };

  applyDependencies(finalTenses);
  applyDependencies(finalModals);
  applyDependencies(finalPragmatics);
  applyDependencies(finalStructural);
  applyDependencies(finalLexical);

  // Return the final beautiful full-scale map model
  return [
    {
      id: 'tenses',
      name: 'Tense Island',
      chineseName: '时态岛',
      color: '#FCD34D', // Yellow
      position: { x: 320, y: 320 },
      path: tensesPath,
      points: finalTenses,
    },
    {
      id: 'modals',
      name: 'Modal Highlands',
      chineseName: '情态高地',
      color: '#FCA5A5', // Soft Orange/Red
      position: { x: 1700, y: 260 },
      path: modalsPath,
      points: finalModals,
    },
    {
      id: 'pragmatics',
      name: 'Pragmatic Peninsula',
      chineseName: '语用半岛',
      color: '#A7F3D0', // Soft Green/Teal
      position: { x: 2065, y: 930 },
      path: pragmaticsPath,
      points: finalPragmatics,
    },
    {
      id: 'structural',
      name: 'Syntax Mainland',
      chineseName: '句法大陆',
      color: '#93C5FD', // Soft Blue
      position: { x: 1125, y: 860 },
      path: structuralPath,
      points: finalStructural,
    },
    {
      id: 'lexical',
      name: 'Morph Archipelago',
      chineseName: '形态群岛',
      color: '#C084FC', // Soft Purple
      position: { x: 1200, y: 1450 },
      points: finalLexical,
    },
  ];
}

export const CONTINENTS: Continent[] = buildGrammarWorld();
