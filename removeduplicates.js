import { createReadStream, createWriteStream } from 'fs';
import { createInterface } from 'readline';

// Function to determine if a string is a valid integer
function isInteger(str) {
  if (str.length === 0) return false;
  let i = 0;
  if (str[0] === '-') i = 1;  // Handle negative numbers
  for (; i < str.length; i++) {
    if (str[i] < '0' || str[i] > '9') return false;
  }
  return true;
}

// Custom Linked List Node
class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// Custom Linked List
class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(value) {
    if (this.head === null || this.head.value > value) {
      this.head = new ListNode(value, this.head);
      return;
    }

    let current = this.head;
    while (current.next !== null && current.next.value < value) {
      current = current.next;
    }

    if (current.next === null || current.next.value !== value) {
      current.next = new ListNode(value, current.next);
    }
  }

  writeToFile(writeStream) {
    let current = this.head;
    while (current !== null) {
      writeStream.write(current.value + '\n');
      current = current.next;
    }
  }
}

// Function to manually trim and validate a line
function parseLine(line) {
  let integerStr = '';
  let foundDigit = false;
  let foundInvalidChar = false;
  let hasMultipleIntegers = false;
  let i = 0;

  // Skip leading whitespace
  while (i < line.length && (line[i] === ' ' || line[i] === '\t')) {
    i++;
  }

  // Process potential integer
  while (i < line.length) {
    const char = line[i];
    if ((char >= '0' && char <= '9') || (char === '-' && integerStr.length === 0)) {
      integerStr += char;
      foundDigit = true;
    } else if (char === ' ' || char === '\t') {
      if (foundDigit) {
        break;  // End of integer part
      }
    } else {
      foundInvalidChar = true;
      break;
    }
    i++;
  }

  // Skip trailing whitespace
  while (i < line.length && (line[i] === ' ' || line[i] === '\t')) {
    i++;
  }

  // Check if there's more content after the integer
  if (i < line.length) {
    hasMultipleIntegers = true;
  }

  if (foundInvalidChar || hasMultipleIntegers || !isInteger(integerStr)) {
    return null;
  }

  return integerStr;
}

// Function to read, process, and write integers
async function processIntegers(inputFilePath, outputFilePath) {
  const fileStream = createReadStream(inputFilePath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const uniqueIntegers = new LinkedList();

  for await (const line of rl) {
    const trimmedIntegerStr = parseLine(line);
    if (trimmedIntegerStr !== null) {
      uniqueIntegers.insert(Number(trimmedIntegerStr));
    }
  }

  const writeStream = createWriteStream(outputFilePath);
  uniqueIntegers.writeToFile(writeStream);
  writeStream.end();
}

// Usage example
processIntegers('input.txt', 'output.txt').then(() => {
  console.log('Processing completed.');
}).catch(err => {
  console.error('Error:', err);
});
