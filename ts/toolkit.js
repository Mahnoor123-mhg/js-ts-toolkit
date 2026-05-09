"use strict";
// Modern TypeScript Utility Toolkit
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Deep clone using generics
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
// 2. Debounce function with proper types
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
// 3. Fetch wrapper with error handling and generic return type
async function fetchWrapper(url, options = {}) {
    try {
        const fetchOptions = {
            method: options.method ?? "GET",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        };
        if (options.body) {
            fetchOptions.body = options.body;
        }
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Fetch Error:", error.message);
        }
        return null;
    }
}
// 4. Array groupBy using generics
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const groupKey = String(item?.[key] ?? "unknown");
        return {
            ...result,
            [groupKey]: [...(result[groupKey] ?? []), item],
        };
    }, {});
}
// Example usage
const student = {
    name: "Mahnoor",
    department: "Computer Science",
};
const clonedStudent = deepClone(student);
console.log("Deep Clone Result:");
console.log(clonedStudent);
const students = [
    { name: "Ali", department: "CS" },
    { name: "Sara", department: "IT" },
    { name: "Ahmed", department: "CS" },
];
console.log("Group By Result:");
console.log(groupBy(students, "department"));
const debouncedSearch = debounce((text) => {
    console.log("Debounce Result:", text);
}, 1000);
debouncedSearch("TypeScript Toolkit");
fetchWrapper("https://jsonplaceholder.typicode.com/users/1").then((data) => {
    console.log("Fetch Wrapper Result:");
    console.log(data);
});
//# sourceMappingURL=toolkit.js.map