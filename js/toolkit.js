// Modern JavaScript Utility Toolkit

// 1. Deep clone an object
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 2. Debounce function using closure and rest parameters
function debounce(func, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// 3. Fetch wrapper with error handling using async/await
async function fetchWrapper(url, options = {}) {
  try {
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return null;
  }
}

// 4. Array groupBy function
function groupBy(array, key) {
  return array.reduce((result, item) => {
    const groupKey = item?.[key] ?? "unknown";

    return {
      ...result,
      [groupKey]: [...(result[groupKey] ?? []), item],
    };
  }, {});
}

// Example usage

const user = {
  name: "Mahnoor",
  address: {
    city: "Lahore",
  },
};

const clonedUser = deepClone(user);
console.log("Deep Clone Result:");
console.log(clonedUser);

const students = [
  { name: "Ali", department: "CS" },
  { name: "Sara", department: "IT" },
  { name: "Ahmed", department: "CS" },
];

console.log("Group By Result:");
console.log(groupBy(students, "department"));

const search = debounce((text) => {
  console.log("Debounce Result:", text);
}, 1000);

search("JavaScript Toolkit");

fetchWrapper("https://jsonplaceholder.typicode.com/users/1").then((data) => {
  console.log("Fetch Wrapper Result:");
  console.log(data);
});