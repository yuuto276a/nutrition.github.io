import { NutriCalc } from './NutriCalc.js';

let calc;

(async () => {
  try {
    const response = await fetch('./foodDB.json');
    const foodDB = await response.json();
    calc = new NutriCalc(foodDB);

    document.querySelector("#calculateBtn").addEventListener("click", () => {
      const name = document.querySelector("#foodName").value.trim();
      const weight = parseFloat(document.querySelector("#foodWeight").value);
      const output = document.querySelector("#result");

      const result = calc.calculate(name, weight);

      if (result) {
        output.innerHTML = `
          🧠 たんぱく質: ${result.protein}g<br>
          🧈 脂質: ${result.fat}g<br>
          🍚 炭水化物: ${result.carbs}g<br>
          🔥 カロリー: ${result.calories}kcal
        `;
      } else {
        const candidates = calc.suggest(name);
        output.textContent = candidates.length
          ? `見つかりませんでした。もしかして: ${candidates.join(", ")}？`
          : "食材が見つかりませんでした。";
      }
    });
  } catch (error) {
    console.error("foodDBの読み込みに失敗しました:", error);
    document.querySelector("#result").textContent = "データベースの読み込みに失敗しました。";
  }
})();
