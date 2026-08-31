---
title: "The Test That Wasn't Broken"
description: "How 3,700 AI credits, six false leads, and one unclosed mock taught me what 'flaky' really means in distributed test suites."
date: 2026-08-31
tags: ["testing", "java", "concurrency", "ci-cd", "clean-code", "debugging"]
---

### How 4 Agents sesdions 5,000 AI credits, six false leads, and one unclosed mock taught me what "flaky" really means

---

There is a particular kind of dread that arrives when a test fails in CI but passes on your machine.

You re-run it. It passes. You re-run the pipeline. It fails. You start bargaining. *Maybe the runner was busy. Maybe it's the network. Maybe if I just push an empty commit...*

That was Monday. By Friday I had burned **3,700 AI credits**, spun up Docker containers, written throwaway instrumentation, and torched six separate theories — all to discover that the test I was accused of breaking had been quietly doomed for months, and my branch's only crime was **existing at the wrong size**.

This is that story. It has a villain, and it is one line long.

---

## Act I: The Accusation

The setup was ordinary. A feature branch. A dashboard for measuring provisioning response times. Roughly a thousand lines of new code, all of it additive, none of it touching the thing that broke.

And yet: one test, in a service I had barely opened, failing in the merge pipeline.

```
ParallelLookupTest >
  queriesRecordsPerAccountInParallel  FAILED
```

It passed on `main`. It passed on my laptop. It failed in CI.

Then it got weirder. The failure had **two different faces**:

```
Expected: <2>   but: was <0>     (line 434)
Expected: <2>   but: was <1>     (line 455)
```

Same test. Same commit. Different assertion each time. If you have ever debugged concurrency, your stomach just dropped, because two unrelated symptoms from one test is the signature of something *underneath* the test being wrong.

The first real clue came from the pipeline history: **the same commit, on the same runner, passed in one job and failed in another.**

Which is when everyone says the magic word.

> "It's flaky. Just retry it."

Reader, I want to tell you something I did not properly believe five days ago:

**"Flaky" is very often just "deterministic somewhere you haven't looked yet."**

---

## Act II: Six Funerals

What follows is not a highlight reel. It is a graveyard. I think the graveyard is the most useful part of this article, because *every single one of these felt correct at the time.*

### Suspect #1: The scary stack trace

The branch logs were full of an alarming warning from a caching client — an `IllegalArgumentException` deep in a reconnect handler. Ugly. Threaded. Suspicious. Absent from `main`.

Then I found the identical warning in a **passing** job on an unrelated branch.

Ambient noise. The loudest thing in your logs is rarely the thing that's killing you.

**Dead.**

### Suspect #2: The new JAR

My branch had added an analytics SDK to that service's classpath. A new binary dependency is a beautiful suspect — it changes classloading, adds threads, shifts timing.

So I built a version of the branch with the JAR removed and every last usage stripped out, and ran the full suite three times.

Failed. Three out of three.

**Dead.**

### Suspect #3: The mocking framework itself

Now I got excited. The test used an argument captor and a stubbed answer, and the production code invoked that mock **concurrently** from a thread pool. Our mocking library version stored captured arguments in a plain, non-thread-safe list. Thread safety wasn't added until a much later major version.

This was, I was certain, the answer. Textbook. I could already picture the commit message.

I wrote a standalone probe reproducing the exact pattern — same captor, same stubbing, same concurrent invocation — and ran it **5,000 times** while 60 threads hammered the CPU.

```
LOST_ANSWER=0   LOST_CAPTURE=0
```

Zero. Not one corruption in five thousand attempts.

**Dead.** And it hurt.

### Suspect #4: Load and timing

Fine. If it isn't the framework, it's contention. I cloned the *real* test into an instrumented harness that ran the genuine production code path in a loop, logging every async invocation, under heavy artificial CPU load.

400 iterations. **Zero divergences.**

**Dead.**

### Suspect #5: Docker vs. Windows

Surely the container was the difference. Fewer cores? A cgroup CPU quota throttling the pool?

I measured. Same 20 processors. Same pool parallelism. No quota. Identical.

**Dead.**

### Suspect #6: The production code

I read the implementation line by line, ready to find the race. Concurrent map for results. A distinct request object per task. No timeouts, no fallbacks, no shared mutable state.

The production code was *correct*.

**Dead.**

Six theories. Days gone. Credits evaporating. And a test that still failed for reasons that now had no remaining explanation.

---

## Act III: The Turn

Out of options, I did the unglamorous thing I should have done on day one.

**I stopped trying to explain the failure and started trying to own it.**

I pulled the exact CI Docker image, seeded it with my branch, and ran the entire suite locally. It took twenty-four minutes and produced the failure.

Then I ran it again. And again.

**Six out of six. Every single time.**

Sit with that. The "flaky" test — the one that supposedly failed at random, the one everybody retried — was **100% deterministic** inside that container. It had never been random. It was perfectly reliable; I had simply been observing it through the wrong window.

That reframed everything. **A deterministic bug can be bisected. A flaky one can only be argued about.**

The control experiment came next, and it was decisive. Same container, same conditions, `main` branch source:

**Pass.**

So: my branch failed 6/6, `main` passed, same machine. The difference was real, it was mine, and now it was reproducible on demand.

---

## Act IV: The Impossible Diff

Here is where the story stopped making sense.

I diffed the failing test between `main` and my branch.

**Byte-identical.**

I diffed the production class under test.

**Byte-identical.**

My branch's *entire* contribution to that service's test suite was **adding two new test classes** — 17 tests total. One of them was eleven assertions against an enum. Pure functions. No state, no threads, no I/O, no mocks.

So I started deleting.

| Version of the branch | Tests | Result |
|---|---|---|
| `main` | 3549 | **PASS** |
| my branch, both new classes removed | 3549 | **PASS** |
| my branch, first new class only | 3560 | **PASS** |
| my branch, second new class only | 3555 | **PASS** |
| **my branch, exactly as written** | **3566** | **FAIL 6/6** |

Read that table again, because it is the strangest thing I have seen in years of writing Java.

Neither new class breaks anything on its own. Only **both together** — and one of them is *eleven enum assertions.*

Nothing about the *content* of my code mattered. Only the **count**.

And that pointed at exactly one thing.

```groovy
maxParallelForks = Runtime.runtime.availableProcessors().intdiv(2) ?: 1
```

The suite doesn't run in one JVM. It runs in `cores ÷ 2` forked JVMs, and the build tool distributes test classes among them. Change the number of test classes, and you change **which classes end up sharing a JVM with which other classes.**

My 17 tests hadn't broken anything. They had **reshuffled the seating chart** — and sat the victim next to a killer.

---

## Act V: Naming the Killer

Now the hunt was mechanical, which is a wonderful feeling after a week of vibes.

I forced the suite into a **single JVM** so ordering became fixed and explicit. It still failed. Good — now everything was in one deterministic sequence.

Then I verified my endpoints, which matters more than people admit:
- The target test, alone: **pass**
- The target test, plus all 239 other classes: **fail**

A clean bisection interval. So I binary-searched the other 239 test classes, running the suite against each half:

```
239 → 119 → 59 → 30 → 15 → 8 → 4 → 2 → 1
```

Nine full-suite runs later, one name was left standing.

A legacy migration service test. It had nothing to do with my feature. It had nothing to do with the failing test. Different package, different domain, written long before my branch existed.

I opened it, and there it was.

```java
@BeforeAll
static void setUpClass() {
    mockSupplyAsync();      // ← returns a MockedStatic. Nobody catches it.
}

private static void mockSupplyAsync() {
    mockStatic(CompletableFuture.class, invocation -> {
        if (methodName.equals("supplyAsync")) { ... }
        if (methodName.equals("allOf")) {
            return CompletableFuture.completedFuture(null);   // ← the murder weapon
        }
        return invocation.callRealMethod();
    });
}
```

That test **globally mocked `java.util.concurrent.CompletableFuture`** — a core JDK concurrency primitive — and **never closed the mock**.

A static mock stays registered for the entire life of the JVM unless you close it. The build tool reuses each worker JVM across many test classes. So from the moment that class ran, every subsequent test class in that JVM inherited a **sabotaged `CompletableFuture`**.

And the sabotage was surgical. Look at what the victim's production code does:

```java
List<CompletableFuture<Void>> lookups = accounts.stream()
        .map(a -> CompletableFuture.runAsync(() -> lookupFor(a, results)))
        .collect(toList());

CompletableFuture.allOf(lookups.toArray(new CompletableFuture[0])).join();  // wait for all
```

That last line is the *entire* synchronization strategy. Fan out, then block until everything finishes.

But with the leak active, `allOf(...)` no longer returned a future tracking those tasks. It returned one that was **already complete**. So `.join()` — the line whose only job is to wait — returned *instantly*, while the lookups were still running.

The code then read its results map while the background threads were still filling it.

And **that single mechanism explains both faces of the failure**:

- Read too early, before either task called the mock → `captured 0 requests`
- Read after one task finished but not the other → `1 product instead of 2`

Two symptoms. One cause. The concurrency bug was never in the production code or the test — it was **injected into the JDK from three packages away**.

---

## The Fix

After five days, six dead theories, and 3,700 credits:

```java
private static MockedStatic<CompletableFuture> completableFutureMock;

@BeforeAll
static void setUpClass() {
    completableFutureMock = mockSupplyAsync();
}

@AfterAll
static void tearDownClass() {
    completableFutureMock.close();   // ← that's it. That's the fix.
}
```

Catch the mock. Close it. Seventeen lines including a comment explaining why.

Result: the target test **passed**, the previously-leaking test **still passed**, formatting checks passed, and the CI job that had failed twice on the parent commit went **green**.

No production code changed. No existing test's behavior changed. One resource, finally released.

---

## What This Actually Cost, And What It Bought

Let's be honest about the number, because I think engineers hide these:

**~3,700 AI credits. Five days. Roughly nine full-suite runs just for the bisection**, at twenty-plus minutes each, plus dozens more for the failed hypotheses.

That is genuinely painful, and I won't pretend otherwise.

But here's the counterweight. The team's CI config contained this, committed long before my branch:

```yaml
retry: 2   # until we get random unit test failure to stop failing
```

Someone had already met this ghost. They'd shipped a retry and moved on. Completely reasonable under deadline — and it hid a real bug **for months**, silently, while every engineer who touched that service paid a small tax in re-runs and self-doubt.

The bug was also a **loaded gun aimed at the future**. Any test written from now on that fans out with `allOf(...).join()` would break the instant the shuffle seated it behind that migration test. Nobody would know why. Someone would retry it.

3,700 credits to permanently remove a landmine, and to stop blaming innocent branches. I'll take that trade.

---

## Five Things I'm Taking With Me

**1. "Flaky" is a hypothesis, not a diagnosis.**
It usually means "deterministic under conditions I haven't identified." The instant I reproduced it in the real CI image, a 1-in-5 mystery became a 6-of-6 certainty. Everything after that was easy.

**2. Reproduce in the real environment before theorizing.**
I spent days on elegant theories about mocking internals and thread pools. All six were wrong. The container answered in one run. Pull the actual image. Run the actual suite.

**3. A green build proves less than you think.**
My first look at `main` showed three passing jobs — too small a sample to conclude anything. Widening to 200 pipelines gave a real baseline of 10/10. Sample size matters when you're measuring rarity.

**4. Parallel test suites have invisible coupling.**
If your suite forks JVMs and distributes classes across them, then **adding an unrelated test can break a distant one.** Test count is not inert. That is deeply counter-intuitive and worth knowing before it happens to you.

**5. An unclosed `MockedStatic` is a bug, not a style nit.**
It is a global mutation of your runtime with **unbounded blast radius**, escaping the class, the file, and the package. If you mock a static — especially a JDK concurrency type — use try-with-resources or close it in teardown. Every time. No exceptions.

---

## The Part I Keep Thinking About

For most of that week, the working assumption — mine included — was that my branch had broken something.

It hadn't. It changed the number of test classes from 3,549 to 3,566, and that was enough to seat two classes together that had never met before.

Somewhere in your test suite, right now, there may be a static mock nobody closed, waiting patiently for the scheduler to introduce it to its victim. It won't look like a resource leak. It'll look like **someone else's branch being flaky**.

Go close your mocks.

---

*Details anonymized. Framework, build-tool, and JDK specifics are unchanged, because those are the parts that might save you a week.*
