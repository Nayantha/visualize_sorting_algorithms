import {makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {all, createRef, createSignal, makeRef, range, useRandom, waitFor} from "@motion-canvas/core";
import {CodeBlock, lines} from "@motion-canvas/2d/lib/components/CodeBlock";

export default makeScene2D(function* (view) {
    view.fill('#141414');

    // random number list generation
    const randomNumbersListLength = 10;
    const random = useRandom();
    let randomNumbers = range(randomNumbersListLength).map(_ => random.nextInt(1, 100));

    //random number list to signals
    const signals = randomNumbers.map(number => createSignal(number));

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
                    y={+1080 / 2 - 300}
                    fontFamily={'JetBrains Mono'}
                    code={() => `def bubbleSort(arr, n):
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1] :
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if swapped == False:
            break
    return arr`
                }
                />
            </Rect>
        </>
    )
    yield* waitFor(0.5);
    yield code().selection(lines(0), 0.2);
    let jump = 90;
    let swapped = false;
    let map: Map<number, number> = new Map();
    for (let i = 0; i < randomNumbersListLength; i++) {
        map.set(i, i);
    }
    for (let i = 0; i < randomNumbersListLength - 1; i++){
        swapped = false;
        yield* code().selection(lines(1), 0.2);
        yield* code().selection(lines(2), 0.2);
        for (let j = 0; j < randomNumbersListLength - i - 1; j++) {
            yield* code().selection(lines(3), 0.2)
            yield* all(
                code().selection(lines(4), 0.2),
                rects[map.get(j)].fill("#e6a700", 0.2),
                rects[map.get(j+1)].fill('#e6a700', 0.2),
            );
            if (texts[map.get(j)].text() > texts[map.get(j+1)].text()) {
                swapped = true;
                let temp2 = map.get(j);
                map.set(j, map.get(j+1));
                map.set(j+1, temp2);
                yield* all(
                    rects[map.get(j)].y(rects[map.get(j)].y()+jump, 0.1),
                    texts[map.get(j)].y(texts[map.get(j)].y()+jump, 0.1),
                    rects[map.get(j+1)].y(rects[map.get(j+1)].y()-jump, 0.1),
                    texts[map.get(j+1)].y(texts[map.get(j+1)].y()-jump, 0.1),
                );
            }
        }
    }
});