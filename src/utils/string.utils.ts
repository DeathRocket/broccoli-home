export function validateEmail(email: string) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

export function validateName(name: string) {
  if (!name?.trim()) {
    return { valid: false, msg: "Please input your name" };
  }
  if (name?.length < 3) {
    return { valid: false, msg: "Name should be at least 3 charaters" };
  }
  return { valid: true };
}
