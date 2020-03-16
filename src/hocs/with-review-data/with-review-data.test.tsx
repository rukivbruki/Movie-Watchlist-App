import * as React from "react";
import * as renderer from "react-test-renderer";
import withReviewData from "./with-review-data";

const MockComponent = () => <div>Test</div>;

const MockComponentWrapped = withReviewData(MockComponent);

it(`withReviewData renders correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
