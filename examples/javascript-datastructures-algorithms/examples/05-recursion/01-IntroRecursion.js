function understandRecursion(doIunderstandRecursion) {
  const recursionAnswer = confirm('Do you understand recursion?');
  if (recursionAnswer === true) { // 基线条件或停止点
    return true;
  }
  understandRecursion(recursionAnswer); // 递归调用
} 
understandRecursion(false);