export type RecommendationType = 'article' | 'book' | 'video' | 'course';
export type RecommendationStatus = 'finished' | 'in-progress' | 'to-do';

export interface Recommendation {
  id: string;
  title: string;
  url: string;
  author: string;
  type: RecommendationType;
  status: RecommendationStatus;
  subtitle?: string;
  summary: string;
  thoughts?: string[];
  quote?: {
    text: string;
    author: string;
    source?: string;
  };
  tags: string[];
  date: string;
}

export const recommendations: Recommendation[] = [
  {
    id: 'ddd-vs-relational-database-same-name-different-entity',
    title: 'DDD Thinking vs. Relational Database Design: Same Name, Different Entity',
    url: 'https://www.linkedin.com/learning/software-architecture-domain-driven-design/same-name-different-entity',
    author: 'LinkedIn Learning',
    type: 'course',
    status: 'finished',
    subtitle: 'Bounded Contexts vs. Monolithic Global Database Schemas',
    summary:
      'Analyzing the divergence between relational database normalization (single shared global tables) and Domain-Driven Design (context-specific models where the same noun represents different entities across Bounded Contexts).',
    thoughts: [
      'The Relational Database Normalization Trap: Traditional DB design tries to create a single canonical table for each entity (e.g., a massive User or Account table with dozens of nullable columns shared across the enterprise). This creates tight schema coupling and high regression risks during database migrations.',
      'DDD "Same Name, Different Entity" Principle: In DDD, a noun (like User, Account, or Product) has fundamentally different responsibilities across Bounded Contexts. In Identity, it’s credentials; in Billing, it’s invoices and payment methods; in Logistics, it’s delivery address and tracking slots.',
      'Modeling each bounded context with its own purpose-built model and isolated database schema prevents domain contamination and enables autonomous microservice evolution.'
    ],
    quote: {
      text: 'Do not unify domain entities under a single canonical schema just because they share a name. The same real-world noun represents completely different models with distinct invariants across different Bounded Contexts.',
      author: 'Domain-Driven Design Principles',
      source: 'Software Architecture: DDD'
    },
    tags: ['domain-model', 'architecture', 'microservices', 'clean-code'],
    date: '2026-08-31'
  },
  {
    id: 'ddd-software-architecture-orchestrated-declarative',
    title: 'Software Architecture: Domain-Driven Design',
    url: 'https://www.linkedin.com/learning/software-architecture-domain-driven-design/orchestrated-declarative-systems',
    author: 'LinkedIn Learning',
    type: 'course',
    status: 'finished',
    subtitle: 'Declarative vs. Imperative Microservices Communication & Orchestrated Systems',
    summary:
      'A comprehensive synthesis bridging Microservices, Domain-Driven Design (DDD), Declarative vs. Imperative communication, Sync vs. Async patterns, and Agile delivery.',
    thoughts: [
      'A powerful synthesis uniting Microservices, DDD Bounded Contexts, Declarative vs. Imperative communication, and Sync vs. Async orchestration.',
      'Why Imperative RPC Fails in Microservices: In classic DDD microservices, services should not use imperative RPC across the network (e.g., OrderService commanding BillingService.createBill()). Imperative calls create tight behavioral, temporal, and failure coupling—turning microservices into a fragile distributed monolith.',
      'The Declarative / Event-Driven Alternative: Emit domain events declaring facts that happened (e.g., OrderPlaced). Downstream bounded contexts listen declaratively and execute their own domain invariants independently, preserving true service autonomy.'
    ],
    quote: {
      text: 'In Domain-Driven microservices, avoid imperative commands over the network. Favor declarative domain events that declare what happened, allowing bounded contexts to remain truly autonomous and decoupled.',
      author: 'Software Architecture: DDD',
      source: 'LinkedIn Learning'
    },
    tags: ['architecture', 'domain-model', 'microservices', 'distributed-systems', 'system-design'],
    date: '2026-08-31'
  },
  {
    id: 'uncle-bob-software-fundamentals-age-of-ai',
    title: 'Software Fundamentals in the Age of AI',
    url: 'https://www.youtube.com/live/zcLPGC-tvgk',
    author: 'Robert C. Martin (Uncle Bob)',
    type: 'video',
    status: 'finished',
    subtitle: 'Agent pipelines, architecture boundaries, and timeless craftsmanship',
    summary:
      'Uncle Bob delivers a masterclass on how AI agents accelerate coding speed while proving that clean code, deep modules, deterministic verification, and fundamental engineering disciplines matter more than ever.',
    thoughts: [
      'Engineering with Agents: Constrain agents with deterministic tools (compilers, linters, mutation tests) rather than long, vague prompts. Use single-purpose multi-agent pipelines (Specifier → Coder → Cleaner → Hardener → QA) instead of trying to make one prompt do everything.',
      'Architecture Still Wins: What confuses humans still confuses AI models. Strict modular boundaries, deep modules, and clean separation of concerns prevent agent thrashing and context pollution. Full-blown spec-driven upfront planning fails—choose rapid agile iteration.',
      'Career & Fundamentals: Learn the fundamentals from the ground up and write code by hand to build deep mental models. Study classic engineering literature to understand historical struggles and the "why" behind architecture.'
    ],
    quote: {
      text: 'What confuses humans still confuses AI agents. Clean architecture, strict modular boundaries, and deterministic verification tools are not obsolete—they are the only way to steer AI at scale without drowning in technical debt.',
      author: 'Robert C. Martin (Uncle Bob)',
      source: 'Software Fundamentals in the Age of AI'
    },
    tags: ['ai', 'clean-code', 'architecture', 'code-craftsmanship', 'productivity', 'engineering-culture'],
    date: '2026-08-31'
  },
  {
    id: 'uber-money-scale-strong-data',
    title: 'Revolutionizing Money Movements at Scale with Strong Data Consistency',
    url: 'https://www.uber.com/blog/money-scale-strong-data/',
    author: 'Uber Engineering',
    type: 'article',
    status: 'finished',
    subtitle: 'Double-entry accounting engine & strong consistency in the face of CAP theorem',
    summary:
      'How Uber re-engineered its global payments platform across 10,000+ cities using immutable double-entry ledger bookkeeping to guarantee financial accuracy and zero downtime under massive scale.',
    thoughts: [
      'Handling financial balances at global scale cannot tolerate eventual consistency or floating-point rounding errors. Double-entry bookkeeping (every debit paired with an equal credit) provides mathematical invariant checking.',
      'Under CAP theorem constraints, money platforms must enforce strict linearizability for balance mutations while offloading reads through read-replicated materialized views.'
    ],
    quote: {
      text: 'To ensure data consistency and accuracy across millions of daily transactions, financial platforms must be founded on immutable ledgers and strict double-entry accounting invariants.',
      author: 'Uber Payments Engineering',
      source: 'Uber Engineering Blog'
    },
    tags: ['distributed-systems', 'architecture', 'scalability', 'system-design', 'storage-engines'],
    date: '2026-08-31'
  },
  {
    id: 'uber-migrating-dynamodb-docstore',
    title: 'How Uber Migrated Financial Data from DynamoDB to Docstore',
    url: 'https://www.uber.com/blog/migrating-financial-data-dynamodb-to-docstore/',
    author: 'Uber Engineering',
    type: 'article',
    status: 'finished',
    subtitle: 'Petabyte-scale zero-downtime migration of trillions of financial records',
    summary:
      'The multi-year architectural journey of migrating petabytes of immutable financial ledger records from Amazon DynamoDB to Uber’s in-house distributed database, Docstore, saving $6M+ annually.',
    thoughts: [
      'Migrating trillions of financial records requires shadow writes, dual reads with automated diff reconcilers, and fallback mechanisms to ensure 100% data correctness with zero downtime.',
      'Moving from a managed cloud NoSQL store to an internal distributed database (Docstore atop MySQL) provided greater control over transaction semantics, verifiable immutability, and petabyte-scale cost efficiency.'
    ],
    quote: {
      text: 'Migrating petabytes of financial transactions requires transparent dual-read/dual-write verification pipelines with cryptographic immutability guarantees to ensure zero data drift.',
      author: 'Uber Storage Platform',
      source: 'Uber Engineering Blog'
    },
    tags: ['distributed-systems', 'storage-engines', 'architecture', 'scalability'],
    date: '2026-08-31'
  },
  {
    id: 'uber-ledgerstore-trillions-indexes',
    title: 'How LedgerStore Supports Trillions of Indexes at Uber',
    url: 'https://www.uber.com/blog/how-ledgerstore-supports-trillions-of-indexes-at-uber/',
    author: 'Uber Engineering',
    type: 'article',
    status: 'finished',
    subtitle: 'Strongly consistent and eventually consistent petabyte-scale indexing architecture',
    summary:
      'Deep technical dive into LedgerStore’s indexing engine, supporting over 2 trillion unique index entries with two-phase intent indexing for strong consistency alongside materialized views for fast queries.',
    thoughts: [
      'Strongly Consistent Indexes: Used for critical real-time validation (e.g. credit card authorization) via a two-phase commit intent pattern to prevent duplicate charges.',
      'Eventually Consistent Indexes: Powered by change data capture and materialized views for high-throughput analytical and customer lookup queries.',
      'Demonstrates how ledger immutability paired with dual-model indexing solves the CAP balance dilemma at planetary scale.'
    ],
    quote: {
      text: 'LedgerStore maintains over 2 trillion unique indexes by bifurcating indexing paths: two-phase commit intent records for strong real-time consistency and asynchronous materialized views for high-volume lookup patterns.',
      author: 'Uber Data Infrastructure',
      source: 'Uber Engineering Blog'
    },
    tags: ['distributed-systems', 'scalability', 'architecture', 'system-design'],
    date: '2026-08-31'
  },
  {
    id: 'behavior-driven-development-methodology',
    title: 'Behavior-Driven Development: Behavior Before Function',
    url: 'https://www.linkedin.com/learning/behavior-driven-development/behavior-before-function',
    author: 'LinkedIn Learning',
    type: 'course',
    status: 'finished',
    subtitle: 'Behavior Before Function & Demystifying BDD vs. Acceptance Testing',
    summary:
      'Exploring why defining observable behavior must precede function implementation, while clarifying the distinction between writing .feature files as automated acceptance tests and practicing full collaborative BDD.',
    thoughts: [
      'Behavior Before Function: Traditional development instinctively starts with technical functions and APIs ("how do we code this method?"). BDD flips this paradigm to discover and specify observable system behavior first ("what outcome does the user need?"). Functions exist strictly to fulfill verified behaviors, eliminating speculative abstractions.',
      'Writing Feature Files (Specification as Test): A clean, highly readable way to structure automated acceptance tests. It keeps test logic human-readable and decoupled from code implementation, allowing the team to validate the system as a black box based on expected behavior.',
      'BDD as a Development Methodology: An evolution of TDD that starts before coding begins. It’s a discovery and alignment practice where engineering, product, and business collaborate on requirements through concrete examples using a shared ubiquitous language.',
      'In fast-paced delivery environments, using Cucumber and Gherkin purely for automated acceptance testing brings great structure. Teams doing this can unlock even greater value by embracing the full BDD discovery cycle.'
    ],
    quote: {
      text: 'Focus on behavior before function. BDD is not about tools or syntax; it is about building a shared understanding through conversation, concrete examples, and an executable ubiquitous language.',
      author: 'Dan North / BDD Community',
      source: 'Behavior-Driven Development'
    },
    tags: ['bdd', 'agile', 'engineering-culture', 'clean-code', 'productivity'],
    date: '2026-08-31'
  },
  {
    id: 'programming-with-guts-kevlin-henney',
    title: 'Programming with GUTs',
    url: 'https://www.youtube.com/watch?v=azoucC_fwzw',
    author: 'Kevlin Henney',
    type: 'video',
    status: 'finished',
    subtitle: 'Goodhart’s Law, language idioms, and the pitfalls of software metrics',
    summary:
      'Kevlin Henney explores the language, terms, and mental models programmers use, explaining Goodhart’s Law and why software engineering metrics collapse when treated as control targets.',
    thoughts: [
      'Goodhart’s Law in Software: "Once a metric becomes a target, it loses its meaning as a measure." When management turns measures (test coverage percentage, velocity, story points, PR counts) into targets, teams inevitably game the system.',
      'A masterclass on engineering terminology, cognitive ergonomics, and how clear language prevents systemic design failure.'
    ],
    quote: {
      text: 'Once a metric becomes a target, it loses its meaning as a measure. Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes.',
      author: 'Kevlin Henney / Charles Goodhart',
      source: 'Programming with GUTs'
    },
    tags: ['engineering-culture', 'agile', 'productivity', 'code-craftsmanship', 'clean-code'],
    date: '2026-08-31'
  },
  {
    id: 'oop-is-bad-brian-will',
    title: 'Object-Oriented Programming is Bad',
    url: 'https://www.youtube.com/watch?v=QM1iUe6IofM&list=PL6toJBcrFoewlVif6nLkhAQtqb0bBGpus',
    author: 'Brian Will',
    type: 'video',
    status: 'finished',
    subtitle: 'A foundational critique of object-oriented design and accidental complexity',
    summary:
      'Brian Will makes a structured, provocative case against OOP, arguing that combining state and behavior into encapsulation graphs produces rigid webs of mutation, complex patterns, and maintenance overhead.',
    thoughts: [
      'Presents a strong case that OOP’s core promise—bundling mutable state with functions behind encapsulation—often introduces more problems than it solves.',
      'Helps clarify why modern enterprise codebases inevitably drift toward procedural/anemic service layers: real-world business pipelines flow naturally as transformations over data records rather than autonomous mutating objects.',
      'Advocates for Data-Oriented Programming: keeping data structures dumb/transparent and logic pure, testable, and stateless.'
    ],
    quote: {
      text: 'Object-oriented programming is not just misunderstood or misused; its fundamental ideas create unnecessary complexity and tangled dependency graphs that make code harder to reason about.',
      author: 'Brian Will',
      source: 'Object-Oriented Programming is Bad'
    },
    tags: ['oop', 'architecture', 'design', 'clean-code', 'domain-model'],
    date: '2026-08-31'
  },
  {
    id: 'clean-code-cheat-sheet',
    title: 'Clean Code Principles & Smells Cheat Sheet',
    url: 'https://en.bbv.ch/wp-content/uploads/2020/02/Clean-Code-Prinzipien-Umsetzung.pdf',
    author: 'bbv Software Services',
    type: 'article',
    status: 'finished',
    subtitle: 'Cost of Change (CoC) economics, technical debt curve, and core design smells',
    summary:
      'A dense, high-value visual reference mapping out why clean code keeps the Cost of Change constant over time, alongside definitions for the 8 core architectural smells.',
    thoughts: [
      'Cost of Change (CoC) vs. Responsiveness: Writing clean code is an investment in keeping the cost of change constant throughout a project’s lifecycle. Quick and dirty code leads to mounting technical debt where costs skyrocket and responsiveness drops off a cliff.',
      'Succinctly catalogs the 8 classic design smells: Rigidity (cascading changes), Fragility (breaking in unrelated places), Immobility (inability to reuse), Viscosity of Design & Environment (shortcuts are easier / slow feedback loops), Needless Complexity, Needless Repetition, and Opacity.'
    ],
    quote: {
      text: 'Code is clean if it can be understood easily – by everyone on the team. With understandability comes readability, changeability, extensibility and maintainability. All the things needed to keep a project going over a long time without accumulating a large amount of technical debt.',
      author: 'bbv Software Services',
      source: 'Clean Code Cheat Sheet'
    },
    tags: ['clean-code', 'architecture', 'refactoring', 'code-craftsmanship', 'productivity'],
    date: '2026-06-08'
  },
  {
    id: 'failing-faster',
    title: 'Failing Faster',
    url: 'https://articles.pragdave.me/p/failing-faster',
    author: 'Dave Thomas',
    type: 'article',
    status: 'finished',
    subtitle: 'Technical debt bankruptcy in the age of AI coding',
    summary:
      'An insightful reflection on how coding with AI generates average code quickly, but without continuous refactoring, tech debt accumulates at 10x speed.',
    thoughts: [
      'Coding with AI is just coding with a tendency toward average code. Average code is fast and good enough, but you can build much faster.',
      'The catch: at some point all these average pieces do not connect together in a resilient, scalable, and modifiable way. With AI, you can reach tech debt bankruptcy so fast.',
      'Just like with normal code, we always need continuous refactoring and redesign. AI can help with this too if you actively steer it there.'
    ],
    quote: {
      text: 'Code naturally degrades; you have to invest effort to stop it happening... It’s still just programming, and whether it takes 18 hours or 18 months, untended code will rot. All the things you’ve learned about creating good code still apply: the effect is just amplified.',
      author: 'Dave Thomas',
      source: 'Pragdave Articles (2026)'
    },
    tags: ['ai', 'code-craftsmanship', 'refactoring', 'architecture', 'productivity'],
    date: '2026-06-06'
  },
  {
    id: 'castles-in-the-air',
    title: 'Castles In The Air',
    url: 'https://articles.pragdave.me/p/castles-in-the-air',
    author: 'Dave Thomas',
    type: 'article',
    status: 'finished',
    subtitle: 'Why programming is thrilling',
    summary:
      'Nice article from the author of The Pragmatic Programmer, about how and why AI made programming more fun.',
    thoughts: [
      'I really like the initial quote, I had already came across it from (Mythical Man-Month by Frederick Brooks, 1974), this whole section is very resonating.',
      'Working on what is interesting and enjoyable is on a different level.'
    ],
    quote: {
      text: 'Finally there is the delight of working in such a tractable medium. The programmer, like the poet, works only slightly removed from pure thought-stuff. He builds his castles in the air, from air, creating by exertion of the imagination. Few media of creation are so flexible, so easy to polish and rework, so readily capable of realizing grand conceptual structures.',
      author: 'Fred Brooks',
      source: 'The Mythical Man-Month (1975)'
    },
    tags: ['ai', 'code-craftsmanship', 'productivity', 'engineering-culture'],
    date: '2026-06-02'
  },
  {
    id: 'spring-data-findall-anti-pattern',
    title: 'The Spring Data findAll Anti-Pattern',
    url: 'https://vladmihalcea.com/spring-data-findall-anti-pattern/',
    author: 'Vlad Mihalcea',
    type: 'article',
    status: 'finished',
    subtitle: 'Why default JPA repository query methods degrade enterprise database throughput',
    summary:
      'A deep technical examination of why extending Spring Data’s default findAll() in entity repositories leads to memory bloat, unindexed table scans, and N+1 query storms.',
    thoughts: [
      'Inheriting findAll() in Spring Data repositories is a dangerous default for enterprise tables. As dataset sizes grow, accidental findAll() calls trigger out-of-memory errors and excessive JDBC roundtrips.',
      'Always favor explicit pagination, keyset pagination, and tailored DTO projections over fetching entire managed entity graphs into memory.'
    ],
    quote: {
      text: 'The problem with findAll is that it makes it very easy to fetch a huge amount of data into memory, which can lead to OutOfMemoryError exceptions and severe performance degradation.',
      author: 'Vlad Mihalcea',
      source: 'High-Performance Java Persistence'
    },
    tags: ['java', 'spring', 'architecture', 'clean-code'],
    date: '2023-01-05'
  },
  {
    id: 'designing-data-intensive-applications',
    title: 'Designing Data-Intensive Applications',
    url: 'https://dataintensive.net/',
    author: 'Martin Kleppmann',
    type: 'book',
    status: 'in-progress',
    subtitle: 'The Big Ideas Behind Reliable, Scalable, and Maintainable Systems',
    summary:
      'Deep-dive into database engine internals, LSM-trees vs B-Trees, partitioning mechanics, distributed replication, consensus protocols (Raft/Paxos), and stream processing primitives.',
    thoughts: [
      'The definitive benchmark book for understanding real-world distributed data architectures and storage guarantees.'
    ],
    tags: ['architecture', 'distributed-systems', 'storage-engines'],
    date: '2026-01-15'
  },
  {
    id: 'nuts-and-bolts-oauth2',
    title: 'The Nuts and Bolts of OAuth 2.0',
    url: 'https://www.udemy.com/course/oauth-2-simplified/',
    author: 'Aaron Parecki',
    type: 'video',
    status: 'finished',
    subtitle: 'Enterprise Authorization & Identity Flows',
    summary:
      'Mastering secure enterprise authorization loops, PKCE flows, JWT verification, scope hierarchies, security architecture validation, and zero-trust API protection.',
    tags: ['architecture', 'security', 'zero-trust'],
    date: '2026-02-10'
  },
  {
    id: 'software-architecture-essentials',
    title: 'Software Architecture Essentials: Masterclass',
    url: 'https://www.udemy.com/course/software-architecture-essentials/',
    author: 'Enterprise Masterclass',
    type: 'video',
    status: 'to-do',
    subtitle: 'Advanced System Patterns & Isolation Strategies',
    summary:
      'Analyzing component isolation strategies, resilience engineering (circuit breakers, bulkheads), event sourcing, CQRS patterns, and systematic scalability trade-offs.',
    tags: ['architecture', 'system-design', 'scalability'],
    date: '2026-03-01'
  }
];
