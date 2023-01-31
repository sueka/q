type Operator = (this: any, that: any) => any

type Inverse<T extends Operator> =
  (this: Parameters<T>[0], that: ThisType<T>) => ReturnType<T>
