import {makeScene2D} from "@motion-canvas/2d";
import {createSignal, range, useRandom} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    view.fill('#141414');
    //<editor-fold desc="generate random number list">
    const randomNumbersListLength = 10;
    const random = useRandom();
    const signals = range(randomNumbersListLength).map(_ => createSignal(random.nextInt(1, 100)));
    //</editor-fold>
})