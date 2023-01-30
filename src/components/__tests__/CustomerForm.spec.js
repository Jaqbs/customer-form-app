import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CustomerForm from "../CustomerForm.vue";

describe("CustomerForm", () => {
  let wrapper;

  beforeEach(()=> {
    wrapper = mount(CustomerForm);
  } )

  it("should render form with SEND button", () => {    

    expect(wrapper.find('[data-test="form-button"]').text()).toContain("SEND");
  });

  // name

  it("should show error if name is empty", async () => {

    await wrapper.find('[data-test="form"]').trigger('submit');
    expect(wrapper.find('[data-test="name-error"]').text()).toContain("Value is required");
  });

  it("should show error if name is shorter than 5 characters", async () => {
    
    await wrapper.find('[data-test="name"]').setValue('abc');
    await wrapper.find('[data-test="form"]').trigger('submit');    
    expect(wrapper.find('[data-test="name-error"]').text()).toContain("This field should be at least 5 characters long");
  });

  it("should show error if name is longer than 50 characters", async () => {
    
    const with55characters = "Far far away, behind the word mountains, far from the c"

    await wrapper.find('[data-test="name"]').setValue(with55characters);
    await wrapper.find('[data-test="form"]').trigger('submit');    
    expect(wrapper.find('[data-test="name-error"]').text()).toContain("The maximum length allowed is 50");
  });

  it("should accept name between 5-50 characters", async () => {

    await wrapper.find('[data-test="name"]').setValue('Test Name');
    await wrapper.find('[data-test="form"]').trigger('submit');    
    expect(wrapper.find('[data-test="name-error"]').exists()).toBe(false)

  });

  // email

  it("should NOT accept email in the wrong format", async () => {
    
    await wrapper.find('[data-test="email"]').setValue('name@domain');
    await wrapper.find('[data-test="form"]').trigger('submit');    
    expect(wrapper.find('[data-test="email-error"]').text()).toContain("Value is not a valid email address");
  });

  it("should accept non-standard TLDs for email like .agency", async () => {
    
    await wrapper.find('[data-test="email"]').setValue('name@domain.agency');
    await wrapper.find('[data-test="form"]').trigger('submit');    
    expect(wrapper.find('[data-test="email-error"]').exists()).toBe(false)

  });

  // subject

  it("should NOT require subject input", async () => {

    await wrapper.find('[data-test="form"]').trigger('submit');    
    expect(wrapper.find('[data-test="subject-error"]').exists()).toBe(false)

  });

  it("should NOT accept subject longer than 100 characters", async () => {

    const with105characters = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the b"
    
    await wrapper.find('[data-test="subject"]').setValue(with105characters);
    await wrapper.find('[data-test="form"]').trigger('submit');    
    expect(wrapper.find('[data-test="subject-error"]').text()).toContain("The maximum length allowed is 100");

  });

   // message

  it("should NOT accept message longer than 500 characters", async () => {

    const with505characters = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One"
    
    await wrapper.find('[data-test="message"]').setValue(with505characters);
    await wrapper.find('[data-test="form"]').trigger('submit');    
    expect(wrapper.find('[data-test="message-error"]').text()).toContain("The maximum length allowed is 500");

  });

  it("should accept message shorter than 500 characters", async () => {

    await wrapper.find('[data-test="message"]').setValue('Test Message');
    await wrapper.find('[data-test="form"]').trigger('submit');    
    expect(wrapper.find('[data-test="message-error"]').exists()).toBe(false)

  });


});


