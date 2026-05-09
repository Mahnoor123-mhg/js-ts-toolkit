// Modern TypeScript Utility Toolkit

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

interface Student {
  name: string;
  department: string;
}

// 1. Deep clone using generics
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// 2. Debounce function with proper types
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// 3. Fetch wrapper with error handling and generic return type
async function fetchWrapper<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T | null> {
  try {
    const fetchOptions: RequestInit = {
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

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch Error:", error.message);
    }

    return null;
  }
}

// 4. Array groupBy using generics
function groupBy<T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, item: T) => {
    const groupKey = String(item?.[key] ?? "unknown");

    return {
      ...result,
      [groupKey]: [...(result[groupKey] ?? []), item],
    };
  }, {});
}

// Example usage

const student: Student = {
  name: "Mahnoor",
  department: "Computer Science",
};

const clonedStudent = deepClone<Student>(student);
console.log("Deep Clone Result:");
console.log(clonedStudent);

const students: Student[] = [
  { name: "Ali", department: "CS" },
  { name: "Sara", department: "IT" },
  { name: "Ahmed", department: "CS" },
];

console.log("Group By Result:");
console.log(groupBy<Student>(students, "department"));

    const debouncedSearch = debounce((text: string): void => {
  console.log("Debounce Result:", text);
}, 1000);

debouncedSearch("TypeScript Toolkit");

interface UserResponse {
  id: number;
  name: string;
  email: string;
}

fetchWrapper<UserResponse>("https://jsonplaceholder.typicode.com/users/1").then(
  (data) => {
    console.log("Fetch Wrapper Result:");
    console.log(data);
  }
);