import {makeScene2D} from '@motion-canvas/2d';
import {all, createRef} from '@motion-canvas/core';
import {CodeBlock} from "@motion-canvas/2d/lib/components/CodeBlock";

export default makeScene2D(function* (view) {
    const code = createRef<CodeBlock>();
    view.add(
        <CodeBlock ref={code}
        />
    )
    yield* all();
});
