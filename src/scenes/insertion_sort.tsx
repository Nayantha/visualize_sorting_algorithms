import {makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {createRef, createSignal, makeRef, range, useRandom} from "@motion-canvas/core";
import {CodeBlock} from "@motion-canvas/2d/lib/components/CodeBlock";

export default makeScene2D(function* (view) {
    view.fill('#141414');
    //<editor-fold desc="generate random number list">
    const randomNumbersListLength = 10;
    const random = useRandom();
    const signals = range(randomNumbersListLength).map(_ => createSignal(random.nextInt(1, 100)));
    //</editor-fold>
    //<editor-fold desc="Add Rectangles to wrap the random numbers">
    const rectangle_list: Rect[] = [];
    view.add(
        range(randomNumbersListLength).map(i => (
            <Rect
                ref={makeRef(rectangle_list, i)}
                width={150}
                height={150}
                x={-185 * (randomNumbersListLength - 1) / 2 + 185 * i}
                fill="#e3242b"
                radius={10}
                y={-275}
            />
        ))
    )
    //</editor-fold>
    //<editor-fold desc="Add random number strings">
    const text_list: Txt[] = [];
    view.add(
        range(randomNumbersListLength).map(i => (
            <Txt
                ref={makeRef(text_list, i)}
                fontSize={75}
                fontFamily={'JetBrains Mono'}
                text={signals[i]().toString()}
                x={rectangle_list[i].x()}
                y={-275}
                fill={'#f0f0f0'}
            />
        ))
    )
    //</editor-fold>
    const codeWrapper = createRef<Rect>();
    const code = createRef<CodeBlock>();
    yield view.add(
        <Rect
            ref={codeWrapper}
            width={1920}
            height={720}
            x={0}
            y={-350}
            offset={-1}
        >
            <CodeBlock
                language={"python"}
                ref={code}
                fontSize={40}
                offsetX={-1}
                x={-1920 + 350}
                y={+1080 / 2 - 300}
                fontFamily={'JetBrains Mono'}
                code={() => ``
                }
            />
        </Rect>
    );
})