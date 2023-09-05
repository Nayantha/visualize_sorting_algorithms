import {makeScene2D, Rect} from "@motion-canvas/2d";
import {createSignal, makeRef, range, useRandom} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    view.fill('#141414');
    const num_of_items_in_list = 7;
    //<editor-fold desc="Add text wrappers / Rects">
    const text_wrappers: Rect[] = [];
    view.add(
        range(num_of_items_in_list).map(i => (
            <Rect
                ref={makeRef(text_wrappers,i)}
                width={150}
                height={150}
                x={-185 * (num_of_items_in_list - 1) / 2 + 185 * i}
                fill="#e3242b"
                radius={10}
                y={-275}
            />
        ))
    )
    //</editor-fold>
    const random = useRandom();
    const signals = range(num_of_items_in_list).map(_ => createSignal(random.nextInt(1, 100)))
})