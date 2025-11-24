import type { ProblemItem } from "../../global";
import BrokenArray from "./components/BrokenArray";
import FindSecondSmallestElement from "./components/FindSecondSmallestElement";
import FlatteningArray from "./components/FlatteningArray";
import GetBooksList from "./components/GetBooksList";
import ThreeSumArray from "./components/ThreeSumArray";

export const arrayProblems: ProblemItem[] = [
  {
    id: "broken-array-problem",
    title: "Broken Array Problem",
    description:
      "Given an array of numbers, group the consecutive identical numbers in sub-arrays in an array.",
    explanation: "",
    problemStatement: `
    Write a function that takes an array of numbers and groups the consecutive identical numbers into sub-arrays.

    For example:
    Input: [21, 1, 3, 22, 2, 4, 23, 5, 24, 6, 71, 31]
    Output: [[1, 2, 3, 4, 5, 6], [21, 22, 23, 24], [31], [71]]`,
    component: <BrokenArray />,
    code: `
function brokenArray(arr) {const brokenArray = (arr: number[]) => {
    const output: number[][] = [];
    const sortedArr = arr.sort((a, b) => a - b);
    let tempArr: number[] = [sortedArr[0]];
    for (let i = 1; i < sortedArr.length; i++) {
      if (
        sortedArr[i] === sortedArr[i - 1] ||
        sortedArr[i - 1] + 1 === sortedArr[i]
      ) {
        tempArr.push(sortedArr[i]);
      } else {
        output.push(tempArr);
        tempArr = [sortedArr[i]];
      }
    }
    output.push(tempArr);
    return output;
  };

    `,
  },
  {
    id: "flatten-nested-array",
    title: "Flatten Nested Array",
    description: "Flatten a nested array into a single-level array.",
    explanation: "",
    problemStatement: `
    Write a function that takes a nested array and flattens it into a single-level array.

    For example:
    Input: [0,[1,2],[3,[4,5,[6],7]]]
    Output: [0,1,2,3,4,5,6,7]

    Hint: You can use recursion to handle arrays nested at multiple levels.`,
    component: <FlatteningArray />,
    code: `
    const flattenArray = <T,>(arr: T[]): T[] => {
      const flattenResult: T[] = [];
      arr.forEach((a) => {
        if (Array.isArray(a)) {
          flattenResult.push(...flattenArray(a));
        } else {
          flattenResult.push(a as T);
        }
      });
      return flattenResult;
    };
    `,
  },
  {
    id: "sum-3-numbers",
    title: "Find 3 Numbers Sum to Target",
    description: "Find all triplets whose sum equals the given target.",
    explanation:
      "We sort the array and use a two-pointer approach for O(n²) complexity.",
    problemStatement: `
      Write a function that takes an array and return an array of triplets which equals the given target.

      For example:
      Input: [1, 5, 7, 8, 11, 32]
      Target: 19
      Output: [[1, 7, 11], [8, 11, 0]]`,
    component: <ThreeSumArray />,
    code: `
      function threeSum(arr, target) {
        arr.sort((a, b) => a - b);
        const res = [];

        for (let i = 0; i < arr.length - 2; i++) {
          let left = i + 1;
          let right = arr.length - 1;

          while (left < right) {
            const sum = arr[i] + arr[left] + arr[right];

            if (sum === target) {
              res.push([arr[i], arr[left], arr[right]]);
              left++;
              right--;
            } else if (sum < target) left++;
            else right--;
          }
        }
        return res;
      }
    `,
  },
  {
    id: "array-of-books",
    title: "Get the list of Books from the given user data",
    description:
      "Extract a unique list of book names from an array of user objects.",
    explanation:
      "We use reduce to accumulate book names and a Set to ensure uniqueness.",
    problemStatement: `
      Write a function that extract a unique list of book names from an array of user objects.

      For example:
      Input: [
        {
          Name: "chethan",
          Age: "21",
          Books: ["physics", "Chemistry", "Maths"],
          Score: [{ subject: "physics", marks: "100" },{ subject: "physics", marks: "100" }],
        },
        {
          Name: "ranjith",
          Age: "21",
          Books: ["Social", "Accounts", "maths", "physics"],
          Score: [{ subject: "physics", marks: "100" },{ subject: "physics", marks: "100" }],
        },
      ]
      Output: ["physics", "chemistry", "maths", "social", "accounts"]`,
    component: <GetBooksList />,
    code: `
      const getBookList = () => {
        const result = input.reduce((acc: string[], curr) => {
          curr.Books.forEach((book) => {
            if (!acc.includes(book.toLowerCase())) {
              acc.push(book.toLowerCase());
            }
          });
          return acc;
        }, []);
        setOutput(result);
      };
    `,
  },
  {
    id: "find-second-smallest-element",
    title: "Find second Smallest Element in an Array",
    description: "Find the second smallest element in an array of numbers.",
    explanation:
      "We iterate through the array to track the smallest and second smallest values.",
    problemStatement: `
      Write a function that extract a unique list of book names from an array of user objects without sorting the array.

      For example:
      Input: [6,7,2,87,3,5,2,9]
      Output: 3`,
    component: <FindSecondSmallestElement />,
    code: `
      const secondSmallestElement = (arr: number[]) => {
        let first = Infinity;
        let second = Infinity;
        arr.forEach((a) => {
          if (a < first) {
            second = first;
            first = a;
          } else if (a < second && a !== first) {
            second = a;
          }
        });
        return second === Infinity ? -1 : second;
      };
    `,
  },
  {
    id: "sum-3-numbers",
    title: "Find 3 Numbers Sum to Target",
    description: "Find all triplets whose sum equals the given target.",
    explanation:
      "We sort the array and use a two-pointer approach for O(n²) complexity.",
    problemStatement: `
      Write a function that extract a unique list of book names from an array of user objects without sorting the array.

      For example:
      Input: [6,7,2,87,3,5,2,9]
      Output: 3`,
    component: <ThreeSumArray />,
    code: `
function threeSum(arr, target) {
  arr.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (sum === target) {
        res.push([arr[i], arr[left], arr[right]]);
        left++;
        right--;
      } else if (sum < target) left++;
      else right--;
    }
  }
  return res;
}
    `,
  },
  {
    id: "sum-3-numbers",
    title: "Find 3 Numbers Sum to Target",
    description: "Find all triplets whose sum equals the given target.",
    explanation:
      "We sort the array and use a two-pointer approach for O(n²) complexity.",
    component: <ThreeSumArray />,
    code: `
function threeSum(arr, target) {
  arr.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (sum === target) {
        res.push([arr[i], arr[left], arr[right]]);
        left++;
        right--;
      } else if (sum < target) left++;
      else right--;
    }
  }
  return res;
}
    `,
  },
  {
    id: "sum-3-numbers",
    title: "Find 3 Numbers Sum to Target",
    description: "Find all triplets whose sum equals the given target.",
    explanation:
      "We sort the array and use a two-pointer approach for O(n²) complexity.",
    component: <ThreeSumArray />,
    code: `
function threeSum(arr, target) {
  arr.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (sum === target) {
        res.push([arr[i], arr[left], arr[right]]);
        left++;
        right--;
      } else if (sum < target) left++;
      else right--;
    }
  }
  return res;
}
    `,
  },
];
