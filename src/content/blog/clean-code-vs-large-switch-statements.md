---
title: Clean Code vs Large Switch Statements
description: Why large switch statements age badly and how polymorphism helps contain the damage.
date: 2025-02-17
tags: [clean-code, design, oop, refactoring]
---
# Switch Statements
It’s hard to make a small switch statement.
Even a switch statement with only two cases is larger than I’d like a single block or function to be.
It’s also hard to make a switch statement that does one thing. By their nature, switch statements always do many things.
**Unfortunately we can’t always avoid switch statements, but we can make sure that each switch statement is buried in a low-level class and is never repeated. We do this, of course, with polymorphism.**
Consider this example:
```java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
  switch (e.type) {
    case COMMISSIONED:
      return calculateCommissionedPay(e);
    case HOURLY:
      return calculateHourlyPay(e);
    case SALARIED:
      return calculateSalariedPay(e);
    default:
      throw new InvalidEmployeeType(e.type);
  }
}
```
There are several problems with this function:
- it’s large, and when new employee types are added, it will grow
- it clearly does more than one thing
- it violates the Single Responsibility Principle
- it violates the Open Closed Principle
- the same structure tends to repeat in many other functions
The better approach is to hide the switch behind an abstract factory and dispatch behavior polymorphically through the domain interface.
My general rule for switch statements is that they can be tolerated if they:
1. appear only once
2. are used to create polymorphic objects
3. are hidden behind inheritance or factories
