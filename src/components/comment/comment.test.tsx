import * as React from "react";
import * as renderer from "react-test-renderer";
import Comment from './comment';

const props = {
  user: {
    id: 1,
    name: ``,
  },
  rating: 1,
  comment: ``,
  date: `11.11.11`
};

it(`Comment renders correctly`, () => {
  const tree = renderer
    .create(
        <Comment {...props}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
