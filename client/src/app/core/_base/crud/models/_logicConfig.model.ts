
export enum OPERATOR {
  AND,
  OR
}

export enum COMPARISON {
  EQUAL,
  NOT_EQUAL,
  GREATER_THAN,
  LESS_THAN
}

export enum DATA_TYPE {
  BOOLEAN,
  STRING,
  NUMBER,
  ENUM,
  OBJECT,
  ANY
}

export class Condition {

  dataKey: string;
  dataValue: string;
  comparison: COMPARISON;
  dataType: DATA_TYPE | DATA_TYPE.ANY;

}

export class Rule {
  comparisons: Condition[];
  operator: OPERATOR;
}
