import { validateEmail, validateName } from "./string.utils";

test("email format validation", () => {
  expect(validateEmail("www.cctv.com")).toBeFalsy();

  expect(validateEmail("abcedf@1111")).toBeFalsy();

  expect(validateEmail("1234567@qq.com")).toBeTruthy();

  expect(validateName("").valid).toBeFalsy();
  expect(validateName(" ").valid).toBeFalsy();
  expect(validateName("ab").valid).toBeFalsy();
  expect(validateName("Tom").valid).toBeTruthy();
});
