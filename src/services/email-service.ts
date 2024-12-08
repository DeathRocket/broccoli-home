import axios from "axios";

export const sendInvitation = async (name: string, email: string) => {
  const url =
    "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";
  try {
    const result = await axios.post(url, { name, email });

    return { success: true, data: result };
  } catch (error) {
    const { response } = error;
    return { success: false, data: null, msg: response.data.errorMessage };
  }
};
