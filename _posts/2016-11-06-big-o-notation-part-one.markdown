---
layout: post
title:  "Big O Notation Part One"
date:   2016-11-06 08:53:33 -0400
---

Big O Notation measures the time complexity and/or space complexity of an algorithm. This blog post will focus
on the time complexity aspect. When we're talking about big o notation, we are usually talking about the worst
case scenario. It is important to know how long a function would take relative to its input because we want
our software to be as fast as it can be. If the software lags, it can create a frustrating experience for
users and create other problems.

**Basics**

Big O Notation is usually written in this format:

O(n)

O stands for the function and the 'n' stands for input. Normally, you would not know the exact number of input,
so we use the variable 'n' to cover the worse case scenarios.

For instance, you might have a function that returns true as soon as a coin lands on heads. The best case
scenario would be O(1), getting heads on the first try. The worst case is O(n), where n could be 20, 285, and
etc. Since it is not feasible to count on the best case situation, we use the variable 'n' instead of concrete
numbers.

**O(n)**

I like to think of this notation as like reading a book or a list in order. Here's an example of an O(n) notation:

```
function(array) {
  array.forEach(function(el) {
    console.log(el);
  })
}
```

The array could be tiny and only output 'one' element, but it could also be a very large array. In the worst
case situation, it will run at least 'n' or number of elements times.

**O(n^2)**

This one is like checking a shopping list with your items in your cart. Here's an example:

```
 function(shoppingList, cartList) {
   var checkedList = [];

   while(let s = 0; s < shoppingList.length; s++) {
     while(let c = 0; c < cartList.length; c++) {
       if(shoppingList[s] == cartList[c]) checkedList.push(c);
     }
   }

   return checkedList;
 }
```

In the best case scenario, the shoppingList and cartList would look exactly the same (ex: milk, butter, bread).
When you iterate through each item on the shoppingList, you would immediately find the item in the cart.
However, if you imagine the list to look more like this: shoppingList - milk, oranges, butter, bread; cartList - bread, butter, milk, the function will check milk with every item in the cartList until it finds it at the
end of the list. It will also do the same for oranges, since oranges is not even in the cart. You could even
have a whole list of items on the shoppingList that are not even in the cart. This notation should be avoided
as much as possible because it usually involves a lot of repetitive checking.

**O(log n)**

It helped to think of this one as like finding a word in a dictionary. Let's say you want to find the word
'hippo' in the dictionary. You would not start from the beginning and keep reading until you hit the word
hippo! No, what you would do instead is go to the 'h' section of the dictionary, and try to find the word
'hippo'. It's a divide and conquer method. You focused your search on a part of the dictionary. This is
essentially what you are doing with O(log n).

You have this array [2, 5, 6, 9, 14, 17, 26] and you are trying to find the number '17'. If you know the numbers are in order, you can find the number in O(log n) time by comparing 17 with the number in the middle
'9'. Since 17 is greater than 9, you ignore all the numbers on the left, and only look at the numbers on the
right, giving you [14, 17, 26]. Now, you again compare 17 to the middle number, which in this case is 17. You can now stop looking! Since you do not have to look at every element, you can see how this big o notation is faster than O(n) and O(n^2).

**Part Two**

In my next post, I will discuss O(n log n), O(2^n), and O(n!).
