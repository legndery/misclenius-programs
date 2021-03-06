
# Ben - The Gamer (100 Marks)
Ben is one of the best gamers in India. He also happens to be an excellent programmer. So, he likes to play games which require use of both gaming skills as well as programming skills. One such game is SpaceWar.

In this game there are N levels and M types of available weapons. The levels are numbered from 0 to N-1 and the weapons are numbered from 0 to M-1 . Ben can clear these levels in any order. In each level, some subset of these M weapons is required to clear this level. If in a particular level, Ben needs to buy x new weapons, he will pay ^2 coins for it. Also note that Ben can carry all the weapons he has currently to the next level . Initially, Ben has no weapons. Can you tell the minimum coins required such that Ben can clear all the levels. 

### Input Format
The first line of input contains 2 space separated integers;
*`N`* - the number of levels in the game and *`M`* - the number of types of weapons.
*`N`* lines follows. The ith of these lines contains a binary string of length *`M`*. If the `jth` character of this string is `1` , it means we need a weapon of type `j` to clear the `ith` level.

### Constraints
```
1 <= N <=20
1<= M <= 20
```

### Output Format
Print a single integer which is the answer to the problem.

#### Sample TestCase 1
##### *Input*

```
1 4
0101
```
##### *Output*
`4`
##### Explanation
There is only one level in this game. We need 2 types of weapons - 1 and 3. Since, initially Ben has no weapons he will have to buy these, which will cost him 2^2 = 4 coins.

#### Sample TestCase 2
##### *Input*
```
3 3
111
001
010
```
##### *Output*
`3`