import {makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {createRef, createSignal, DEFAULT, makeRef, range, useRandom} from "@motion-canvas/core";
import {CodeBlock, lines} from "@motion-canvas/2d/lib/components/CodeBlock";

export default makeScene2D(function* (view) {
    view.fill('#141414');
    //<editor-fold desc="generate random number list">
    const number_of_items_to_be_sorted = 10;
    const random = useRandom();
    const signals = range(number_of_items_to_be_sorted).map(_ => createSignal(random.nextInt(1, 100)));
    //</editor-fold>
    //<editor-fold desc="Add Rectangles to wrap the random numbers">
    const rectangle_list: Rect[] = [];
    let space_x = 185;
    view.add(
        range(number_of_items_to_be_sorted).map(i => (
            <Rect
                ref={makeRef(rectangle_list, i)}
                width={150}
                height={150}
                x={-space_x * (number_of_items_to_be_sorted - 1) / 2 + space_x * i}
                fill="#e3242b"
                radius={10}
                y={-225}
            />
        ))
    )
    //</editor-fold>
    //<editor-fold desc="Add random number strings">
    const text_list: Txt[] = [];
    view.add(
        range(number_of_items_to_be_sorted).map(i => (
            <Txt
                ref={makeRef(text_list, i)}
                fontSize={75}
                fontFamily={'JetBrains Mono'}
                text={signals[i]().toString()}
                x={rectangle_list[i].x()}
                y={-225}
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
                code={() => `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`
                }
            />
        </Rect>
    );
    //</editor-fold>
    yield* code().selection(lines(0), 0.2);
    yield* code().selection(lines(1), 0.2);
    //<editor-fold desc="generate map">
    let map: Map<number, number> = new Map();
    for (let i = 0; i < number_of_items_to_be_sorted; i++) {
        map.set(i, i);
    }
    //</editor-fold>
    // const jump = 175;
    yield* code().selection(DEFAULT, 0.2);
    for (let k = 0; k < number_of_items_to_be_sorted; k++) {
        yield* rectangle_list[map.get(k)].fill('#2be324', 0.15);
    }
})