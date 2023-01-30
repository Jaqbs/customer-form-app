
import { describe, it, expect } from "vitest";
import { postData } from "../dataAPI.js"
 
describe("dataAPI", () => {

  const mockedFormData = {
    "name":"testName",
    "email":"testEmail@mail.agency",
    "subject":"tesSubject",
    "message":"tesMessage"
  }

  it("with MOCKED form data input should get response from REAL API", async () => {    
    const response = await postData(mockedFormData);

    // generated values
    expect(response.data).toHaveProperty('createdAt');
    expect(response.data).toHaveProperty('avatar');
    expect(response.data).toHaveProperty('id');

    // provided values
    expect(response.data).toHaveProperty('name', mockedFormData.name);
    expect(response.data).toHaveProperty('email', mockedFormData.email);
    expect(response.data).toHaveProperty('subject', mockedFormData.subject);
    expect(response.data).toHaveProperty('message', mockedFormData.message);
  }); 


});
 