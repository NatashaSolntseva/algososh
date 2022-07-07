import swapOnClick from "../utils";

describe("string reversal algorithm test", () => {
  const testString = "12";

  it("Expands the string correctly with an even number of characters.", async () => {
    const swap = await swapOnClick(testString);
    expect(swap).toEqual(["2", "1"]);
  });
});

/*

    it("Разворот строки с чётным количеством символов", async () => {
        const alg = await reverseStringAlgo(['1', '2'], ()=>{})
        expect(alg).toEqual(['2', '1']);
    })


*/
