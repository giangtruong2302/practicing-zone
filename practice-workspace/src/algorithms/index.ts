export function sortArray(arr: number[]): number[] {
    return arr.sort((a, b) => a - b);
}

export function searchElement(arr: number[], target: number): number {
    return arr.indexOf(target);
}

export function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}