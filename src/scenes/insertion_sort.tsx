import {makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {all, createRef, createSignal, DEFAULT, makeRef, range, useRandom, waitFor} from "@motion-canvas/core";
import {CodeBlock, lines} from "@motion-canvas/2d/lib/components/CodeBlock";

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
    //<editor-fold desc="Add python code">
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
                code={() => `def insertion_sort(array_to_be_sorted: list[int]):
    for index in range(1, len(array_to_be_sorted)):
        search_index = index - 1
        while search_index >= 0 \\
                and array_to_be_sorted[index] < \\
                array_to_be_sorted[search_index]:
            search_index -= 1
        array_to_be_sorted[index], \\
        array_to_be_sorted[search_index + 1] = \\ 
            array_to_be_sorted[search_index + 1], \\
            array_to_be_sorted[index]`
                }
            />
        </Rect>
    );
    //</editor-fold>
    yield* waitFor(0.5);
    yield code().selection(lines(0), 0.2);
    let map: Map<number, number> = new Map();
    for (let i = 0; i < randomNumbersListLength; i++) {
        map.set(i, i);
    }
    for (let i = 1; i < randomNumbersListLength; i++) {
        yield* all(
            code().selection(lines(1), 0.2),
            rectangle_list[map.get(i)].fill("#e6a700", 0.2),
        );
        let search_index = i - 1;
        yield* code().selection(lines(2), 0.2);
        while (search_index >= 0 && text_list[map.get(i)].text() < text_list[map.get(search_index)].text()) {
            yield* code().selection(lines(3, 5), 0.2);
            search_index -= 1;
            yield* code().selection(lines(6), 0.2);
        }
        let temp = map.get(i);
        map.set(i, search_index + 1)
        map.set(search_index + 1, temp)
        yield* code().selection(lines(7, 10), 0.2);
        for (let i = 1; i < randomNumbersListLength; i++) {
            yield* rectangle_list[i].fill("#e3242b", 0.05);
        }
    }
    yield* code().selection(DEFAULT, 0.2);
    for (let k = 0; k < randomNumbersListLength; k++) {
        yield* rectangle_list[map.get(k)].fill('#2be324', 0.15);
    }
})