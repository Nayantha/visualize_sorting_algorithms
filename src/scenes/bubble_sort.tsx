import {makeScene2D} from "@motion-canvas/2d";
import {createSignal, range, useRandom} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    view.fill('#141414');

    // random number list generation
    const randomNumbersListLength = 10;
    const random = useRandom();
    let randomNumbers = range(randomNumbersListLength).map(_ =>random.nextInt(1, 100));

    //random number list to signals
    const signals = randomNumbers.map(number=>createSignal(number));
});