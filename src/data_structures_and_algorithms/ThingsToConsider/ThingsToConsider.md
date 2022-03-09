# Things to Check for Creating Edge Cases

## Is it an array?

1. Is it even an array? (Array.isArray)
2. Is it empty or not?
3. What type of elements does it contain? Of different or same type?
4. How big is the array?
5. can I sort the array in place or do I need a separate array?

# Important Conditions to be met

## Binary Search Tree

1. While start<end (where start is the first index of the array and end is the last)
2. Check if the order of items in the array. Ascending or Descending

## Recursive Function

1. Base Case.
2. return something from the recursive function.

## Always walk through sample input/output. If not provided, generate and verify with interviewwer regarding its validity. Look for patterns, intuition.

## Greedy algorithm normally requires sorting arrays.

## Sliding Window Technique

1. If given arr/string and if the question requires you to find solution using subarray/substring. then try using sliding-window technique.
2. If a window-size is given, apply fixed sliding-window technique otherwise if window size is not given and if some conditions are given for that window to be fulfilled than apply variable sliding-window technique.
3. In variable size sliding-window question, condition will be given and window-size have to be maximized/minimized. When the given condition will be met, then that will be a possible answer. Unlike fixed-size sliding-window technique, you cannot slide the window by i++ and j++ since the answer does not depend on fixed window-size but depends on which maximum window-size satisfies the condition.
