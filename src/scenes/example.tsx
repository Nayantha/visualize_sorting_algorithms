import {Circle, makeScene2D} from '@motion-canvas/2d';
import {createRef, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
    const myCircle = createRef<Circle>()

  view.add(
      <Circle
          ref={myCircle}
          x={-300}
          width={140}
          height={140}
          fill="#e13238"
      />
  );

    yield* waitFor(5);
});
