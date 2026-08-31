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
