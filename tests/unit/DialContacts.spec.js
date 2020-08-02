import { shallowMount } from '@vue/test-utils'
import DialContacts from '@/components/DialContacts.vue'
import Vue from 'vue'
import {BIconEnvelopeFill, BIconTelephoneFill, BIconChatDotsFill} from 'bootstrap-vue'

describe('DialContacts.vue', () => {

  it('renders only Email cta properly when only email is passed into props', async () => {

    const contacts = { email: 'test@test.test' };
    const wrapper = shallowMount(DialContacts, {
      propsData: { contacts }
    });

    await Vue.nextTick();

    const Mail = wrapper.findComponent(BIconEnvelopeFill);
    expect(Mail.exists()).toBe(true);

    //Search Mail href
    const mailChat = wrapper.find("[href='mailto:test@test.test']");
    expect(mailChat.exists()).toBe(true);

  });

  it('renders Message and Call CTAs properly when phone number is passed into props', async () => {

    const contacts = { phone: '+49-12-34-56-78' };
    const wrapper = shallowMount(DialContacts, {
      propsData: { contacts }
    });

    await Vue.nextTick();

    //Search icons
    const Call = wrapper.findComponent(BIconTelephoneFill);
    const Chat = wrapper.findComponent(BIconChatDotsFill);
    expect(Call.exists()).toBe(true);
    expect(Chat.exists()).toBe(true);


        //Search Chat href
     const chatCta = wrapper.find("[href='sms:+49-12-34-56-78']")
     expect(chatCta.exists()).toBe(true);

     //Search Call href
     const callCta = wrapper.find("[href='tel:+49-12-34-56-78']")
     expect(callCta.exists()).toBe(true);


    });


    it('renders an empty div if no props are passed', async () => {

        const contacts = {};
        const wrapper = shallowMount(DialContacts, {
            propsData: { contacts }
        });

        await Vue.nextTick();

        expect(wrapper.element.childElementCount).toEqual(0);
    });
});
