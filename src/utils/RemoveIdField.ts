export const removeIdField = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    // 배열인 경우 각 요소에 대해 재귀적으로 호출
    return obj.map((item) => removeIdField(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    // 객체인 경우
    const newObj = { ...obj } as any;
    delete newObj._id; // _id 필드 제거

    // 객체의 각 키에 대해 재귀적으로 호출
    Object.keys(newObj).forEach((key) => {
      newObj[key] = removeIdField(newObj[key]);
    });

    return newObj as T;
  }
  // 배열이나 객체가 아닌 경우 그대로 반환
  return obj;
};
