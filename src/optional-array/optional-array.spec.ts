import { Optional } from '../optional/optional';
import { NoSuchElementError } from '../errors/no-such-element-error';
import { OptionalArray } from './optional-array';


describe('OptionalArray', () => {
    const text = 'test text';
    it('Optional.empty()" should be instance of Optional', () => {
        const pusta: string[] = [];
        // const jeden: string[] = ['jeden'];
        // const dwa: string[] = ['jeden', 'dwa'];
        const powtorzenia: string[] = ['jeden', 'dwa', 'jeden'];

        const aaa: OptionalArray<string> = OptionalArray.ofArray(powtorzenia);
        const bbb: OptionalArray<string> = OptionalArray.ofArray(pusta);
        const ccc: OptionalArray<string> = OptionalArray.ofNullableArray(null);
        // const bbb: ArrayOpt<string> = new ArrayOpt();
        // const ccc: ArrayOpt<string> = new ArrayOpt(...powtorzenia);


        console.log(aaa.isEmpty());
        console.log(bbb.isEmpty());
        console.log(ccc.isEmpty());
        console.log(ccc.isNullish());


        aaa.findOne(x => x === 'jeden').ifPresent( (x: string) => console.log(x));

        // ccc.find()



        // console.log(OptionalArray.empty().isPresent());

        // OptionalArray.ofNullable(dwa).ifPresent(x => {
        //     console.log(x);
        // });


        // OptionalArray.ofNullable(dwa).ifPresentForEach(x => {
        //     console.log(x);
        // });

        // let result: OptionalArray<string> = OptionalArray.ofNullable(dwa).map(x => {
        //     // console.log(x);
        //     return x+x;
        // });


        // console.log(result);
        //
        // let answer: string;
        // let dwanswer: string;
        //
        //
        // if (jeden != null && jeden !== undefined && jeden.length === 1) {
        //     answer = jeden[0]
        // }
        //
        // Optional.ofNullable(powtorzenia.find(x => x === 'kowalski')).ifPresent(x => {
        //     kwoalskio
        // })
        // Optional.of(powtorzenia).isEmpty()
        //
        // OptionalArray.of(jeden).ifOnePresent(x => answer = x);
        // OptionalArray.of(jeden).ifPresent(x => x.map(a => a+a));
        // jeden.map(x => x+x);
        // // console.log(answer)
        //
        // console.log(pusta.map(x => x+x))
        //
        //
        // OptionalArray.ofNullable(jeden).ifPresent(x => dwanswer = x[0]);

        // console.log(dwanswer);

        // expect(Optional.empty()).toBeInstanceOf(Optional);
    });
});
