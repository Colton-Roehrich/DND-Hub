import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { render } from "@testing-library/react";
import PlayerStatusEffect from "./PlayerStatusEffect";

Enzyme.configure({ adapter: new Adapter() });
describe("PlayerStatusEffect", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider
        store={createStore(() => {
          return {
            activeCharacters: [
              {
                id: 1,
                current_hitpoints: 0,
                armor_class: 10,
                dead: true,
                status_effect: "Grappled",
                has_initiative: true,
                initiative: 6,
                extra_time_pool: 12
              }
            ]
          };
        })}
      >
        <PlayerStatusEffect player={{ id: 0, status_effect: "Grappled" }} />
      </Provider>
    );
  });

  it("should render", () => {
    expect(wrapper.length).toEqual(1);
  });
  it("should render a PlayerStatusEffect object", () => {
    expect(wrapper.find("PlayerStatusEffect").length).toEqual(1);
  });
  it("should render StatusEffectButton objects", () => {
    expect(wrapper.find("StatusEffectButton").length).toEqual(12);
  });
  it("the StatusEffectButton object should be a button", () => {
    expect(wrapper.find("button").length).toEqual(12);
  });
});
