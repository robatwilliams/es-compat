function noRestrictedSyntaxPrototypeMethod(method, esVersionName) {
  const [builtin, , name] = method.split('.');
  const message = `${esVersionName} method '${method}' is forbidden`;

  return [
    {
      selector: `CallExpression[callee.property.name='${name}']`,
      message,
    },
    {
      selector: `MemberExpression[object.object.name='${builtin}'][object.property.name='prototype'][property.name='${name}']`,
      message,
    },
  ];
}

module.exports = {
  noRestrictedSyntaxPrototypeMethod,
};
