import { generateSummary } from "@/app/api/ai/summaries";

describe("generateSummary", () => {
    it("should generate a summary from a dull text", async () => {
        const dullText = "Peanut butter is a food paste or spread made from ground, dry-roasted peanuts. It commonly contains additional ingredients that modify the taste or texture, such as salt, sweeteners, or emulsifiers. Consumed in many countries, it is the most commonly used of the nut butters, a group that also includes cashew butter and almond butter (though peanuts are not nuts, peanut butter is culinarily considered a nut butter). Peanut butter is a nutrient - rich food containing high levels of protein, several vitamins, and dietary minerals.It is typically served as a spread on bread, toast, or crackers, and used to make sandwiches(notably the peanut butter and jelly sandwich).It is also used in a number of breakfast dishes and desserts, such as granola, smoothies, crepes, cookies, brownies, or croissants.";
        try {
            const result = await generateSummary(dullText);
            expect(result).not.toEqual(dullText);
            expect(result).not.toEqual("");
        } catch (error) {
            console.log(error);
            expect(error).toBeNull();
        }
    }, 10000);
})