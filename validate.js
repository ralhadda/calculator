const OPERATOR = "-|+|/|*";
export function invalidOperations(string) {
  return (
    multipleconsecutiveOperations(string) ||
    startOrEndWithOperation(string) ||
    hasNotNumbersAndOperatorsOnly(string)
  );
}

function multipleconsecutiveOperations(string) {
  return /([-|+|/|*]){2,2}/g.test(string);
}

function startOrEndWithOperation(string) {
  return /^([-|+|/|*])|([-|+|/|*])$/g.test(string);
}

function hasNotNumbersAndOperatorsOnly(string) {
  return !/^[0-9|-|+|*|/]+$/g.test(string);
}
