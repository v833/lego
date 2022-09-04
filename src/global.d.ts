declare function defineProps<T extends Record<string, any>>(obj?: any): T

declare function withDefaults<T>(
  props: T,
  defaults: { [P in keyof T]?: T[P] | (() => T[P]) },
): T

declare function defineEmits<T extends { (e: string, ...args: any[]): void }>(
  event?: string[],
): (e: string, ...args: any[]) => void

declare function defineExpose(obj: any): void