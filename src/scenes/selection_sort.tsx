import {makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {all, createRef, createSignal, DEFAULT, makeRef, range, useRandom, waitFor} from "@motion-canvas/core";
import {CodeBlock, lines} from "@motion-canvas/2d/lib/components/CodeBlock";

export default makeScene2D(function* (view) {
    view.fill('#141414');
    //<editor-fold desc="generate random number list">
    const number_of_items_to_be_sorted = 10;
    const random = useRandom();
    const signals = range(number_of_items_to_be_sorted).map(_ => createSignal(random.nextInt(1, 100)));
    //</editor-fold>
    //<editor-fold desc="Add Rectangles to wrap the random numbers">
    const text_wrappers: Rect[] = [];
    let space_x = 185;
    view.add(
        range(number_of_items_to_be_sorted).map(i => (
            <Rect
                ref={makeRef(text_wrappers, i)}
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
    const random_number_text_list: Txt[] = [];
    view.add(
        range(number_of_items_to_be_sorted).map(i => (
            <Txt
                ref={makeRef(random_number_text_list, i)}
                fontSize={75}
                fontFamily={'JetBrains Mono'}
                text={signals[i]().toString()}
                x={text_wrappers[i].x()}
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
                code={() => `def selection_sort(arr: list[int]):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] > arr[j]:
                arr[j], arr[i] = arr[i], arr[j]`
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
    const jump = 175;
    for (let i = 0; i < number_of_items_to_be_sorted; i++) {
        yield* all(
            text_wrappers[map.get(i)].y(text_wrappers[map.get(i)].y() - jump, 0.1),
            random_number_text_list[map.get(i)].y(random_number_text_list[map.get(i)].y() - jump, 0.1),
        );
        yield* code().selection(lines(2), 0.2);
        for (let j = i + 1; j < number_of_items_to_be_sorted; j++) {
            yield* code().selection(lines(3), 0.2);
            if (
                parseInt(random_number_text_list[map.get(i)].text()) > parseInt(random_number_text_list[map.get(j)].text())
            ) {
                yield* all(
                    text_wrappers[map.get(j)].y(text_wrappers[map.get(j)].y() + jump, 0.1),
                    random_number_text_list[map.get(j)].y(random_number_text_list[map.get(j)].y() + jump, 0.1),
                )
                //<editor-fold desc="move minimum to front and the previous minimum to the back of the array">
                for (let k = i; k < j; k++) {
                    yield* all(
                        text_wrappers[map.get(i)].x(text_wrappers[map.get(i)].x() + space_x, 0.1),
                        random_number_text_list[map.get(i)].x(random_number_text_list[map.get(i)].x() + space_x, 0.1),
                        text_wrappers[map.get(j)].x(text_wrappers[map.get(j)].x() - space_x, 0.1),
                        random_number_text_list[map.get(j)].x(random_number_text_list[map.get(j)].x() - space_x, 0.1),
                    )
                    yield* waitFor(0.2);
                }
                //</editor-fold>
                yield* all(
                    text_wrappers[map.get(i)].y(text_wrappers[map.get(i)].y() + jump, 0.1),
                    random_number_text_list[map.get(i)].y(random_number_text_list[map.get(i)].y() + jump, 0.1),
                    text_wrappers[map.get(j)].y(text_wrappers[map.get(j)].y() - jump, 0.1),
                    random_number_text_list[map.get(j)].y(random_number_text_list[map.get(j)].y() - jump, 0.1),
                )
                yield* waitFor(0.2);
                yield* all(
                text_wrappers[map.get(j)].y(text_wrappers[map.get(j)].y() - jump, 0.1),
                    random_number_text_list[map.get(j)].y(random_number_text_list[map.get(j)].y() - jump, 0.1),
                )
                const temp = map.get(j)
                map.set(j, map.get(i))
                map.set(i, temp);
            }
        }
        yield* all(
            text_wrappers[map.get(i)].y(text_wrappers[map.get(i)].y() + jump, 0.1),
            random_number_text_list[map.get(i)].y(random_number_text_list[map.get(i)].y() + jump, 0.1),
        );
    }
    yield* text_wrappers[map.get(number_of_items_to_be_sorted-1)].fill("#e3242b", 0.2);
    yield* code().selection(DEFAULT, 0.2);
    //<editor-fold desc="Convert The background Rect color to green">
    for (let k = 0; k < number_of_items_to_be_sorted; k++) {
        yield* text_wrappers[map.get(k)].fill('#2be324', 0.15);
    }
    //</editor-fold>
})