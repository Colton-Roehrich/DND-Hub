import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { render } from "@testing-library/react";
import TurnTimer from "./TurnTimer";

Enzyme.configure({ adapter: new Adapter() });
describe("TurnTimer", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider
        store={createStore(() => {
          return {
            activeCharacters: [
              {
                id: 0,
                current_hitpoints: 12,
                armor_class: 10,
                dead: false,
                status_effect: "Grappled",
                has_initiative: true,
                initiative: 6,
                extra_time_pool: 11
              },
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
            ],
            inactiveCharacters: [
              {
                id: 2,
                nickname: "fdsa",
                current_hitpoints: 12,
                armor_class: 10,
                dead: false
              },
              {
                id: 3,
                nickname: "fdas",
                current_hitpoints: 0,
                armor_class: 10,
                dead: true
              }
            ]
          };
        })}
      >
        <TurnTimer />
      </Provider>
    );
  });

  it("should render", () => {
    expect(wrapper.length).toEqual(1);
  });
  it("should render 2 Player objects, but only 1 with a deathSaves object", () => {
    expect(wrapper.find("Player").length).toEqual(2);
    expect(wrapper.find("PlayerDeathSaves").length).toEqual(1);
  });
  it("should render an InactivePlayers object with the correct number of options", () => {
    expect(wrapper.find("InactivePlayers").length).toEqual(1);
    expect(wrapper.find("select").length).toEqual(1);
    expect(wrapper.find("option").length).toEqual(3);
  });
  it("should render a NewPlayer object", () => {
    expect(wrapper.find("NewPlayer").length).toEqual(1);
  });
  it("should render 3 Timer objects. one for each player and one in the main page", () => {
    expect(wrapper.find("Timer").length).toEqual(3);
  });
});
