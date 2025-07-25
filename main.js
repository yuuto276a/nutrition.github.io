import { NutriCalc } from './NutriCalc.js';
import foodDB from './foodDB.json' assert { type: 'json' };

const calc = new NutriCalc(foodDB);

document.querySelector("#calculateBtn").addEventListener("click", () => {
  const name = document.querySelector("#foodName").value.trim();
  const weight = parseFloat(document.querySelector("#foodWeight").value);

  const result = calc.calculate(name, weight);
  const output = document.querySelector("#result");

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
