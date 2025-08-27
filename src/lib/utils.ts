import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function storeEncode(value: any): string {
  return JSON.stringify(value)
}

export function storeDecode(value: string): any {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
