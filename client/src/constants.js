export const languageVersions = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  c: "10.2.0",
  cpp: "10.2.0",
  csharp: "6.12.0",
};

export const languageIDs = {
  javascript: 1,
  typescript: 2,
  python: 3,
  java: 4,
  c: 5,
  cpp: 6,
  csharp: 7,
};

export const languageTemplates = {
  javascript: `console.log("Hello, World!");`,
  typescript: `console.log("Hello, World!");`,
  python: `print("Hello, World!")`,
  java: `
class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  c: `
#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`,
  cpp: `
#include <iostream>
int main() {
    std::cout << "Hello, World!";
    return 0;
}`,
  csharp: `
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
};
