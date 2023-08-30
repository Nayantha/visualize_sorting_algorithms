import {makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {createRef, createSignal, makeRef, range, useRandom} from "@motion-canvas/core";
import {CodeBlock} from "@motion-canvas/2d/lib/components/CodeBlock";

export default makeScene2D(function* (view) {
    view.fill('#141414');

    // random number list generation
    const randomNumbersListLength = 10;
    const random = useRandom();
    let randomNumbers = range(randomNumbersListLength).map(_ =>random.nextInt(1, 100));

    //random number list to signals
    const signals = randomNumbers.map(number=>createSignal(number));

    // rectangle list - used to hold the elements in the random number list
    const rects: Rect[] = [];
    view.add(
        range(randomNumbersListLength).map(i => (
            <Rect
                ref={makeRef(rects, i)}
                width={150}
                height={150}
                x={-185 * (randomNumbersListLength - 1) / 2 + 185 * i}
                fill="#e3242b"
                radius={10}
                y={-275}
            />
        ))
    )
    // text list - used to represent the elements in the random number list
    const texts: Txt[] = [];
    yield view.add(
        range(randomNumbersListLength).map(i => (
            <Txt
                ref={makeRef(texts, i)}
                fontSize={75}
                fontFamily={'JetBrains Mono'}
                text={signals[i]().toString()}
                x={rects[i].x()}
                y={-275}
                fill={'#f0f0f0'}
            />
        ))
    )
    const code = createRef<CodeBlock>();
    const codeBlock = createRef<Rect>();
    yield view.add(
        <>
            <Rect
                ref={codeBlock}
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
                    y={+1080/2 - 300}
                />
            </Rect>
        </>
    )
});