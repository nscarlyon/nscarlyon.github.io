---
layout: post
title:  "Big O Notation Part Two"
date:   2016-11-13 08:53:33 -0400
---

This is part two of Big O Notation.

**O(n!)**
You will most likely not encounter this notation. The exclamation mark indicates that it is a factorial. For
example, let us say that n is 4. This is the factorial for 4:

4 x 3 x 2 x 1 = 24

Or let's pick 5:

5 x 4 x 3 x 2 x 1 = 120

As you can see factorials can get pretty big, so this is a notation that you should avoid.

**O(2^n)**

This one can sometimes be confused with (n^2), but they are quite different. I like to think of this notation in terms of breeding rabbits. Imagine that there are two rabbits in the beginning and each pair of rabbits produces two rabbits. Let's say that each R represents a rabbit.

```
                 R         <<- You start with the pregnant female
                 |      
            R---------R    <<<- she gives birth to two baby rabbits and so on...
            |         |
          R---R     R---R  
          |   |     |   |
         R-R R-R   R-R R-R
```

The analogy is not exactly perfect, but it helps to think of O(n^2) as O(branches^depth). So O(2^4) like the one above is where you have '2' for each branch and it goes 4 levels deep. You will see this type of notation in a recursive function. EX:

```

function recursive(n) {
  if(n <= 1) {
    return 1;
  }
  return f(n-1) + f(n-1);
}

```

If you try f(4), it will follow the same pattern as the rabbits above.

**O(n log n)**

This is a combination of O(n) and O(log n). Here, you are using O(log n) time for each 'n' element. For example, say you have an array of sorted strings and you need to find a specific letter. You would use O(n log n) time, meaning you would look at every string O(log n) time.

**Final Thoughts**

I think it is easy to try to memorize common functions as certain notations or think things like 'if I see two for loops then it is a O(n^2) function'. This is dangerous thinking because it could lead to mistakes. It is better to have a deep understanding of each type of notation and then apply your understanding to each situation.
