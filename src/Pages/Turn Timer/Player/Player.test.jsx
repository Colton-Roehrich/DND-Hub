import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { render } from "@testing-library/react";
import Player from "./Player";

Enzyme.configure({ adapter: new Adapter() });
describe("Player", () => {
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
        <Player
          player={{
            id: 0,
            status_effect: "Grappled",
            has_initiative: true,
            initiative: 6,
            current_hitpoints: 0,
            dead: true
          }}
        />
      </Provider>
    );
  });

  it("should render", () => {
    expect(wrapper.length).toEqual(1);
  });
  it("should render an Initiative object", () => {
    expect(wrapper.find("Initiative").length).toEqual(1);
  });
  it("should render an Timer object", () => {
    expect(wrapper.find("Timer").length).toEqual(1);
  });
  it("should render a PlayerDeathSaves object", () => {
    expect(wrapper.find("PlayerDeathSaves").length).toEqual(1);
  });
  it("should render a PlayerHealth object", () => {
    expect(wrapper.find("PlayerHealth").length).toEqual(1);
  });
  it("should render a PlayerInfo object", () => {
    expect(wrapper.find("PlayerInfo").length).toEqual(1);
  });
  it("should render a PlayerStatusEffect object", () => {
    expect(wrapper.find("PlayerStatusEffect").length).toEqual(1);
  });
  it("should render StatusEffectButton objects", () => {
    expect(wrapper.find("StatusEffectButton").length).toEqual(12);
  });
});
